import { useState } from "react";
import Loginform from "../../components/auth/loginForm";
import SigninForm from "../../components/auth/signinForm";
import AuthHeader from "../../components/auth/authHeader";
const Auth = () => {
  const [formType, setformType] = useState<boolean>(true);

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <AuthHeader formType={formType} changeform={setformType} />
      {formType && (
        <Loginform/>
      )}
      {!formType && <SigninForm />}
    </div>
  );
};

export default Auth;
