import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import Main from "@/components/Main";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 min-h-screen p-4">
          <Main />
        </div>
      </div>
    </div>
  );
}
