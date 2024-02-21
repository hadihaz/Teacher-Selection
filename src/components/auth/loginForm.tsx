/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Alert from "../common/alert";
import { setItem } from "../../core/localstorage/storage";
import { context } from "../../context/mainContext";

const schema = yup
  .object({
    password: yup
      .string()
      .required("رمز عبور مورد نیاز است")
      .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        "رمز عبور باید دارای حروف و اعداد باشد"
      ),
    email: yup
      .string()
      .email("قالب ایمیل معتبر نیست")
      .required("ایمیل مورد نیاز است"),
  })
  .required();

const Loginform = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [success, setSuccess] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useContext(context);
  const onSubmit = (userData: any) => {
    fetch("http://localhost:3000/users", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const userExist: any[] = data.filter(
          (user: any) =>
            user.email === userData.email && user.password === userData.password
        );
        if (userExist.length > 0) {
          setSuccess(true);
          setItem("user1", JSON.stringify(userExist[0]));
          setTimeout(() => {
            navigate("/dashboard");
            dispatch("user", userExist[0]);
          }, 1500);
        } else {
          setSuccess(false);
        }
      })
      .catch((error) => {
        console.error("error", error);
        setSuccess(false);
      });
  };

  return (
    <>
      <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <div className="  h-[50px] mb-1">
          {success && <Alert message="ورود با موفقیت" />}
          {success === false && (
            <Alert error={true} title="ایمیل یا رمز عبور اشتباه است" />
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 undefined"
            >
              ایمیل
            </label>
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
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900 undefined"
            >
              رمز عبور
            </label>
            <div className="mt-2">
              <input
                {...register("password")}
                dir="ltr"
                id="password"
                type="password"
                autoComplete="autoComplete"
                className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 "
              />
              <p className="text-red-600">{errors.password?.message}</p>
            </div>
          </div>
          <br />
          <Link className="text-gray-500" to={"/password"}>
            فراموشی رمز عبور
          </Link>

          <button
            onClick={() => {
              setTimeout(() => {
                if (location.pathname == "/dashboard") window.location.reload();
              }, 1500);
            }}
            className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            ورود
          </button>
        </form>
      </div>
    </>
  );
};

export default Loginform;
