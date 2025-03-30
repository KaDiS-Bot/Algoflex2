# AlgoFlex - Project Setup Guide  

This guide walks you through setting up the **AlgoFlex** project, which consists of a **Python (Django) backend** and a **React frontend**.  

---

## Prerequisites  
Ensure you have the following installed on your system:  

- **Python 3.8+**  
- **pip** (comes with Python)  
- **virtualenv** (for creating a virtual environment)  
- **Node.js 18+**  
- **npm or yarn**  
- **PostgreSQL or SQLite** (depending on the backend configuration)  

---

# 🔹 Backend Setup (Django API)  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/your-username/algoflex.git
cd algoflex/backend
```

### 2️⃣ Create a Virtual Environment  
```bash
python -m venv venv
```

### 3️⃣ Activate the Virtual Environment  
#### On Windows (Command Prompt)  
```bash
venv\Scripts\activate
```
#### On macOS/Linux  
```bash
source venv/bin/activate
```

### 4️⃣ Install Dependencies  
```bash
pip install -r requirements.txt
```

### 5️⃣ Apply Migrations  
```bash
python manage.py migrate
```

### 6️⃣ Create a Superuser (Optional, for Django Admin)  
```bash
python manage.py createsuperuser
```
Follow the prompts to set up an admin account.

### 7️⃣ Start the Django Server  
```bash
python manage.py runserver
```
Your Django API will be running at **http://127.0.0.1:8000/**.  

---

# 🔹 Frontend Setup (React)  

### 1️⃣ Navigate to the `frontend` Folder  
```bash
cd ../frontend
```

### 2️⃣ Install Dependencies  
```bash
npm install
```
or  
```bash
yarn install
```

### 3️⃣ Start the React Development Server  
```bash
npm run dev
```
or  
```bash
yarn dev
```
Your React frontend will be running at **http://localhost:5173/** (default Vite port).  

---

# 🔹 Environment Variables  

## ✅ Backend (`.env` in `backend/`)  
Create a `.env` file inside the `backend/` folder and define:  
```
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3  # Use PostgreSQL if needed
```

## ✅ Frontend (`.env` in `frontend/`)  
Create a `.env` file inside the `frontend/` folder and define:  
```
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

---

# 🔹 API Routes  

| Endpoint             | Method | Description             |
|----------------------|--------|-------------------------|
| `/api/login/`       | POST   | User login              |
| `/api/campaigns/`   | GET    | Get campaigns data      |
| `/api/reviews/`     | GET    | Get call review details |

---

# 🔹 Common Issues & Fixes  

1️⃣ **If migrations fail**  
```bash
python manage.py makemigrations
python manage.py migrate
```

2️⃣ **If React doesn't start due to port issues**  
Change the default port in `vite.config.js`:  
```js
server: {
  port: 3000
}
```

---

