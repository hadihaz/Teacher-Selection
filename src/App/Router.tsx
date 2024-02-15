import { createBrowserRouter } from "react-router-dom";
import Auth from "../pages/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/dashboard",
    element: <div>dashboard</div>,
  },
]);

export default router;
