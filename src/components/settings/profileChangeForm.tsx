import { useContext } from "react";
import { context } from "../../context/mainContext";
import StudentProfileChangeForm from "./profileChangeforms/studentProfileChangeForm";
import MasterProfileChangeForm from "./profileChangeforms/masterProfileChangeForm";

const ProfileChangeForm = () => {
  const { getUserType } = useContext(context);
  return (
    <div className="bg-white px-4 py-10 shadow sm:rounded-lg sm:px-10">
      {getUserType() == "student" && <StudentProfileChangeForm />}
      {getUserType() == "master" && <MasterProfileChangeForm />}
    </div>
  );
};

export default ProfileChangeForm;
