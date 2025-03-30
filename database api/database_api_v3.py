from flask import Flask, request, jsonify
from firebase_admin import credentials, initialize_app, firestore
import firebase_admin
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
cred = credentials.Certificate('serviceAccountKey.json')
initialize_app(cred)
db = firestore.client()

#dashboard data api
@app.route('/api/dashboard', methods=['GET'])
def get_overview():
    companies_ref = db.collection('companies')
    campaigns_ref = db.collection('campaigns')
    calls_ref = db.collection('calls')
    users_ref = db.collection('users')

    total_clients = len(companies_ref.get())
    total_campaigns = len(campaigns_ref.get())
    total_calls = len(calls_ref.get())
    calls_reviewed = len([call for call in calls_ref.get() if call.to_dict().get('overall_score', None) is not None])

    companies = []
    for company_doc in companies_ref.get():
        company_data = company_doc.to_dict()
        company_name = company_data['name']
        company_id = company_doc.id

        calls = []
        for call_doc in calls_ref.where('company_id', '==', company_id).get():
            call_data = call_doc.to_dict()

            agent_doc = users_ref.document(call_data['agent_id']).get()
            agent_name = agent_doc.to_dict().get('name', 'Unknown')

            campaign_doc = campaigns_ref.document(call_data['campaign_id']).get()
            campaign_name = campaign_doc.to_dict().get('name', 'Unknown')

            calls.append({
                'call_id': call_doc.id,
                'agent_name': agent_name,
                'campaign_name': campaign_name,
                'call_scores': call_data.get('scores', {})
            })

        companies.append({
            'company_name': company_name,
            'calls': calls
        })

    response = {
        'total_clients': total_clients,
        'total_campaigns': total_campaigns,
        'total_calls': total_calls,
        'calls_reviewed': calls_reviewed,
        'companies': companies
    }

    return jsonify(response)


# update score for a specific call
@app.route('/api/call/<call_id>', methods=['PUT'])
def update_call_score(call_id):
    data = request.json
    call_ref = db.collection('calls').document(call_id)
    call_ref.update({
        'scores': data.get('scores'),
        'overall_score': data.get('overall_score')
    })
    return jsonify({'message': 'Call score updated successfully'})


# create new company
@app.route('/api/company', methods=['POST'])
def create_company():
    data = request.json
    company_ref = db.collection('companies').document()
    company_ref.set({
        'name': data.get('name'),
        'monetization_model': data.get('monetization_model'),
        'campaigns': []
    })
    return jsonify({'message': 'Company created successfully'})

# get all company details
@app.route('/api/companies', methods=['GET'])
def get_companies():
    companies_ref = db.collection('companies')
    companies = []
    # for doc in db.collection('companies').get():
    #     companies.append(doc.to_dict())
    #  companies = []
    campaigns_ref = db.collection('campaigns')
    for company_doc in companies_ref.get():
        company_data = company_doc.to_dict()
        company_name = company_data['name']
        company_id = company_doc.id
        monetization_model = company_data.get('monetization_model', 'Unknown')

        total_reviews = 0
        campaign_docs = campaigns_ref.where('company_id', '==', company_id).get()
        for campaign_doc in campaign_docs:
            campaign_data = campaign_doc.to_dict()
            total_reviews += campaign_data.get('total_call_reviews', 0)

        companies.append({
            'company_name': company_name,
            'monetization_model': monetization_model,
            'total_reviews': total_reviews,
            'total_campaigns': len(campaign_docs)
        })
    return jsonify(companies)


# create a new campaign
@app.route('/api/campaign', methods=['POST'])
def create_campaign():
    data = request.json
    campaign_ref = db.collection('campaigns').document()
    campaign_ref.set({
        'name': data.get('name'),
        'company_id': data.get('company_id'),
        'total_call_reviews': 0,
        'unique_agent_count': 0,
        'average_call_rating': 0.0,
        'agents': []
    })
    return jsonify({'message': 'Campaign created successfully'})


# get all campaigns
@app.route('/api/campaigns', methods=['GET'])
def get_campaigns():
    campaigns = []
    for doc in db.collection('campaigns').get():
        campaigns.append(doc.to_dict())
    return jsonify(campaigns)


# create a new agent
@app.route('/api/agents', methods=['POST'])
def create_agent():
    data = request.json
    agent_ref = db.collection('users').document()
    agent_ref.set({
        'company_name': data.get('company_name', 'Unknown'),
        'agent_name': data.get('agent_name', 'Unknown'),
        'email': data.get('email', 'N/A'),
        'total_calls': int(data.get('total_calls', 0)),
    })
    return jsonify({'message': 'Agent created successfully', 'agent': {
        'company_name': data.get('company_name', 'Unknown'),
        'agent_name': data.get('agent_name', 'Unknown'),
        'email': data.get('email', 'N/A'),
        'total_calls': int(data.get('total_calls', 0)),
    }}), 201

#get specific agent details
@app.route('/api/agent/<agent_id>', methods=['GET'])
def get_agent_details(agent_id):
    agent_ref = db.collection('users').document(agent_id).get()
    if not agent_ref.exists:
        return jsonify({'error': 'Agent not found'}), 404

    agent_data = agent_ref.to_dict()
    if agent_data.get('role') != 'agent':
        return jsonify({'error': 'User is not an agent'}), 400

    response = {
        'name': agent_data['name'],
        'email': agent_data['email'],
        'total_calls': agent_data['total_calls'],
        'calls_to_review': agent_data['calls_to_review'],
        'agent_average_score': agent_data['agent_average_score'],
        'scores': agent_data.get('scores', {})
    }
    return jsonify(response)

# get all agents details
@app.route('/api/agents', methods=['GET'])
def get_all_agents():
    users_ref = db.collection('users').where('role', '==', 'agent').get()
    agents = []

    for user_doc in users_ref:
        user_data = user_doc.to_dict()
        company_doc = db.collection('companies').document(user_data['company_id']).get()
        company_name = company_doc.to_dict().get('name', 'Unknown')

        agents.append({
            'agent_name': user_data['name'],
            'company_name': company_name,
            'email': user_data['email'],
            'total_calls': user_data.get('total_calls', 0)
        })

    return jsonify({'agents': agents})


# get details of a specific call
@app.route('/api/call/<call_id>', methods=['GET'])
def get_call_details(call_id):
    call_ref = db.collection('calls').document(call_id).get()
    if not call_ref.exists:
        return jsonify({'error': 'Call not found'}), 404

    call_data = call_ref.to_dict()
    response = {
        'call_id': call_id,
        'agent_id': call_data['agent_id'],
        'campaign_id': call_data['campaign_id'],
        'company_id': call_data['company_id'],
        'call_location': call_data.get('call_location', 'Unknown'),
        'scores': call_data.get('scores', {}),
        'overall_score': call_data.get('overall_score', 0)
    }

    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
