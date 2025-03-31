import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function DashboardLayout({ isAdmin = false }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header isAdmin={isAdmin} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer isAdmin={isAdmin} />
    </div>
  );
}

export default DashboardLayout;