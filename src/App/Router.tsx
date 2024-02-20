import { createBrowserRouter } from "react-router-dom";
import Auth from "../pages/auth";
import Dashboard from "../pages/dashboard";
import ForgetPassword from "../pages/forgetPassword/forgetPassword";
import Settings from "../pages/setting";
import VerifyEmail from "../pages/verifyEmail";

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
  {
    path: "/email",
    element: <VerifyEmail />,
  },
]);

export default router;
