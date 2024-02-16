/* eslint-disable @typescript-eslint/no-explicit-any */
import { getItem } from "../core/localstorage/storage";
import Auth from "../pages/auth";
const WithAuth = (Component: React.FC) => {
  const user = getItem("user1");

  return (props: any) => {
    if (!user) {
      return <Auth />;
    } else {
      return <Component {...props} />;
    }
  };
};

export default WithAuth;
