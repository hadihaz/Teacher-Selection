/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState } from "react";
import Loginform from "../../components/auth/loginForm";
import SigninForm from "../../components/auth/signinForm";
import AuthHeader from "../../components/auth/authHeader";
import { context } from "../../context/mainContext";
import { Navigate } from "react-router-dom";
import formlogo from "../../assets/formlogo.png";
const Auth = () => {
  const { isAuth } = useContext(context);
  const [formType, setformType] = useState<boolean>(true);
  if (isAuth()) {
    return <Navigate to={"/dashboard"}></Navigate>;
  }
  return (
    <div className={`lg:flex ${formType ? "lg:h-screen" : ""}`}>
      <div className="lg:w-1/2 bg-green-500 lg:bg-[#F2EBE4] p-3">
        <h1 className="lg:mt-20 text-center text-2xl font-bold text-green-900">
          پلتفرم انتخاب استاد
        </h1>
        <img className="lg:flex hidden mt-6" src={formlogo} alt="formlogo" />
      </div>
      <div className="lg:w-1/2 mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <AuthHeader formType={formType} changeform={setformType} />
        {formType ? <Loginform /> : <SigninForm />}
      </div>
    </div>
  );
};

export default Auth;
