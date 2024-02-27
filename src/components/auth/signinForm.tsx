/* eslint-disable @typescript-eslint/no-explicit-any */

import Alert from "../common/alert";
import { useState } from "react";
import StudentSignupForm from "./studentSignupForm";
import MasterSignupForm from "./masterSignupForm";

const SigninForm = () => {

  const [success, setSuccess] = useState<boolean | null>(null);
 
  
  const [formType, setFormtype] = useState(false);
  return (
    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
      <div className="h-[50px] mb-10 ">
        {success && <Alert message="ثبت نام با موفقیت" />}
        {success === false && (
          <Alert
            error={true}
            title="عملیات ثبت نام انجام نشد. لطفا دوباره امتحان نمایید"
          />
        )}
      </div>
      <div className="flex gap-5 mb-3 pb-2 border-b-2">
        <p>ثبت نام به عنوان:</p>
        <div className="flex gap-3 mb-1">
          <button
            className={` rounded-2xl px-4
        ${!formType ? "bg-green-300" : "bg-white"}
          text-green-900  `}
            onClick={() => {
              setFormtype(false);
            }}
          >
            استاد
          </button>
          <button
            className={`  rounded-2xl px-4
        ${formType ? "bg-green-300" : "bg-white"}
         text-green-900  `}
            onClick={() => {
              setFormtype(true);
            }}
          >
            دانشجو
          </button>
        </div>
      </div>

      {formType && <StudentSignupForm setSuccess={setSuccess}/>}
      {!formType && <MasterSignupForm setSuccess={setSuccess}/>}
      

     
    </div>
  );
};

export default SigninForm;
