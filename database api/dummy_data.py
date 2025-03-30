import firebase_admin
from firebase_admin import credentials, firestore
import bcrypt
import random

# Initialize Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Helper function to hash passwords
def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# Dummy data
companies = [
    {"name": "Algoflex"},
    {"name": "Worcestershire Sauce"}
]

campaigns = [
    {"name": "Sales Campaign"},
    {"name": "Customer Support"}
]

agents = [
    {"name": "Lin Baden", "email": "baden@algoflex.com", "phone": "1234567890"},
    {"name": "Jim Kong Un", "email": "kong@algoflex.com", "phone": "9876543210"}
]

# Insert Companies
company_ids = []
for company in companies:
    company_ref = db.collection("companies").add(company)
    company_ids.append(company_ref[1].id)

# Insert Campaigns (Linked to Companies)
campaign_ids = []
for i, campaign in enumerate(campaigns):
    campaign["company_id"] = company_ids[i % len(company_ids)]  # Assign company
    campaign["total_call_reviews"] = 0
    campaign["unique_agent_count"] = 0
    campaign["average_call_rating"] = 0.0
    campaign["agents"] = []
    campaign_ref = db.collection("campaigns").add(campaign)
    campaign_ids.append(campaign_ref[1].id)

# Insert Admin
admin_ref = db.collection("users").add({
    "name": "super_admin",
    "email": "inorie@algoflex.com",
    "phone": "1111111111",
    "password": hash_password("habibi420"),
    "role": "admin"
})

# Insert Company Admins (One for each company)
for company_id in company_ids:
    db.collection("users").add({
        "name": "Company Admin",
        "email": f"admin_{company_id[:5]}@example.com",
        "phone": "2222222222",
        "password": hash_password("compadmin123"),
        "role": "company_admin",
        "company_id": company_id
    })

# Insert Agents (Linked to Campaigns)
agent_ids = []
for i, agent in enumerate(agents):
    agent["password"] = hash_password("agentpass")
    agent["role"] = "agent"
    agent["company_id"] = company_ids[i % len(company_ids)]  # Assign company
    agent["campaign_id"] = campaign_ids[i % len(campaign_ids)]  # Assign campaign
    agent["total_calls"] = 0
    agent["calls_to_review"] = 0
    agent["agent_average_score"] = 0.0
    agent_ref = db.collection("users").add(agent)
    agent_ids.append(agent_ref[1].id)

    # Link agent to campaign
    campaign_ref = db.collection("campaigns").document(agent["campaign_id"])
    campaign_data = campaign_ref.get().to_dict()
    campaign_data["agents"].append(agent_ref[1].id)
    campaign_ref.update({"agents": campaign_data["agents"]})

# Insert Call Reviews (For Each Agent)
call_parameters = ["clarity", "politeness", "resolution", "time_efficiency", "accuracy", "tone", "professionalism"]

for agent_id in agent_ids:
    campaign_id = db.collection("users").document(agent_id).get().to_dict()["campaign_id"]
    scores = {param: random.randint(1, 5) for param in call_parameters}
    overall_score = sum(scores.values()) / len(scores)

    call_ref = db.collection("calls").add({
        "agent_id": agent_id,
        "campaign_id": campaign_id,
        "company_id": company_ids[0],
        "call_location": "Remote",
        "scores": scores,
        "overall_score": overall_score
    })

print("Dummy data inserted successfully!")
