import { createBrowserRouter } from "react-router-dom";
import Auth from "../pages/auth";
import Dashboard from "../pages/dashboard";
import ForgetPassword from "../pages/forgetPassword/forgetPassword";
import Settings from "../pages/setting";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/password",
    element: <ForgetPassword />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);

export default router;
