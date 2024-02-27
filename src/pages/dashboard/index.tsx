/* eslint-disable react-refresh/only-export-components */
// import WithAuth from "../../helper/withAuth";
import { useContext } from "react";
import DashboardHeader from "../../components/dashboard/dashboardHeader";
import DashboardMain from "../../components/dashboard/dashboardMain";
import { context } from "../../context/mainContext";
import { Navigate } from "react-router-dom";
const Dashboard = () => {
  const { isAuth } = useContext(context);

  if (!isAuth()) {
    return <Navigate to={"/"}></Navigate>;
  }
  return (
    <div>
      <DashboardHeader menuOptins="تنظیمات" address="/settings" />
      <div className="w-full px-5 sm:px-10 md:px-32 py-10 mt-20">
        <DashboardMain />
      </div>
    </div>
  );
};

// export default WithAuth(Dashboard);
export default Dashboard;
