/* eslint-disable react-refresh/only-export-components */
import WithAuth from "../../helper/withAuth";
import DashboardHeader from "../../components/dashboard/dashboardHeader";

const Dashboard = () => {
  return (
    <div>
      <DashboardHeader />
    </div>
  );
};

export default WithAuth(Dashboard);
