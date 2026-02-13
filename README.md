#📋 Project Description

A comprehensive **Task Management System** built with the **MERN stack** that enables organizations to efficiently manage tasks, track user performance, and monitor project progress.

The application features **Role-Based Access Control (RBAC)** with three distinct user roles:

* **Admin**
* **Manager**
* **Member**
<img width="1890" height="961" alt="admin-controll" src="https://github.com/user-attachments/assets/329a7fcb-a2f4-4f05-a409-ff27d45a3633" />
<img width="1889" height="963" alt="all-teamMemebrs" src="https://github.com/user-attachments/assets/05d6fd13-dd7b-4db6-ba34-f613ad53bf5e" />
<img width="1902" height="852" alt="Taskcreation" src="https://github.com/user-attachments/assets/ac23f4f4-726b-4462-9799-68821e59dd5b" />
<img width="1889" height="960" alt="admin-alltasks" src="https://github.com/user-attachments/assets/d22647ae-568d-4ca5-9dbc-b4f8784d3fc6" />
<img width="1885" height="967" alt="admin-dashboard-progress" src="https://github.com/user-attachments/assets/23708e95-1411-40e6-a8a0-adeba16c970e" />
<img width="1896" height="966" alt="admin-dashboard" src="https://github.com/user-attachments/assets/1180d1f3-b4ca-47cf-a65d-b5a7404ae20c" />
<img width="1897" height="886" alt="dashboard" src="https://github.com/user-attachments/assets/164d9094-71ce-4b09-9457-fa4679491113" />
<img width="1894" height="892" alt="Profile" src="https://github.com/user-attachments/assets/b63014c1-a8ca-4681-ac83-cf930e5e85b5" />
<img width="1895" height="899" alt="Tasks" src="https://github.com/user-attachments/assets/ff18fe3e-bc4c-4336-88f0-399749f40cd9" />


LIVE_LINK : https://task-manager-seven-swart-84.vercel.app/login
---

## 🌟 Key Highlights

* **🔐 Role-Based Access Control (RBAC):** Granular permissions for admins, managers, and members
* **⏱ Real-time Task Tracking:** Monitor task status, progress, and deadlines
* **📊 Performance Analytics:** Dashboard with charts, statistics, and performance metrics
* **📁 File Management:** Cloudinary integration for file uploads and attachments
* **👥 User Management:** Comprehensive administration with hold/release functionality
* **📤 Export Capabilities:** Generate Excel reports for tasks and user performance

---

# ✨ Features

---

## 🔐 Authentication & Authorization

* JWT-based authentication with secure login/signup
* Password encryption using **bcrypt**
* Role-based access control (Admin, Manager, Member)
* Protected routes with middleware authorization

---

## 👥 User Management

* User CRUD operations (Create, Read, Update, Delete)
* Profile management with photo upload
* Department-based organization
* **User Hold/Release Functionality** – Prevent users on hold from receiving new task assignments
* Separate management interfaces for Admins and Managers
* User performance tracking

---

## 📝 Task Management

* Create tasks with:

  * Title
  * Description
  * Priority
  * Due date
* Assign tasks to multiple users
* Task status tracking:

  * Pending
  * In Progress
  * Completed
* Priority levels:

  * Low
  * Medium
  * High
* File attachments (images, documents, PDFs) via Cloudinary
* External resource link attachments
* Todo checklists within tasks (auto-progress calculation)
* Search and filter by:

  * Status
  * Department
  * Keywords
* Task editing and deletion with permission checks
* Automatic release from hold when all tasks are completed

---

## 📊 Dashboard & Analytics

* Interactive charts:

  * Bar charts
  * Line charts
  * Pie charts (using Recharts)
* Task distribution by status and priority
* Department-wise task analysis
* Last 7 days activity tracking
* Top performers leaderboard
* Active workload monitoring
* Recent tasks overview
* Statistical summary cards for quick insights

---

## 📈 Reporting

* Excel export for tasks
* Excel export for user performance data
* Customizable report generation

---

## 🎨 UI/UX Features

* Fully responsive design with Tailwind CSS
* Modern, clean interface
* Toast notifications for feedback (React Hot Toast)
* Modal dialogs for forms and confirmations
* Loading states and progress indicators
* Avatar groups for assigned users
* Status tabs for task filtering
* Date formatting with Moment.js


🏗️ Folder Structure
📦 Project Root
 ├── 📁 frontend
 └── 📁 backend

Task-Manager/
backend/
├── config/
│   └── db.js                         # MongoDB connection configuration
│
├── controllers/
│   ├── authController.js             # Authentication logic (login, signup)
│   ├── reportController.js           # Report generation (Excel exports)
│   ├── taskController.js             # Task CRUD operations
│   └── userController.js             # User management operations
│
├── middlewares/
│   ├── authMiddleware.js             # JWT authentication middleware
│   └── uploadMiddleware.js           # Multer file upload configuration
│
├── models/
│   ├── Task.js                       # Task schema (title, status, priority, etc.)
│   └── User.js                       # User schema (name, email, role, etc.)
│
├── routes/
│   ├── authRoutes.js                 # Auth endpoints (/login, /signup)
│   ├── reportRoutes.js               # Report endpoints
│   ├── taskRoutes.js                 # Task CRUD endpoints
│   └── userRoutes.js                 # User management endpoints
│
├── uploads/                          # Temporary file storage (before Cloudinary)
│
├── utils/
│   └── cloudinary.js                 # Cloudinary configuration
│
├── .env                              # Environment variables
├── package.json                      # Backend dependencies
└── server.js                         # Express server entry point




frontend/Task-Manager/
frontend/Task-Manager/
├── public/
│   └── images/                     # Static images
│
├── src/
│   ├── assets/                     # Static assets
│
│   ├── components/
│   │   ├── Cards/
│   │   │   ├── InfoCard.jsx              # Dashboard info cards
│   │   │   ├── TaskCard.jsx              # Task display card
│   │   │   ├── UpdateUserModal.jsx       # User update modal
│   │   │   ├── UserCard.jsx              # User display card
│   │   │   └── UserPerformanceCard.jsx
│   │   │
│   │   ├── Charts/
│   │   │   ├── CustomBarChart.jsx
│   │   │   ├── CustomLegend.jsx
│   │   │   ├── CustomLineChart.jsx
│   │   │   ├── CustomPieChart.jsx
│   │   │   └── CustomTooltip.jsx
│   │   │
│   │   ├── inputs/
│   │   │   ├── AddAttachmentsInput.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── ProfilePhotoSelector.jsx
│   │   │   ├── SelectDropdown.jsx
│   │   │   ├── SelectUsers.jsx
│   │   │   └── TodoListInput.jsx
│   │   │
│   │   ├── layouts/
│   │   │   ├── AuthLayout.jsx
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── DeleteAlert.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Progress.jsx
│   │   │   ├── SideMenu.jsx
│   │   │   └── TaskListTable.jsx
│   │   │
│   │   ├── AvatarGroup.jsx
│   │   ├── Modal.jsx
│   │   ├── TaskListTable.jsx
│   │   └── TaskStatusTabs.jsx
│
│   ├── context/
│   │   └── userContext.jsx          # Global user state management
│
│   ├── hooks/
│   │   └── useUserAuth.jsx          # Authentication hook
│
│   ├── pages/
│   │   ├── Admin/
│   │   │   ├── AdminDetails.jsx
│   │   │   ├── CreateTask.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ManageAdmins.jsx
│   │   │   ├── ManageTasks.jsx
│   │   │   ├── ManageUsers.jsx
│   │   │   ├── ManagerDashboard.jsx
│   │   │   └── UserDetails.jsx
│   │   │
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── SignUp.jsx
│   │   │
│   │   └── User/
│   │       ├── MyTasks.jsx
│   │       ├── UserDashboard.jsx
│   │       ├── UserProfile.jsx
│   │       └── ViewTaskDetails.jsx
│
│   ├── routes/
│   │   └── PrivateRoute.jsx         # Route protection component
│
│   ├── utils/                       # Utility functions
│   ├── App.jsx                      # Main app component with routing
│   ├── index.css                    # Tailwind CSS and global styles
│   └── main.jsx                     # React entry point
│
├── .eslintrc.config.js
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js




🛠️ Technologies Used
Backend
Technology	Version	Purpose
Node.js	Latest	JavaScript runtime environment
Express.js	^5.2.1	Web application framework
MongoDB	^7.0.0	NoSQL database
Mongoose	^9.1.5	ODM for MongoDB
bcryptjs	^3.0.3	Password hashing
jsonwebtoken	^9.0.3	JWT authentication
CORS	^2.8.6	Cross-origin resource sharing
Cloudinary	^2.9.0	Cloud-based image/file storage
Multer	^2.0.2	File upload middleware
ExcelJS	^4.4.0	Excel file generation
Moment.js	^2.30.1	Date manipulation
dotenv	^17.2.3	Environment variable management
Nodemon	^3.1.11	Development server auto-restart


Frontend
Technology	Version	Purpose
React	^19.2.0	UI library
React Router DOM	^7.13.0	Client-side routing
Vite	^7.2.4	Build tool and dev server
Tailwind CSS	^4.1.18	Utility-first CSS framework
Axios	^1.13.4	HTTP client
Recharts	^3.7.0	Chart library
React Icons	^5.5.0	Icon components
React Hot Toast	^2.6.0	Toast notifications
Moment.js	^2.30.1	Date formatting
ESLint	^9.39.1	Code linting
Database
MongoDB Atlas (Cloud) or Local MongoDB
Cloud Services
Cloudinary - Image and file storage


🗄️ Database Models

User Model
javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  profileImageUrl: String,
  department: String,
  role: String (enum: ["admin", "member", "manager"]),
  isOnHold: Boolean (default: false),
  timestamps: true
}


Task Model
{
  title: String,
  description: String,
  priority: String (enum: ["Low", "Medium", "High"]),
  status: String (enum: ["Pending", "In Progress", "Completed"]),
  dueDate: Date,
  assignedTo: [ObjectId] (references User),
  createdBy: ObjectId (references User),
  attachments: [{
    fileUrl: String,
    fileType: String,
    originalName: String,
    publicId: String
  }],
  todoChecklist: [{
    text: String,
    completed: Boolean
  }],
  progress: Number (0-100),
  timestamps: true
}


# 🚀 Deployment Steps

## 📌 Prerequisites

Before starting, make sure you have:

* **Node.js** (v14 or higher)
* **MongoDB** database (Atlas or local)
* **Cloudinary** account
* **Git**

---

## 1️⃣ Clone the Repository

```bash
git clone <your-repository-url>
cd "Task-manager app"
```

---

## 2️⃣ Backend Setup

### 📦 Install Dependencies

```bash
cd backend
npm install
```

### ⚙️ Configure Environment Variables

Create a `.env` file inside the `backend/` directory and add:

```env
# Server Configuration
PORT=5000
CLIENT_URL=http://localhost:5173

# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### ▶️ Start Backend Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

📍 Server will run on:

```
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

### 📦 Install Dependencies

```bash
cd frontend/Task-Manager
npm install
```

### 🔗 Configure API Endpoint

Update your API base URL in your frontend configuration file (e.g., config file or axios instance):

```javascript
const API_URL = "http://localhost:5000/api";
```

### ▶️ Start Frontend Development Server

```bash
npm run dev
```

📍 Frontend will run on:

```
http://localhost:5173
```

---

## 4️⃣ Production Build

### 🖥 Backend (Production)

```bash
cd backend
npm start
```

### 🌐 Frontend (Production Build)

```bash
cd frontend/Task-Manager
npm run build
npm run preview   # Test production build locally
```



# 📌 API Endpoints Overview

---

## 🔐 Authentication

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | `/api/auth/signup` | Register new user |
| POST   | `/api/auth/login`  | User login        |

---

## 👥 Users

| Method | Endpoint                 | Description            |
| ------ | ------------------------ | ---------------------- |
| GET    | `/api/users`             | Get all users          |
| GET    | `/api/users/:id`         | Get user by ID         |
| PUT    | `/api/users/:id`         | Update user            |
| DELETE | `/api/users/:id`         | Delete user            |
| PUT    | `/api/users/:id/hold`    | Put user on hold       |
| PUT    | `/api/users/:id/release` | Release user from hold |

---

## 📝 Tasks

| Method | Endpoint                    | Description                      |
| ------ | --------------------------- | -------------------------------- |
| GET    | `/api/tasks`                | Get all tasks (filtered by role) |
| GET    | `/api/tasks/:id`            | Get task by ID                   |
| POST   | `/api/tasks`                | Create new task                  |
| PUT    | `/api/tasks/:id`            | Update task                      |
| DELETE | `/api/tasks/:id`            | Delete task                      |
| PUT    | `/api/tasks/:id/status`     | Update task status               |
| PUT    | `/api/tasks/:id/todo`       | Update todo checklist            |
| GET    | `/api/tasks/dashboard-data` | Get dashboard analytics          |

---

## 📈 Reports

| Method | Endpoint                   | Description                      |
| ------ | -------------------------- | -------------------------------- |
| GET    | `/api/reports/tasks/excel` | Export tasks to Excel            |
| GET    | `/api/reports/users/excel` | Export user performance to Excel |

---

# 🎯 User Roles & Permissions

---

## 👑 Admin

* Full access to all features
* Manage all users and tasks
* View all analytics
* ❌ Cannot be put on hold

---

## 🧑‍💼 Manager

* All admin privileges
* Manager-specific dashboard
* Can edit/delete any task
* ❌ Cannot be put on hold

---

## 👤 Member (User)

* View assigned tasks only
* Update task status and checklist
* View personal dashboard
* ✅ Can be put on hold (prevents new task assignments)

---

# 📝 Notes

* **File Uploads:** Files are temporarily stored in `backend/uploads/` before being uploaded to Cloudinary
* **Authentication:** All routes (except login/signup) require a JWT token in the `Authorization` header
* **CORS:** Configured to allow requests from the frontend URL
* **Auto Hold Release:** Users are automatically released from hold when all assigned tasks are completed

---

# 🐛 Troubleshooting

## Common Issues

* **MongoDB Connection Error:** Check `MONGO_URI` in `.env`
* **Cloudinary Upload Failed:** Verify Cloudinary credentials
* **CORS Error:** Ensure `CLIENT_URL` matches frontend URL
* **JWT Invalid:** Confirm `JWT_SECRET` consistency between token generation and verification

---

# 📧 Support

For deployment support or questions, please refer to the project documentation or contact the development team.

---

**Last Updated:** February 2026
**Version:** 1.0.0
