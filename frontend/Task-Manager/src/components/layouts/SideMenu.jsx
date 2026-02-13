import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';
import { MdOutlineEdit } from "react-icons/md";
import UpdateUserModal from '../Cards/UpdateUserModal';
import { getAvatarUrl } from '../../utils/helper';


const SideMenu = ({ activeMenu, isMobile = false }) => {


    const { user, clearUser, updateUser } = useContext(UserContext);
    const [sideMenuData, setOpenSideMenuData] = useState([]);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);

    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route === "/logout") {
            handleLogout();
            return;
        }

        navigate(route);
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate('/login');
    };

    const handleUserUpdate = (updatedUser) => {
        updateUser(updatedUser);
        setOpenUpdateModal(false);
    };

    useEffect(() => {
        if (user) {
            let menuData = user?.role === 'admin' || user?.role === 'manager' ? [...SIDE_MENU_DATA] : [...SIDE_MENU_USER_DATA];

            // If manager, update Dashboard link
            if (user?.role === 'manager') {
                menuData = menuData.map(item => {
                    if (item.label === 'Dashboard') {
                        return { ...item, path: '/manager/dashboard' };
                    }
                    return item;
                });
            }
            setOpenSideMenuData(menuData);
        }
        return () => { };
    }, [user]);


    return (
        <>
            <div className={`${isMobile ? 'w-full h-full' : 'w-64 h-[calc(100vh-61px)] google-font sticky top-[60px] border-r border-gray-200/50'} bg-white z-20 flex flex-col`}>
                <div className='flex flex-col items-center justify-center mb-7 pt-5'>
                    <div className='relative'>
                        <img src={getAvatarUrl(user?.profileImageUrl, user?.name)}
                            alt="Profile Image"
                            className='w-20 h-20 bg-slate-400 rounded-full object-cover'
                        />
                        <button
                            className='absolute bottom-0 right-0 h-7 w-7 bg-blue-500 rounded-full text-white flex items-center justify-center cursor-pointer hover:bg-blue-600 transition'
                            onClick={() => setOpenUpdateModal(true)}
                        >
                            <MdOutlineEdit className='text-sm' />
                        </button>
                    </div>

                    {user?.role === 'admin' && (
                        <div className='text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-1'>Admin</div>
                    )}
                    {user?.role === 'manager' && (
                        <div className='text-[10px] font-medium text-white bg-green-500 px-3 py-0.5 rounded mt-1'>Manager</div>
                    )}

                    <h5 className='text-gray-950 font-medium leading-6 mt-3'>
                        {user?.name || ""}
                    </h5>

                    <p className="text-[12px] text-gray-500">{user?.email || ""}</p>
                </div>

                {sideMenuData.map((item, index) => (
                    <button
                        key={`menu_${index}`}
                        className={`w-full flex items-center gap-4 text-[15px] ${activeMenu == item.label
                            ? "text-primary bg-blue-50/40 border-r-4 border-primary" : "text-gray-700 hover:bg-gray-100"
                            } py-3 px-6 mb-3 cursor-pointer transition-colors duration-200`}
                        onClick={() => handleClick(item.path)}
                    >
                        <item.icon className='text-xl' />
                        {item.label}
                    </button>
                ))}
            </div>

            <UpdateUserModal
                isOpen={openUpdateModal}
                onClose={() => setOpenUpdateModal(false)}
                user={user}
                onUpdate={handleUserUpdate}
            />
        </>
    );
};

export default SideMenu;