require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const reportRoutes = require("./routes/reportRoutes");


const app = express();

// Middleware to handle CORS
const allowedOrigins = [
    "http://localhost:5173",
    "https://task-manager-sable-five.vercel.app",
    process.env.CLIENT_URL
].filter(Boolean); // Remove undefined/null values

app.use(
    cors({
        // 1. origin: कौन मेरे घर (server) आ सकता है?
        // Multiple origins को allow करने के लिए function use करते हैं
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);

            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        // 2. methods: आने वाला क्या-क्या कर सकता है?
        // GET (लेना), POST (देना), PUT (बदलना), DELETE (हटाना)
        methods: ["GET", "POST", "PUT", "DELETE"],
        // 3. allowedHeaders: साथ में क्या ला सकता है?
        // जैसे 'Content-Type' (बताता है कि डेटा JSON है)
        // और 'Authorization' (जिसमें लॉगिन टोकन होता है)
        allowedHeaders: ["Content-Type", "Authorization"],
        // 4. credentials: Cookies और authentication headers को allow करें
        credentials: true
    })
);


// connect Database
connectDB();

// Middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reports", reportRoutes);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));