import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/Cards/InfoCard";
import CustomPieChart from "../../components/Charts/CustomPieChart";
import CustomBarChart from "../../components/Charts/CustomBarChart";
import { addThousandsSeparator, getInitials, getAvatarUrl } from "../../utils/helper";
import AvatarGroup from "../../components/AvatarGroup"; // Assuming this exists or similar

const PIE_COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"];

const ManagerDashboard = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [stats, setStats] = useState(null);
    const [userPerformance, setUserPerformance] = useState([]);
    const [loading, setLoading] = useState(true);

    const [pieChartData, setPieChartData] = useState([]);
    const [barChartData, setBarChartData] = useState([]);

    const getDashboardStats = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.USERS.GET_MANAGER_DASHBOARD_STATS);
            if (response.data) {
                setStats(response.data.counts);
                setUserPerformance(response.data.userPerformance);
                prepareCharts(response.data);
            }
        } catch (error) {
            console.error("Manager Dashboard Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const prepareCharts = (data) => {
        const { counts, userPerformance } = data;

        // Pie Chart: Task Status
        const pieData = [
            { status: "Pending", count: counts.pendingTasks || 0 },
            { status: "In Progress", count: counts.inProgressTasks || 0 },
            { status: "Completed", count: counts.completedTasks || 0 },
        ];
        setPieChartData(pieData);

        // Bar Chart: Top 5 Users by Tasks Completed
        const sortedUsers = [...userPerformance].sort((a, b) => b.completedAssigned - a.completedAssigned).slice(0, 5);
        const barData = sortedUsers.map(u => ({
            priority: u.name, // Reusing CustomBarChart prop 'priority' for X-axis label
            count: u.completedAssigned
        }));
        setBarChartData(barData);
    };

    useEffect(() => {
        getDashboardStats();
    }, []);

    const handleProfileClick = (userId, role) => {
        if (role === 'admin' || role === 'manager') {
            navigate(`/admin/admins/${userId}`);
        } else {
            navigate(`/admin/users/${userId}`);
        }
    };

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="card my-5">
                <h2 className="text-xl md:text-2xl">
                    Manager Overview
                </h2>
                <p className="text-xs md:text-[13px] text-gray-400 mt-1.5 flex items-center gap-2">
                    Welcome back, {user?.name}
                    <span className="text-[10px] font-medium text-white bg-purple-600 px-2 py-0.5 rounded">Manager</span>
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <InfoCard label="Total Users" value={stats?.totalUsers || 0} color="bg-blue-500" />
                    <InfoCard label="Total Admins" value={stats?.totalAdmins || 0} color="bg-purple-500" />
                    <InfoCard label="Total Tasks" value={stats?.totalTasks || 0} color="bg-indigo-500" />
                    <InfoCard label="Completion Rate" value={`${stats?.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0}%`} color="bg-emerald-500" />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="card">
                    <h5 className="font-medium mb-3">Overall Task Status</h5>
                    <CustomPieChart data={pieChartData} colors={PIE_COLORS} />
                </div>
                <div className="card">
                    <h5 className="font-medium mb-3">Top Performers (Completed Tasks)</h5>
                    <CustomBarChart data={barChartData} />
                </div>
            </div>

            <div className="card my-6">
                <h5 className="text-lg mb-4">User Performance Table</h5>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead>
                            <tr className="text-left border-b border-gray-200 text-gray-500 text-sm">
                                <th className="py-3 px-4 font-medium">User</th>
                                <th className="py-3 px-4 font-medium">Role</th>
                                <th className="py-3 px-4 font-medium">Assigned</th>
                                <th className="py-3 px-4 font-medium">Completed</th>
                                <th className="py-3 px-4 font-medium">Created</th>
                                <th className="py-3 px-4 font-medium">Rate</th>
                                <th className="py-3 px-4 font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userPerformance.map((u) => (
                                <tr key={u._id} className="border-b last:border-b-0 border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                                {u.profileImageUrl ? (
                                                    <img src={u.profileImageUrl} alt={u.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-sm font-medium text-gray-500">{getInitials(u.name)}</span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{u.name}</p>
                                                <p className="text-xs text-gray-500">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium 
                                            ${u.role === 'manager' ? 'bg-purple-100 text-purple-700' :
                                                u.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {u.role.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-700">{u.assignedCount}</td>
                                    <td className="py-3 px-4 text-sm text-gray-700">{u.completedAssigned}</td>
                                    <td className="py-3 px-4 text-sm text-gray-700">{u.createdCount}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${u.completionRate}%` }}></div>
                                            </div>
                                            <span className="text-xs text-gray-500">{u.completionRate}%</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => handleProfileClick(u._id, u.role)}
                                            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            View Profile
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ManagerDashboard;
