const jwt = require("jsonwebtoken");;
const User = require("../models/User");

// Middleware to protect routes

const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token || !token.startsWith("Bearer")) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }
        token = token.split(" ")[1]; // Extract token from "Bearer <token>"
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Not authorized, no token, token failed" });
    }
};

// Middleware to check if user is admin

const adminOnly = (req, res, next) => {
    if (req.user && (req.user.role === "admin" || req.user.role === "manager")) {
        next();
    } else {
        res.status(403).json({ message: "Access denied,Not authorized as admin" });
    }
};


// Handle file upload 

const uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    /*    Yeh line kya karti hai? Jab file upload ho jaati hai, toh frontend (React/Angular) ko us image ko dikhane ke liye ek link (URL) chahiye hota hai. Yeh line wahi complete link bana rahi hai.

Iske tukde (parts) dekhte hain:

(1) req.protocol: Yeh batata hai ki protocol kaunsa hai—http hai ya https.
(2) ://: Yeh URL ka standard separator hai.
(3) req.get("host"): Yeh aapke server ka address batata hai jahan code run kar raha hai. (Jaise: localhost:5000 ya mywebsite.com).
(4) /uploads/: Yeh wo folder hai jahan aapne images rakhi hain aur jise aapne server par "static" banaya hoga taaki browser unhe access kar sake.
(5) req.file.filename: Multer ne file ko save karte waqt jo naya naam diya hai (Jo Date.now()... karke bana tha), yeh wo naam hai.
Final Result aisa dikhega: http://localhost:5000/uploads/1706598212345-myphoto.jpg*/
    res.status(200).json({ imageUrl });
}


module.exports = { protect, adminOnly };
