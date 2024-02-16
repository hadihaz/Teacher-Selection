import  { useContext } from "react";
import { context } from "../../context/mainContext";
import { removeItem } from "../../core/localstorage/storage";
import { useNavigate } from "react-router-dom";
const DashboardHeader = () => {
  const { user, dispatch } = useContext(context);
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("logout");
    dispatch("user1", {});
    removeItem("user1");
    navigate("/");
  };

  return (
    <div className="bg-green-400 p-3 flex gap-10">
      <h1>پلتفرم انتخاب استاد</h1>
      <div className="">
        {user.firstname} {user.lastname}
      </div>
      <button onClick={handleLogout}>log out</button>
    </div>
  );
};

export default DashboardHeader;
