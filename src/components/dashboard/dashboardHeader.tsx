import { useContext, useState } from "react";
import { context } from "../../context/mainContext";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { removeItem } from "../../core/localstorage/storage";

const DashboardHeader = ({
  menuOptins,
  address,
}: {
  menuOptins: string;
  address: string;
}) => {
  const [menu, toggleMenu] = useState(false);
  const { user, dispatch } = useContext(context);
  const navigate = useNavigate();
  const handleLogout = () => {
    removeItem("user1");
    dispatch("user", {});
    navigate("/");
  };

  return (
    <div className=" fixed top-0  w-full z-50 bg-white text-green-600 header border-b-4 lg:px-32 p-3 px-5 xs:px-1 flex  gap-10 justify-between ">
      <h1 className="text-green-500 text-2xl font-bold xs:text-center flex items-center">
        پلتفرم انتخاب استاد
      </h1>
      <div className="lg:flex sm:flex gap-8 end-0  ">
        <p className=" m-1 hidden lg:flex md:flex sm:flex gap-3 items-center px-2 justify-between rounded-xl  ">
          <CgProfile className="size-7" />
          {user.firstname} {user.lastname}
        </p>
        <button className="hover:text-green-900 m-1 hidden lg:block md:block sm:block">
          <Link to={address}>{menuOptins}</Link>
        </button>
        <button
          className="hover:text-green-900 m-1 hidden lg:block md:block sm:block"
          onClick={handleLogout}
        >
          خروج
        </button>
        <MdOutlineMenu
          onClick={() => {
            toggleMenu(!menu);
          }}
          className="lg:hidden md:hidden sm:hidden  size-7"
        />
      </div>
      {menu && (
        <div className="absolute top-12 w-screen left-0 bg-white border lg:hidden md:hidden sm:hidden">
          <ul className="">
            <li className="my-2 border-b-2 ">
              <p className=" m-1  flex gap-3 items-center px-2 rounded-xl  ">
                <CgProfile className="size-9" />
                {user.firstname} {user.lastname}
              </p>
            </li>
            <li className="mx-2">
              <button className="hover:text-green-900 m-1 ">
                <Link to={address}>{menuOptins}</Link>
              </button>
            </li>
            <li className="mx-2 pb-2">
              <button
                className="hover:text-green-900 m-1  "
                onClick={handleLogout}
              >
                خروج
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
