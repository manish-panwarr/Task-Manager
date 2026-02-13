const express = require("express");
const { adminOnly, protect } = require("../middlewares/authMiddleware");
const { getUsers, getUserById, deleteUser, updateUser, getManagerDashboardStats } = require("../controllers/userController");

const router = express.Router();

// User Management Routes
router.get("/", protect, adminOnly, getUsers); // Get all users (Admin only)
router.get("/manager-dashboard-stats", protect, adminOnly, getManagerDashboardStats); // Manager Dashboard Stats (Manager Check inside controller)
router.get("/:id", protect, getUserById); // Get user by ID (Admin only)
router.put("/:id", protect, adminOnly, updateUser); // Update user (Admin only)
router.delete("/:id", protect, adminOnly, deleteUser); // Delete user (Admin only)

module.exports = router;