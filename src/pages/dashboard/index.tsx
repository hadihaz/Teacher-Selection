/* eslint-disable react-refresh/only-export-components */
import WithAuth from "../../helper/withAuth";
import DashboardHeader from "../../components/dashboard/dashboardHeader";
import DashboardMain from "../../components/dashboard/dashboardMain";

const Dashboard = () => {
  return (
    <div>
      <DashboardHeader menuOptins="تنظیمات" address="/settings"  />
      <div className="w-full px-5 sm:px-10 md:px-32 py-10 mt-20">
        <DashboardMain />
      </div>
    </div>
  );
};

export default WithAuth(Dashboard);
