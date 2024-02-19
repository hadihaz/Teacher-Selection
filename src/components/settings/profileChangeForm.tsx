/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Alert from "../common/alert";
// import {  useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { context } from "../../context/mainContext";

const schema = yup
  .object({
    firstname: yup.string(),
    lastname: yup.string(),
    email: yup.string().email("قالب ایمیل معتبر نیست"),
    // password: yup
    //   .string()
    //   .required("رمز عبور مورد نیاز است")
    //   .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
    //   .matches(
    //     /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
    //     "رمز عبور باید دارای حروف و اعداد باشد"
    //   ),
    // confirmPassword: yup
    //   .string()
    //   .oneOf(
    //     [yup.ref("password"), yup.ref("password")],
    //     "رمز عبور با تأیید رمز عبور برابر نیست"
    //   )
    //   .required("تأیید رمز عبور مورد نیاز است"),
    national_id_number: yup
      .string()

      .matches(/^\d+$/, "کد ملی باید فقط شامل اعداد باشد"),
    phone_number: yup
      .string()
      .matches(/^(\+98|0)?9\d{9}$/, "شماره تلفن نامعتبر"),
    student_number: yup
      .string()
      .matches(/^\d+$/, "شماره دانشجویی باید فقط شامل اعداد باشد"),
    major_name: yup.string(),
  })
  .required();

const ProfileChangeForm = () => {
  const { user } = useContext(context);
  const [firstname, setFirstName] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const [national_id_number, setNational_id_number] = useState(
    user.national_id_number
  );
  const [phone_number, setPhone_number] = useState(user.phone_number);
  const [student_number, setStudent_number] = useState(user.student_number);
  const [major_name, setMajor_name] = useState(user.major_name);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [success, setSuccess] = useState<boolean | null>(null);
  //   const navigate = useNavigate();
  //   const { dispatch } = useContext(context);
  const onSubmit = (data: any) => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(null);
    }, 3000);
    // fetch("http://localhost:3000/students", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     // setItem("user1", JSON.stringify(data));
    //     console.log("نتیجه:", result);
    //     // dispatch("user", data);
    //     setSuccess(true);
    //     // setTimeout(() => {
    //     //   navigate("/dashboard");
    //     // }, 1500);
    //   })
    //   .catch((error) => {
    //     console.error("خطا:", error);
    //     setSuccess(false);
    //   });
    console.log(data);
  };

  return (
    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
      <div className="h-[50px] mb-1">
        {success && <Alert message="تفییر مشخصات با موفقیت انجام شد. " />}
        {success === false && (
          <Alert error={true} title="خطا در انجام عملیات." />
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className=" gap-3 lg:flex">
          <div>
            <label
              htmlFor="firmware"
              className="block text-sm font-medium leading-6 text-gray-900 undefined"
            >
              نام
            </label>
            <div className="mt-2">
              <input
                {...register("firstname")}
                value={firstname}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                id="firstname"
                type="text"
                autoComplete="autoComplete"
                className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 "
              />
              <p className="text-red-600">{errors.firstname?.message}</p>
            </div>
          </div>

          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium leading-6 text-gray-900 undefined"
            >
              نام خانوادگی
            </label>
            <div className="mt-2">
              <input
                {...register("lastname")}
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
                id="lastname"
                type="text"
                autoComplete="autoComplete"
                className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 "
              />
              <p className="text-red-600">{errors.lastname?.message}</p>
            </div>
          </div>
        </div>
        <div className=" lg:flex">
          <div className="lg:w-[410px]">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 undefined"
            >
              ایمیل
            </label>
            <div className="mt-2">
              <input
                {...register("email")}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                dir="ltr"
                id="email"
                type="email"
                autoComplete="autoComplete"
                className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 "
              />
              <p className="text-red-600">{errors.email?.message}</p>
            </div>
          </div>
        </div>

        <div className="lg:flex gap-2">
          <div>
            <label
              htmlFor="phone_number"
              className="block text-sm font-medium leading-6 text-gray-900 undefined"
            >
              شماره تلفن
            </label>
            <div className="mt-2">
              <input
                {...register("phone_number")}
                value={phone_number}
                onChange={(e) => {
                  setPhone_number(e.target.value);
                }}
                dir="ltr"
                id="phone_number"
                type="text"
                autoComplete="off"
                className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              <p className="text-red-600">{errors.phone_number?.message}</p>
            </div>
          </div>
          <div>
            <label
              htmlFor="major_name"
              className="block text-sm font-medium leading-6 text-gray-900 undefined"
            >
              نام رشته تحصیلی
            </label>
            <div className="mt-2">
              <input
                {...register("major_name")}
                value={major_name}
                onChange={(e) => {
                  setMajor_name(e.target.value);
                }}
                id="smajor_name"
                type="text"
                autoComplete="off"
                className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              <p className="text-red-600">{errors.major_name?.message}</p>
            </div>
          </div>
        </div>
        <div className="lg:flex gap-2">
          <div>
            <label
              htmlFor="national_id_number"
              className="block text-sm font-medium leading-6 text-gray-900 undefined"
            >
              کد ملی
            </label>
            <div className="mt-2">
              <input
                {...register("national_id_number")}
                value={national_id_number}
                onChange={(e) => {
                  setNational_id_number(e.target.value);
                }}
                dir="ltr"
                id="national_id_number"
                type="text"
                autoComplete="off"
                className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              <p className="text-red-600">
                {errors.national_id_number?.message}
              </p>
            </div>
          </div>
          <div>
            <label
              htmlFor="student_number"
              className="block text-sm font-medium leading-6 text-gray-900 undefined"
            >
              شماره دانشجویی
            </label>
            <div className="mt-2">
              <input
                {...register("student_number")}
                value={student_number}
                onChange={(e) => {
                  setStudent_number(e.target.value);
                }}
                dir="ltr"
                id="student_number"
                type="text"
                autoComplete="off"
                className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              <p className="text-red-600">{errors.student_number?.message}</p>
            </div>
          </div>
        </div>

        {/* <div className="lg:flex gap-2">
            <div>
                <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 undefined"
                >
                رمز عبور
                <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                <input
                    {...register("password")}
                    dir="ltr"
                    id="password"
                    type="password"
                    autoComplete="off"
                    className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                <p className="text-red-600">{errors.password?.message}</p>
                </div>
            </div>
            <div>
                <label
                htmlFor="confirmpassword"
                className="block text-sm font-medium leading-6 text-gray-900 undefined"
                >
                تأیید رمز عبور
                <span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                <input
                    {...register("confirmPassword")}
                    dir="ltr"
                    id="confirmpassword"
                    type="password"
                    autoComplete="autoComplete"
                    className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 "
                />
                <p className="text-red-600">{errors.confirmPassword?.message}</p>
                </div>
            </div>
            </div> */}

        <br />

        <button className="flex  justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          اعمال تغییرات
        </button>
      </form>
    </div>
  );
};

export default ProfileChangeForm;
