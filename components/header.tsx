"use client";
import { RiMenu2Fill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlinePlus } from "react-icons/hi";
import { IoIosNotifications } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { useState } from "react";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="h-[70px] bg-white flex items-center px-4 md:px-6 justify-between z-10 fixed w-full">
        <div className="flex items-center gap-3 ml-[10px] md:ml-[30px]">
          <RiMenu2Fill 
            className="text-2xl text-[#C11759] cursor-pointer" 
            onClick={toggleSidebar}
          />
          <h1 className="hidden md:block text-2xl text-[#C11759] font-sans">Mink</h1>
        </div>

        <h1 className="md:hidden text-2xl text-[#C11759] font-sans">Home</h1>

        <div className="hidden md:flex justify-center w-[350px] relative">
          <input
            type="text"
            placeholder="Search here"
            className="w-full h-[39px] text-gray-600 pl-8 pr-16 py-2 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-[#C11759] bg-gray-100"
          />
          <FiSearch className="absolute top-2.5 right-4 cursor-pointer text-[#C11759] text-xl" />
        </div>

        <div className="flex items-center gap-6">
          <HiOutlinePlus className="hidden md:block text-2xl w-[24px] h-[24px] text-[#949FB7] cursor-pointer" />
          <FaUserGroup className="hidden md:block text-2xl text-[#949FB7] cursor-pointer" />
          <IoIosNotifications className="hidden md:block text-2xl text-[#949FB7] cursor-pointer" />
          <FaUserCircle className="text-3xl w-[38px] h-[38px] text-[#949FB7] cursor-pointer" />
        </div>
      </header>

      <div
        className={`fixed top-[70px] left-0 h-screen bg-white w-[280px] shadow-lg transform transition-transform duration-300 ease-in-out z-20 md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search here"
              className="w-full h-[39px] text-gray-600 pl-8 pr-16 py-2 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-[#C11759] bg-gray-100"
            />
            <FiSearch className="absolute top-2.5 right-4 cursor-pointer text-[#C11759] text-xl" />
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 text-[#949FB7] cursor-pointer">
              <HiOutlinePlus className="text-2xl w-[24px] h-[24px]" />
              <span>Add</span>
            </div>
            <div className="flex items-center gap-4 text-[#949FB7] cursor-pointer">
              <FaUserGroup className="text-2xl" />
              <span>Groups</span>
            </div>
            <div className="flex items-center gap-4 text-[#949FB7] cursor-pointer">
              <IoIosNotifications className="text-2xl" />
              <span>Notifications</span>
            </div>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-30 z-10 top-[70px] md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
