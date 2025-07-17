
import { RiMenu2Fill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlinePlus  } from "react-icons/hi";
import { IoIosNotifications } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";

export default function Header() {
  return (
    <header className="h-[70px] pl-[33px] bg-white shadow-md flex items-center px-6 justify-between">
      <div className="flex items-center gap-3">
        <RiMenu2Fill className="text-2xl text-[#C11759]" />
        <h1 className="text-2xl text-[#C11759] ">Mink</h1>
      </div>
      <div className=" flex justify-center w-80">
          <input
            type="text"
            placeholder="Search here"
            className="w-[300px] h-[39px] text-gray-600 pl-8 pr-16 py-2 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-[#C11759] bg-gray-100"
          />
          <FiSearch className="relative right-[45px] top-[8px] cursor-pointer text-[#C11759] text-[23px] font-semibold " />
        </div>
      <div className="flex items-center gap-6">
        <HiOutlinePlus className="text-2xl w-[24px] h-[24px] text-[#949FB7] cursor-pointer" />
        <FaUserGroup className="text-2xl text-[#949FB7] cursor-pointer" />
        <IoIosNotifications className="text-2xl text-[#949FB7] cursor-pointer" />
        <FaUserCircle className="text-3xl w-[38px] h-[38px] text-[#949FB7] cursor-pointer" />
      </div>
    </header>
  );
}