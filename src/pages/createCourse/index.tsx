/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import DashboardHeader from "../../components/dashboard/dashboardHeader";
import { context } from "../../context/mainContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "../../components/common/modal";
import Alert from "../../components/common/alert";

const schema = yup
  .object({
    Course: yup.string(),
    term: yup.string(),
    capicity: yup.string().matches(/^\d+$/, "ظرفیت باید فقط شامل اعداد باشد"),
  })
  .required();

const CreateCourse = () => {
  const { isAuth, getUserType, user } = useContext(context);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [newData, setNewdata] = useState({});
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => {
    setNewdata(data);
    setShowModal(true);
  };
  const modalAction = () => {
    setShowModal(false);
    fetch("http://localhost:3000/masterCourses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newData,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        masterID: user.id,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("نتیجه:", result);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(null);
          navigate("/dashboard");
        }, 2000);
      })
      .catch((error) => {
        console.error("خطا:", error);
        setSuccess(false);
        setTimeout(() => {
          setSuccess(null);
        }, 2000);
      });
  };
  const modalCancel = () => {
    setShowModal(false);
  };

  if (!isAuth() && getUserType() != "master") {
    return <Navigate to={"/"}></Navigate>;
  }
  return (
    <div>
      <div className="mb-20">
        <DashboardHeader menuOptins="صفحه اصلی" address="/dashboard" />
      </div>
      <div className="px-5 sm:px-10 md:px-28 py-10">
       <div className="flex justify-between">
       <h1 className="text-gray-500 text-xl border-b-2 p-1">افزودن درس</h1>
        <button className="text-xs mx-1 rounded  px-2 py-1 text-md font-semibold shadow-sm text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
          <Link to={"/dashboard"}>بازگشت</Link>
        </button>
       </div>
        <>
          {showModal && (
            <Modal
              action={modalAction}
              cancel={modalCancel}
              buttonMessage="افزودن درس"
              cancelMessage="لغو"
              headerMessage="افزودن درس"
              message="ایا از افزودن درس جدید مطمعن هستید؟"
              color="green"
            />
          )}
          <div className="h-[50px] mb-1">
            {success && <Alert message=" عملیات با موفقیت انجام شد. " />}
            {success === false && (
              <Alert error={true} title="خطا در انجام عملیات." />
            )}
          </div>
        </>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
          <div className=" gap-3 lg:flex">
            <div>
              <label
                htmlFor="Course"
                className="block text-sm font-medium leading-6 text-gray-900 undefined"
              >
                نام درس
              </label>
              <div className="mt-2">
                <input
                  {...register("Course")}
                  id="Course"
                  type="text"
                  autoComplete="autoComplete"
                  className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 "
                />
                <p className="text-red-600">{errors.Course?.message}</p>
              </div>
            </div>

            <div>
              <label
                htmlFor="term"
                className="block text-sm font-medium leading-6 text-gray-900 undefined"
              >
                ترم
              </label>
              <div className="mt-2">
                <input
                  {...register("term")}
                  id="term"
                  type="text"
                  autoComplete="autoComplete"
                  className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 "
                />
                <p className="text-red-600">{errors.term?.message}</p>
              </div>
            </div>
            <div>
              <label
                htmlFor="capicity"
                className="block text-sm font-medium leading-6 text-gray-900 undefined"
              >
                ظرفیت
              </label>
              <div className="mt-2">
                <input
                  {...register("capicity")}
                  dir="ltr"
                  id="capicity"
                  type="text"
                  autoComplete="off"
                  className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                <p className="text-red-600">{errors.capicity?.message}</p>
              </div>
            </div>
          </div>
          <br />
          <button className="flex  justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            افزودن
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
