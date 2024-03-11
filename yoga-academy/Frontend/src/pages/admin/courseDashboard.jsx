import React from "react";
import AdminNavBar from "../../components/ui/adminnavbar";
import Footer from "../../components/ui/footer";
import DashboardCards from "../../components/ui/dashboardcards";
import ListItems from "../../components/ui/listitems";
import AdminDashboardHeading from "../../components/ui/admindashboardheader";
import CrudOperations from "../../components/ui/crudoperations";
import CourseDashboardCard from "../../components/ui/coursesdashboardcard";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <AdminNavBar />
      <div className="flex flex-grow items-center justify-center">
        <div className="flex flex-col items-center max-w-screen-xl mx-auto px-4">
          <AdminDashboardHeading />
          <CourseDashboardCard />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
