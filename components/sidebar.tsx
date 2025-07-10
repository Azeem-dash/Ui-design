import { TbHomeFilled } from "react-icons/tb";
import { MdExplore, MdHelp  } from "react-icons/md";
import { RiHeart2Fill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";


const menu = [
  { icon: <TbHomeFilled />, label: "Home" , active: true },
  { icon: <MdExplore />, label: "Explore", active: false  },
  { icon: <RiHeart2Fill />, label: "Interest", active: false },
  { icon: <MdHelp />, label: "Help", active: false },
  { icon: <IoSettingsSharp  />, label: "Setting", active: false },
];

export default function Sidebar() {
  return (
    <div className="h-screen w-56 bg-white shadow-lg flex flex-col px-4">
      <nav className="flex flex-col gap-2 mt-5">
        {menu.map((item, idx) => (
          <div
            key={item.label}
            className={`flex items-center gap-4 px-4 py-2 rounded-lg cursor-pointer transition-colors text-lg font-medium ${item.active ? " text-[#C11759]" : "text-[#949FB7] hover:bg-gray-100"}`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
} 