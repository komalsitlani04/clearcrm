# ClearCRM — Lead Management CRM

A full-stack CRM web application built with the MERN stack that replicates core Salesforce concepts — lead management, sales pipeline tracking, JWT authentication, and an analytics dashboard.

-----

## ✨ Features

- 🔐 *JWT Authentication* — Secure register/login with token-based sessions
- 👤 *Owner-scoped Data* — Each user sees and manages only their own leads
- 📋 *Lead Management* — Full CRUD (Create, Read, Update, Delete) for leads
- 🔄 *Sales Pipeline* — Track leads across 5 stages: New → Contacted → Qualified → Converted → Lost
- 📊 *Analytics Dashboard* — Real-time pipeline stats, stage-wise counts and percentage breakdowns
- 🔍 *Search & Filter* — Search leads by name, email, or company; filter by pipeline status
- 📌 *Lead Source Tracking* — Track where each lead came from (Website, Referral, Social Media, etc.)
- 📱 *Fully Responsive* — Works seamlessly across desktop, tablet, and mobile

-----

## 🛠️ Tech Stack

|Layer        |Technology                              |
|-------------|----------------------------------------|
|Frontend     |React.js, HTML5, CSS3, JavaScript (ES6+)|
|Backend      |Node.js, Express.js, RESTful APIs       |
|Database     |MongoDB, Mongoose                       |
|Auth         |JWT (JSON Web Tokens), Bcrypt           |
|Icons        |Lucide React                            |
|Notifications|React Hot Toast                         |

-----

## 📁 Project Structure


mini-crm/
├── backend/
│   ├── models/
│   │   ├── Lead.js          # Lead schema with pipeline stages
│   │   └── User.js          # User schema
│   ├── routes/
│   │   ├── auth.js          # Register & Login routes
│   │   └── leads.js         # CRUD + stats routes
│   ├── middleware/
│   │   └── auth.js          # JWT verification middleware
│   └── server.js            # Express server entry point
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── LeadCard.jsx
│   │   │   ├── LeadModal.jsx
│   │   │   └── StatCard.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Leads.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   └── api/
│   │       └── axios.js
└── README.md


-----

## 🚀 Run Locally

### Prerequisites

- Node.js v18+
- MongoDB installed locally or a MongoDB Atlas account

### 1. Clone the repo

bash
git clone https://github.com/komalsitlani04/clearcrm.git
cd clearcrm/mini-crm


### 2. Setup Backend

bash
cd backend
npm install


Create a .env file inside backend/:


MONGO_URI=mongodb://localhost:27017/minicrm
JWT_SECRET=your_secret_key
PORT=5000


Start the backend:

bash
node server.js


### 3. Setup Frontend

bash
cd ../frontend
npm install
npm run dev


Open *<http://localhost:5173>* in your browser.

-----

## 🌐 API Endpoints

### Auth

|Method|Endpoint            |Description        |
|------|--------------------|-------------------|
|POST  |/api/auth/register|Register a new user|
|POST  |/api/auth/login   |Login and get token|

### Leads

|Method|Endpoint                  |Description                         |
|------|--------------------------|------------------------------------|
|GET   |/api/leads              |Get all leads (with search & filter)|
|POST  |/api/leads              |Create a new lead                   |
|PUT   |/api/leads/:id          |Update a lead                       |
|DELETE|/api/leads/:id          |Delete a lead                       |
|GET   |/api/leads/stats/summary|Get dashboard pipeline stats        |

-----

## 💡 CRM Concepts Implemented

This project was built to understand the core data model behind CRM platforms like Salesforce:

|ClearCRM            |Salesforce Equivalent      |
|--------------------|---------------------------|
|Lead Status Pipeline|Lead Status Field          |
|Lead Source         |Lead Source Field          |
|Owner-scoped data   |Record Ownership           |
|Dashboard stats     |Reports & Dashboards       |
|JWT authentication  |Salesforce Login & Sessions|

-----

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
