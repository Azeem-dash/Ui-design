import Image from "next/image";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { HiFire } from "react-icons/hi";
import { BiSolidMoviePlay  } from "react-icons/bi";
import { FaFaceSmileWink } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { PiDotsThreeCircleFill } from "react-icons/pi";

const filter = [
  { icon: <HiFire />, label: "Trending", color: "#FF5722" },
  { icon: <BiSolidMoviePlay  />, label: "Movies", color: "#C11759" },
  { icon: <FaFaceSmileWink />, label: "Awesome", color: "#FFC107" },
  { icon: <FaCar />, label: "Car", color: "#3F51B5" },
  { icon: <PiDotsThreeCircleFill />, label: "See More", color: "#C11759" },
];

export default function Home() {
  return (
    <div className="bg-gray-200 min-h-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <div className="mt-13 flex ml-13 gap-5 flex-wrap">
            {filter.map((item, index) => (
              <div
                key={item.label}
                className="w-35 h-25 flex flex-col items-center justify-center bg-white rounded-2xl transition-transform hover:scale-105 hover:shadow-lg cursor-pointer"
              >
                <div className="flex items-center mt-2 justify-center mb-4 text-3xl"
                  style={{ color: item.color }}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg text-[#949FB7] mb-1 text-center">{item.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
