/* eslint-disable react-refresh/only-export-components */
import { useContext } from "react";
import WithAuth from "../../helper/withAuth";
import { context } from "../../context/mainContext";
const Dashboard = () => {
  const { user } = useContext(context);
  return (
    <div>
      Dashboard {user.firstname}
      <ul>
        <li>{user.firstname}</li>
        <li>{user.lastname}</li>
        <li>{user.email}</li>

      </ul>
    </div>
  );
};

export default WithAuth(Dashboard);
