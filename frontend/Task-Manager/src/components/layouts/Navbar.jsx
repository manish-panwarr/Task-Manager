import React, { useState } from "react";
import SideMenu from "./SideMenu";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { BsStopwatch } from "react-icons/bs";

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);

    return (
        <div className="flex gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30 items-center justify-between">

            {/* Title */}
            <div className="flex items-center gap-2 w-full ">
                <h2 className="peer flex text-lg font-medium text-black cursor-pointer select-none items-center gap-1">
                    <BsStopwatch size={35} className="text-xl " />
                    procrasti_NOT
                </h2>

                {/* Desktop Slogan (Hidden on Mobile) */}
                <p className="hidden  text-center w-full md:block text-sm text-slate-700 opacity-0 -translate-y-2 peer-hover:opacity-100 peer-hover:translate-y-0 transition-all duration-300">
                    ProcrastiNOT kills procrastination before it kills your{" "}
                    <span className="font-medium text-primary line-through">
                        deadlines
                    </span>{" "}
                    👨‍⚕️
                </p>
            </div>


            {/* Mobile Menu Button - Moved to Right */}
            <button
                className="block lg:hidden text-black focus:outline-none"
                onClick={() => setOpenSideMenu(!openSideMenu)}
            >
                {openSideMenu ? (
                    <HiOutlineX className="text-2xl" />
                ) : (
                    <HiOutlineMenu className="text-2xl" />
                )}
            </button>

            {/* Mobile Side Menu */}
            <div
                className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${openSideMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            >
                {/* Overlay */}
                <div
                    className={`absolute inset-0 bg-black/30 backdrop-blur-md transition-opacity duration-300 ${openSideMenu ? "opacity-100" : "opacity-0"
                        }`}
                    onClick={() => setOpenSideMenu(false)}
                />

                {/* Menu Panel - Slides from LEFT */}
                <div
                    className={`absolute left-0 top-0 h-screen w-64 bg-white/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ease-in-out ${openSideMenu ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <div className="flex items-center justify-between p-5 border-b border-gray-100">
                        <h2 className="flex text-xl font-medium text-black cursor-pointer select-none items-center gap-1">
                            <BsStopwatch className="text-xl" />
                            procrasti_NOT
                        </h2>

                        <button
                            onClick={() => setOpenSideMenu(false)}
                            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <HiOutlineX className="text-2xl text-gray-600" />
                        </button>
                    </div>

                    <div className="p-2" onClick={() => setOpenSideMenu(false)}>
                        <SideMenu activeMenu={activeMenu} isMobile={true} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;