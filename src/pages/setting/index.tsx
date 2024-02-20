/* eslint-disable react-refresh/only-export-components */
import DashboardHeader from "../../components/dashboard/dashboardHeader";
import ChangePassword from "../../components/settings/changePassword";
import EmailVerifyAlert from "../../components/settings/emailVerifyAlert";
import ProfileChangeForm from "../../components/settings/profileChangeForm";
import WithAuth from "../../helper/withAuth";

const Settings = () => {
  return (
    <div>
      <DashboardHeader menuOptins="صفحه اصلی" address="/dashboard" />
      <div className="w-screen px-5 sm:px-10 md:px-28 py-10 mt-20">
        <EmailVerifyAlert />
        <h1 className="text-gray-500 text-xl border-b-2 p-1">تغییر مشخصات</h1>
        <ProfileChangeForm />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h1 className="text-gray-500 text-xl border-b-2 p-1">تغییر رمز عبور</h1>

        <ChangePassword />
      </div>
    </div>
  );
};

export default WithAuth(Settings);
