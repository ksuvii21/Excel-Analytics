# 📊 Excel Analytics Platform

A full-stack **MERN application** that allows users to upload Excel files, analyze data, and generate **interactive 2D and 3D charts** with download options. The platform provides **personal dashboards**, **admin management tools**, and optional **AI-powered insights** for smarter data summaries.

---

## 🚀 Project Overview

This project is built for students to gain **hands-on experience** in complete MERN stack development.  
It is designed as a **10-week structured program** split into two 5-week modules:

1. **Frontend Development (React, Tailwind, Vite)**  
2. **Backend Development (Node.js, Express, MongoDB)**  

The platform emphasizes **data visualization, user management, and real-time analytics**.

---

## ✨ Features

### User Features
1. Upload `.xls` or `.xlsx` files 📂  
2. Select **X and Y axes** from column headers  
3. Generate **2D and 3D charts** (line, bar, pie, scatter, etc.)  
4. Download generated charts  
5. View **history of uploads and analyses** on dashboard  

### Admin Features
1. Manage users and their file usage  
2. Monitor platform activity and system metrics  
3. Role-based dashboards (Admin / Super Admin)  

### Advanced Features
1. **AI integration (optional)** – smart insights and summary reports  
2. Secure authentication and role-based access  
3. Responsive UI with **Tailwind CSS**  

---

## 🛠️ Tech Stack

**Frontend (excel-analytics-frontend):**
- React.js (Vite)
- Tailwind CSS
- Context API (Auth & Dashboard State)
- Chart libraries (2D and 3D visualization)

**Backend (excel-analytics-backend):**
- Node.js + Express.js
- MongoDB (Mongoose ORM)
- Multer (Excel file upload)
- JWT Authentication
- AI APIs (optional for insights)

---

## 📸 Preview

![Portfolio Preview](https://github.com/ksuvii21/Excel-Analytics/blob/main/excel-analytics-frontend/src/asserts/Preview.png)

---

## 📂 File Structure

### Frontend
excel-analytics-frontend/

│-- index.html
│-- postcss.config.cjs
│-- tailwind.config.js
│-- vite.config.js
│-- .env
│-- package-lock.json

│-- src/

│ │-- asserts/ # images

│ │-- components/
│ │ ├─ admin / UserManagement.jsx
│ │ ├─ superadmin / SystemMetrics.jsx

│ │ ├─ AdminPanel.jsx
│ │ ├─ ChartCard.jsx
│ │ ├─ DashboardContent.jsx
│ │ ├─ FileUpload.jsx
│ │ ├─ HistoryTable.jsx
│ │ ├─ InsightsButton.jsx
│ │ ├─ Navbar.jsx
│ │ ├─ Sidebar.jsx
│ │ ├─ UploadForm.jsx
│ │ |─ AdminRoute.jsx
│ │ ├─ FileTable.jsx
│ │ ├─ Footer.jsx
│ │ ├─ StatCard.jsx
│ │ ├─ SuperAdminRoute.jsx

│ │-- context/AuthContext.jsx

│ │-- hooks/useDashboardData.js

│ │-- layouts/
│ │ ├─ AdminLayout.jsx
│ │ ├─ UserLayout.jsx
│ │ |─ SuperAdminLayout.jsx
│ │ |─ LayoutSwitcher.jsx

│ │-- pages/
│ │ ├─ dashboard/UserDashboard.jsx
│ │ ├─ dashboard/AdminDashboard.jsx
│ │ ├─ dashboard/SuperAdminDashboard.jsx

│ │ ├─ Login.jsx
│ │ ├─ Register.jsx
│ │ ├─ Upload.jsx
│ │ ├─ Landing.jsx
│ │ └─ ...

│ │-- routes/AppRoutes.jsx

│ │-- utils/api.js
│ │-- utils/http.js

│ │-- App.jsx
│ │-- main.jsx
│ │-- index.css
│ │-- style.css
│ │-- vite-env.d.ts


### Backend
excel-analytics-backend/

│-- .env
│-- server.js
│-- package-lock.json

│-- src/

│ │-- config/db.js

│ │-- controllers/
│ │ ├─ adminController.js
│ │ ├─ authController.js
│ │ ├─ fileController.js
│ │ ├─ insightController.js

│ │-- middleware/  
│ │ ├─ auth.js
│ │ ├─ upload.js
│ │ └─ roles.js

│ │-- models/  
│ │ ├─ AIInsight.js
│ │ ├─ File.js
│ │ ├─ History.js
│ │ └─ User.js

│ │-- routes/ 
│ │ ├─ adminRoutes.js
│ │ ├─ authRoutes.js
│ │ ├─ fileRoutes.js
│ │ ├─ history.js
│ │ └─ insightRoutes.js

---

## ⚙️ Installation & Setup

### 1. Clone repository
```bash
git clone https://github.com/your-repo/excel-analytics-platform.git

cd excel-analytics-platform
npm install
cp .env.example .env   # configure API URL
npm run dev

cd excel-analytics-backend
npm install
cp .env.example .env   # configure DB, JWT secret, etc.
npm run dev
```

### 📊 Usage Workflow

1. Register/Login
2. Upload Excel file
3. Select chart options
4. Generate visualization
5. Download chart or view history
6. Admins monitor user activity

### 🔒 Authentication & Roles

• User – upload, analyze, download, history
• Admin – manage users, monitor activity
• Super Admin – system metrics, role management

### 📈 Future Enhancements

1. Real-time collaborative dashboards
2. AI-powered predictive analytics
3. Cloud file storage integration
4. Export reports (PDF, PPTX, DOCX)

### 🧑‍💻 Contributors
This project is developed as part of a MERN stack learning program.
Contributions are welcome via pull requests.

## 🔗 Connect With Me

- 📧 Email: k21ritikasuvi2106@gmail.com
- 💼 LinkedIn: www.linkedin.com/in/kritika-gupta2106
- 🚀 Github: https://github.com/ksuvii21

### 📜 License
#### MIT License – free to use and modify.

Rationale: This README provides a professional, structured, and visually styled documentation with clear sections (overview, features, stack, structure, setup, workflow). It balances technical detail with readability.  
Recommendation: Keep this README inside the project root.  
Next step: Update `.env.example` files with required variables and add demo screenshots/gifs for clarity.

