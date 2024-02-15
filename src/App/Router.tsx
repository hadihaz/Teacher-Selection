import { createBrowserRouter } from "react-router-dom";
import Auth from "../pages/auth";
import Dashboard from "../pages/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default router;
