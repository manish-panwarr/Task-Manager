const express = require("express");
const router = express.Router();

const {registerUser,loginUser,getUserProfile,updateUserProfile,uploadImage} = require("../controllers/authController");
const {protect} = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

// Auth Routes
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",protect,getUserProfile);;
router.put("/profile",protect,updateUserProfile);

router.post("/upload-image", upload.single("image"), uploadImage);


module.exports=router;