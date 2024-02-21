import { useContext } from "react";
// import DashboardCard from "./dashboardCard";
import { context } from "../../context/mainContext";
import StudentRequestsCard from "./dashboardCards/studentRequestsCard";
import AllRequestsCard from "./dashboardCards/allRequestsCard";
import MasterCreatedCard from "./dashboardCards/masterCreatedCard";
import MasterRequestCards from "./dashboardCards/masterRequestCards";

const DashboardMain = () => {
  const { getUserType } = useContext(context);
  return (
    <>
      {getUserType() == "student" && (
        <div className="bg-white text-gray-600 ">
          {/* <DashboardCard /> */}
          <StudentRequestsCard/>
          <AllRequestsCard/>
        </div>
      )}
      {getUserType() == "master" && (
        <div className="bg-white text-gray-600 ">
          <MasterRequestCards/>
          <MasterCreatedCard/>
        </div>
      )}
    </>
  );
};

export default DashboardMain;
