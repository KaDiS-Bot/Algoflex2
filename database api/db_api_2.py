from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import firebase_admin
from firebase_admin import credentials, firestore
import bcrypt
import datetime

# Initialize Flask App
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'algoflex_secret_key'  # Change this to a secure key
jwt = JWTManager(app)

# Initialize Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Role-based permissions
ROLE_PERMISSIONS = {
    "admin": ["add_company", "remove_company", "add_agent", "remove_agent", "add_campaign", "remove_campaign"],
    "company_admin": ["add_agent", "remove_agent", "add_campaign", "remove_campaign"],
    "agent": ["submit_call_review"]
}

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    users_ref = db.collection("users").where("email", "==", email).stream()
    user = None
    for doc in users_ref:
        user = doc.to_dict()
        user["id"] = doc.id
        break

    if not user or not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return jsonify({"message": "Invalid email or password"}), 401

    access_token = create_access_token(identity={"id": user["id"], "role": user["role"], "company_id": user.get("company_id")}, expires_delta=datetime.timedelta(days=1))
    return jsonify({"token": access_token, "role": user["role"], "company_id": user.get("company_id")})

@app.route('/admin/company', methods=['POST'])
@jwt_required()
def add_company():
    user = get_jwt_identity()
    if user["role"] != "admin":
        return jsonify({"message": "Unauthorized"}), 403

    data = request.json
    company_ref = db.collection("companies").add({
        "name": data["name"],
        "campaigns": []
    })
    return jsonify({"message": "Company added", "company_id": company_ref[1].id}), 201


@app.route('/admin/company/<company_id>', methods=['DELETE'])
@jwt_required()
def remove_company(company_id):
    user = get_jwt_identity()
    if user["role"] != "admin":
        return jsonify({"message": "Unauthorized"}), 403

    db.collection("companies").document(company_id).delete()
    return jsonify({"message": "Company deleted"}), 200

@app.route('/company_admin/agent', methods=['POST'])
@jwt_required()
def add_agent():
    user = get_jwt_identity()
    if user["role"] != "company_admin":
        return jsonify({"message": "Unauthorized"}), 403

    data = request.json
    hashed_password = bcrypt.hashpw(data["password"].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    agent_ref = db.collection("users").add({
        "name": data["name"],
        "email": data["email"],
        "phone": data["phone"],
        "password": hashed_password,
        "role": "agent",
        "company_id": user["company_id"],
        "campaign_id": data["campaign_id"],
        "total_calls": 0,
        "calls_to_review": 0,
        "agent_average_score": 0.0
    })
    return jsonify({"message": "Agent added", "agent_id": agent_ref[1].id}), 201


@app.route('/company_admin/agent/<agent_id>', methods=['DELETE'])
@jwt_required()
def remove_agent(agent_id):
    user = get_jwt_identity()
    if user["role"] != "company_admin":
        return jsonify({"message": "Unauthorized"}), 403

    db.collection("users").document(agent_id).delete()
    return jsonify({"message": "Agent deleted"}), 200

@app.route('/agent/call_review', methods=['POST'])
@jwt_required()
def submit_call_review():
    user = get_jwt_identity()
    if user["role"] != "agent":
        return jsonify({"message": "Unauthorized"}), 403

    data = request.json
    call_location = data["call_location"]
    scores = data["scores"]

    overall_score = sum(scores.values()) / len(scores)
    
    call_ref = db.collection("calls").add({
        "agent_id": user["id"],
        "campaign_id": user["campaign_id"],
        "company_id": user["company_id"],
        "call_location": call_location,
        "scores": scores,
        "overall_score": overall_score
    })

    # Update Agent stats
    agent_ref = db.collection("users").document(user["id"])
    agent = agent_ref.get().to_dict()
    new_total_calls = agent["total_calls"] + 1
    new_avg_score = ((agent["agent_average_score"] * agent["total_calls"]) + overall_score) / new_total_calls

    agent_ref.update({
        "total_calls": new_total_calls,
        "agent_average_score": new_avg_score
    })

    # Update Campaign stats
    campaign_ref = db.collection("campaigns").document(user["campaign_id"])
    campaign = campaign_ref.get().to_dict()
    new_total_reviews = campaign["total_call_reviews"] + 1
    new_avg_campaign_score = ((campaign["average_call_rating"] * campaign["total_call_reviews"]) + overall_score) / new_total_reviews

    campaign_ref.update({
        "total_call_reviews": new_total_reviews,
        "average_call_rating": new_avg_campaign_score
    })

    return jsonify({"message": "Call review submitted successfully", "call_id": call_ref[1].id}), 201

@app.route('/api/overview', methods=['GET'])
@jwt_required()
def get_overview():
    try:
        companies_ref = db.collection('companies')
        companies = companies_ref.stream()
        
        total_clients = 0
        total_campaigns = 0
        total_calls = 0
        reviewed_calls = 0
        company_names = []
        call_data = []

        for company in companies:
            company_data = company.to_dict()
            total_clients += 1
            company_names.append(company_data['name'])

            campaigns_ref = db.collection('campaigns').where('company_id', '==', company.id)
            campaigns = campaigns_ref.stream()

            for campaign in campaigns:
                campaign_data = campaign.to_dict()
                total_campaigns += 1

                calls_ref = db.collection('calls').where('campaign_id', '==', campaign.id)
                calls = calls_ref.stream()

                for call in calls:
                    call_data.append(call.to_dict())
                    total_calls += 1
                    if 'scores' in call.to_dict():
                        reviewed_calls += 1

        return jsonify({
            "total_clients": total_clients,
            "total_campaigns": total_campaigns,
            "total_calls": total_calls,
            "reviewed_calls": reviewed_calls,
            "company_names": company_names,
            "call_data": call_data
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/calls/company/<company_id>', methods=['GET'])
@jwt_required()
def get_calls_by_company(company_id):
    try:
        calls_ref = db.collection('calls').where('company_id', '==', company_id)
        calls = calls_ref.stream()
        return jsonify([call.to_dict() for call in calls]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/call/<call_id>', methods=['GET'])
@jwt_required()
def get_call(call_id):
    call_ref = db.collection('calls').document(call_id).get()
    if call_ref.exists:
        return jsonify(call_ref.to_dict()), 200
    return jsonify({"error": "Call not found"}), 404

@app.route('/api/company/<company_id>', methods=['GET'])
@jwt_required()
def get_company(company_id):
    company_ref = db.collection('companies').document(company_id).get()
    if company_ref.exists:
        return jsonify(company_ref.to_dict()), 200
    return jsonify({"error": "Company not found"}), 404

@app.route('/api/agent/<agent_id>', methods=['GET'])
@jwt_required()
def get_agent(agent_id):
    agent_ref = db.collection('agents').document(agent_id).get()
    if agent_ref.exists:
        return jsonify(agent_ref.to_dict()), 200
    return jsonify({"error": "Agent not found"}), 404

@app.route('/api/campaign/<campaign_id>', methods=['GET'])
@jwt_required()
def get_campaign(campaign_id):
    campaign_ref = db.collection('campaigns').document(campaign_id).get()
    if campaign_ref.exists:
        return jsonify(campaign_ref.to_dict()), 200
    return jsonify({"error": "Campaign not found"}), 404

@app.route('/api/company/<company_id>/calls', methods=['GET'])
@jwt_required()
def get_company_calls(company_id):
    try:
        calls_ref = db.collection('calls').where('company_id', '==', company_id)
        calls = calls_ref.stream()
        call_list = []

        for call in calls:
            call_data = call.to_dict()
            campaign = db.collection('campaigns').document(call_data['campaign_id']).get().to_dict()
            agent = db.collection('agents').document(call_data['agent_id']).get().to_dict()
            
            call_list.append({
                "call_id": call_data['call_id'],
                "campaign_name": campaign['name'] if campaign else "Unknown",
                "agent_name": agent['name'] if agent else "Unknown",
                "review_score": sum(call_data.get("scores", {}).values()) / 7 if "scores" in call_data else 0
            })

        return jsonify(call_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)