import { createBrowserRouter } from "react-router-dom";
import Auth from "../pages/auth";
import Dashboard from "../pages/dashboard";
import ForgetPassword from "../pages/forgetPassword/forgetPassword";
import Settings from "../pages/setting";
import VerifyEmail from "../pages/verifyEmail";
import NotFound from "../pages/notFound";
import RequestsPage from "../pages/teacherselection/request";
import MastersPage from "../pages/teacherselection/masters";
import CreateCourse from "../pages/createCourse";

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
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/dashboard/masters/:id",
    element: <MastersPage />,
  },
  {
    path: "/dashboard/requests/:id",
    element: <RequestsPage />,
  },
  {
    path: "/dashboard/create",
    element: <CreateCourse />,
  },
]);

export default router;
