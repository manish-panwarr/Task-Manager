import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useNavigate, useLocation } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import { LuFileSpreadsheet, LuSearch } from "react-icons/lu";
import TaskStatusTabs from '../../components/TaskStatusTabs';
import TaskCard from '../../components/Cards/TaskCard';
import SelectDropdown from '../../components/inputs/SelectDropdown';

import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

const ManageTasks = () => {

  const navigate = useNavigate();
  const location = useLocation(); // Import useLocation if not already
  const { user } = useContext(UserContext); // Get current user

  // Check for initial filter from navigation state
  const initialFilterOwner = location.state?.filterOwner || "All";

  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterOwner, setFilterOwner] = useState(initialFilterOwner); // Initialize with state or default "All"

  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: {
          status: filterStatus === "All" ? "" : filterStatus,
          department: filterDepartment,
          search: searchQuery,
          createdByMe: filterOwner === "created_by_me" ? "true" : "", // Pass parameter
          assignedToMe: filterOwner === "assigned_to_me" ? "true" : "", // Pass parameter
        },
      });

      if (response.data?.tasks) {
        setAllTasks(response.data.tasks);
      }

      // Map statusSummary data with fixed labels and order
      const statusSummary = response.data?.statusSummary || {};

      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pendingTasks || 0 },
        { label: "In Progress", count: statusSummary.inProgressTasks || 0 },
        { label: "Completed", count: statusSummary.completedTasks || 0 },
      ];

      setTabs(statusArray);

    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  const handleClick = (taskData) => {
    // Permission Check: Only Manager or Creator can edit
    // taskData.createdBy might be an object (if populated) or string. Safe check:
    const creatorId = typeof taskData.createdBy === 'object' ? taskData.createdBy._id : taskData.createdBy;

    // Check if user is Manager, Creator, Admin, or Assigned
    const isAssigned = taskData.assignedTo?.some(u =>
      (u._id?.toString() || u?.toString()) === user?._id?.toString()
    );

    const isManager = user?.role === "manager";
    const isCreator = creatorId?.toString() === user?._id?.toString();

    // If Assigned (regardless of role), go to View Task (to complete/checklist)
    // Priority: If assigned, they likely want to work on it. 
    // BUT if they are ALSO the creator, they might want to EDIT. 
    // Usually, clicking the card body goes to View. Edit button (if we had one) goes to Edit.
    // Here we only have one click action.
    // Let's say: If Creator OR Manager -> Edit. 
    // If Assigned AND NOT Creator/Manager -> View.
    // Wait, if I am Admin and Created it, I want to Edit.
    // If I am Admin and Assigned (by someone else), I want to View/Work.

    if (isManager || isCreator) {
      navigate(`/admin/create-task`, { state: { taskId: taskData._id } });
      return;
    }

    if (isAssigned) {
      navigate(`/user/task-details/${taskData._id}`);
      return;
    }

    // Access Denied
    toast.error("Access denied. You can only edit tasks you created or are assigned to.");
  };
  // ... (rest of code) ...


  // download task report
  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_TASKS, {
        responseType: 'blob',
      });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute("download", "tasks_report.xlsx"); // Match backend filename if possible, otherwise custom
      document.body.appendChild(link);
      link.click(); // Programmatically click the link
      link.remove(); // Remove link from body
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error downloading report:", error);
      toast.error("Failed to download report. Please try again later.");
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAllTasks();
    }, 300); // 300ms debounce for search

    return () => clearTimeout(delayDebounceFn);
  }, [filterStatus, filterDepartment, searchQuery, filterOwner]);

  return <DashboardLayout activeMenu="Manage Tasks">
    <div className='my-5 md:ml-3'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-4'>
          <div className='flex items-center justify-between gap-3'>
            <h2 className='text-xl md:text-xl font-medium'>Manage Tasks</h2>
          </div>

          <div className='flex flex-col md:flex-row gap-3 pt-2 md:pt-0'>
            <div className="flex items-center gap-2 border-b border-gray-300 px-2 py-1 w-full md:w-64">
              <LuSearch className="text-gray-500 text-lg" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="w-full md:w-48 ">
              <SelectDropdown
                options={[
                  { label: "All Tasks", value: "All" },
                  { label: "Assigned to Me", value: "assigned_to_me" },
                  { label: "Created by Me", value: "created_by_me" },
                ]}
                value={filterOwner}
                onChange={(value) => setFilterOwner(value)}
                placeholder="Owner Filter"
              />
            </div>

            <div className="w-full md:w-48 ">
              <SelectDropdown
                options={[
                  { label: "All Departments", value: "" },
                  { label: "HR", value: "HR" },
                  { label: "IT", value: "IT" },
                  { label: "Security", value: "Security" },
                  { label: "Management", value: "Management" },
                  { label: "Other", value: "Other" },
                ]}
                value={filterDepartment}
                onChange={(value) => setFilterDepartment(value)}
                placeholder="Filter by Dept"

              />
            </div>

            {/* Unified Download Button */}
            <button className='flex items-center justify-center gap-2 download-btn whitespace-nowrap' onClick={handleDownloadReport}>
              <LuFileSpreadsheet className='text-xl' /> <span className="hidden md:inline">Download Report</span><span className="md:hidden">Export</span>
            </button>

          </div>
        </div>

        {/* Tabs */}
        {tabs?.[0]?.count >= 0 && (
          <div className='flex flex-col md:flex-row md:items-center justify-between mt-2 gap-4'>
            <TaskStatusTabs
              tabs={tabs}
              activeTab={filterStatus}
              setActiveTab={setFilterStatus}
            />
          </div>
        )}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 ml-2'>
        {allTasks?.length > 0 ? (
          allTasks.map((item, index) => (
            <TaskCard
              key={item._id}
              title={item.title}
              description={item.description}
              status={item.status}
              progress={item.progress}
              createdAt={item.createdAt}
              dueDate={item.dueDate}
              assignedTo={item.assignedTo}
              assignedToUser={item.assignedTo} // Pass full user objects if needed for checking dept
              attachmentCount={item.attachments?.length || 0}
              completedTodoCount={item.completedTodoCount || 0}
              todoChecklist={item.todoChecklist || []}
              priority={item.priority}
              onClick={() => { handleClick(item) }}
            />
          ))
        ) : (
          <div className="col-span-3 text-center py-10 text-gray-500">
            No tasks found matching your filters.
          </div>
        )}
      </div>
    </div>
  </DashboardLayout>


}

export default ManageTasks