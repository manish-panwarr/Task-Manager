const Task = require("../models/Task");
const User = require("../models/User");
const excelJS = require("exceljs");

// @desc    Export all tasks as Excel file
// @route   GET /api/reports/export/tasks
// @access  Private/Admin
// @desc    Export all tasks as Excel file
// @route   GET /api/reports/export/tasks
// @access  Private/Admin
const exportTasksReport = async (req, res) => {
    try {
        const tasks = await Task.find().populate("assignedTo", "name email");
        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("Tasks");

        worksheet.columns = [
            { header: "Task ID", key: "_id", width: 25 },
            { header: "Title", key: "title", width: 30 },
            { header: "Description", key: "description", width: 50 },
            { header: "Status", key: "status", width: 15 },
            { header: "Priority", key: "priority", width: 15 },
            { header: "Due Date", key: "dueDate", width: 15 },
            { header: "Assigned To", key: "assignedTo", width: 40 },
        ];

        // Style the header row
        const headerRow = worksheet.getRow(1);
        headerRow.font = { bold: true, size: 12, color: { argb: "FFFFFFFF" } };
        headerRow.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF4F81BD" },
        };

        tasks.forEach((task) => {
            const assignedTo = task.assignedTo
                ? task.assignedTo.map((user) => `${user.name} (${user.email})`).join(", ")
                : "Unassigned";

            worksheet.addRow({
                _id: task._id.toString(),
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                dueDate: task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A",
                assignedTo: assignedTo,
            });
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=tasks_report.xlsx"
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error("Error exporting tasks report:", error);
        res.status(500).json({ message: "Error exporting tasks report" });
    }
};

// @desc    Export all users as Excel file
// @route   GET /api/reports/export/users
// @access  Private/Admin
const exportUsersReport = async (req, res) => {
    try {
        const users = await User.find().select("name email _id role").lean();
        const userTasks = await Task.find().populate("assignedTo", "name email _id");

        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("Users");

        // Initialize user map
        const userTaskMap = {};
        users.forEach((user) => {
            if (user && user._id) {
                userTaskMap[user._id.toString()] = {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    taskCount: 0,
                    pendingTasks: 0,
                    inProgressTasks: 0,
                    completedTasks: 0,
                };
            }
        });

        // Calculate task stats
        userTasks.forEach((task) => {
            if (task.assignedTo && Array.isArray(task.assignedTo)) {
                task.assignedTo.forEach((assignedUser) => {
                    if (assignedUser) {  // Check if assignedUser exists (not null due to populate issues)
                        const userId = assignedUser._id.toString();
                        if (userTaskMap[userId]) {
                            userTaskMap[userId].taskCount += 1;
                            if (task.status === "Pending") {
                                userTaskMap[userId].pendingTasks += 1;
                            } else if (task.status === "In Progress") {
                                userTaskMap[userId].inProgressTasks += 1;
                            } else if (task.status === "Completed") {
                                userTaskMap[userId].completedTasks += 1;
                            }
                        }
                    }
                });
            }
        });

        worksheet.columns = [
            { header: "User Name", key: "name", width: 25 },
            { header: "Email", key: "email", width: 30 },
            { header: "Role", key: "role", width: 15 },
            { header: "Total Tasks", key: "taskCount", width: 15 },
            { header: "Pending", key: "pendingTasks", width: 15 },
            { header: "In Progress", key: "inProgressTasks", width: 15 },
            { header: "Completed", key: "completedTasks", width: 15 },
        ];

        // Style the header row
        const headerRow = worksheet.getRow(1);
        headerRow.font = { bold: true, size: 12, color: { argb: "FFFFFFFF" } };
        headerRow.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF4F81BD" },
        };

        Object.values(userTaskMap).forEach((userStat) => {
            worksheet.addRow(userStat);
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=users_report.xlsx"
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error("Error exporting users report:", error.message, error.stack);
        res.status(500).json({ message: "Error exporting users report" });
    }
};


module.exports = {
    exportTasksReport,
    exportUsersReport
};
