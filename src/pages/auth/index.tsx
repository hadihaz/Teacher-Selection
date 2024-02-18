import { useContext, useState } from "react";
import Loginform from "../../components/auth/loginForm";
import SigninForm from "../../components/auth/signinForm";
import AuthHeader from "../../components/auth/authHeader";
import { context } from "../../context/mainContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { isAuth } = useContext(context);
  const navigate=useNavigate()
  if(isAuth()){
    navigate("/dashboard")

  }
  const [formType, setformType] = useState<boolean>(true);
  return (
    <div className={`lg:flex ${formType ? "lg:h-screen" : ""}`}>
      <div className="lg:w-1/2 bg-green-500 p-3">
        <h1 className="text-center text-2xl font-bold text-green-900">
          پلتفرم انتخاب استاد
        </h1>
      </div>
      <div className="lg:w-1/2 mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <AuthHeader formType={formType} changeform={setformType} />
        {formType ? <Loginform /> : <SigninForm />}
      </div>
    </div>
  );
};

export default Auth;
