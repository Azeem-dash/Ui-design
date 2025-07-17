import Image from "next/image";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import Main from "@/components/Main";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-200">
      <Header />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Main />
        </div>
      </div>
    </div>
  );
}
