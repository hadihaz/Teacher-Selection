import { useContext, useEffect, useState } from "react";
import { context } from "../../context/mainContext";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Alert from "../../components/common/alert";

const schema = yup
  .object({
    email: yup
      .string()
      .email("قالب ایمیل معتبر نیست")
      .required("ایمیل مورد نیاز است"),
  })
  .required();

const ForgetPassword = () => {
  const [success, setSuccess] = useState<boolean | null>(null);

  const { isAuth } = useContext(context);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth()) {
      navigate("/dashboard");
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: { email: string }) => {
    setSuccess(true);
    console.log(data);
  };

  return (
    <div className="flex justify-center mt-40">
      <div className="bg-white lg-w-1/4 px-4 py-10 shadow sm:rounded-lg sm:px-10">
        <div className="  mb-1">
          {success && <Alert message="ایمیل ارسال شد." />}
          {success === false && <Alert error={true} title="خطا در سیستم." />}
        </div>
        <h1 className="text-center text-2xl text-gray-700 mb-10">
          فراموشی رمزعبور
        </h1>

        <p className="text-gray-500 text-xs">
          ایمیل خود را وارد کنید تا ایمیلی حاوی لینک تغییر رمزعبور برای شما
          ارسال شود
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900 undefined"
          ></label>
          <div className="mt-2">
            <input
              {...register("email")}
              dir="ltr"
              id="email"
              type="email"
              autoComplete="autoComplete"
              className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 "
            />
            <p className="text-red-600">{errors.email?.message}</p>
          </div>
          <button className="mb-10 flex justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            ارسال
          </button>
          <div className=" text-center text-gray-500">
            <Link to={"/"}>بازگشت</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ForgetPassword;
