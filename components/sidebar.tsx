"use client";
import { TbHomeFilled } from "react-icons/tb";
import { MdExplore, MdHelp } from "react-icons/md";
import { RiHeart2Fill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { HiPlus } from "react-icons/hi";

const menu = [
  { icon: <TbHomeFilled />, label: "Home", active: true },
  { icon: <MdExplore />, label: "Explore", active: false },
  { icon: <RiHeart2Fill />, label: "Interest", active: false },
  { icon: <MdHelp />, label: "Help", active: false },
  { icon: <IoSettingsSharp />, label: "Setting", active: false },
];

export default function Sidebar() {
  return (
    <>
      <div className="hidden md:flex w-[245px] bg-white shadow-lg flex-col pt-[5px] min-h-screen">
        <nav className="flex-1 mt-[75px] overflow-y-auto ml-[20px] px-4 py-2">
          {menu.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-4 px-4 py-2 mt-[5px] rounded-lg cursor-pointer transition-colors text-lg font-medium ${
                item.active ? "text-[#C11759]" : "text-[#949FB7] hover:bg-gray-100"
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="ml-[10px] text-base font-sans">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md px-4 py-2 flex justify-between items-center z-50">
        <div className="flex gap-6">
          <TbHomeFilled className="text-2xl text-[#C11759]" />
          <MdExplore className="text-2xl text-[#949FB7]" />
        </div>

        <div className="bg-[#C11759] p-3 rounded-full shadow-md -mt-6">
          <HiPlus className="text-white text-3xl" />
        </div>

        <div className="flex gap-6">
          <RiHeart2Fill className="text-2xl text-[#949FB7]" />
          <IoSettingsSharp className="text-2xl text-[#949FB7]" />
        </div>
      </div>
    </>
  );
}
