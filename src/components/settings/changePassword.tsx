/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Alert from "../common/alert";
import { useContext, useState } from "react";
import Modal from "../common/modal";
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
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), yup.ref("password")],
        "رمز عبور با تأیید رمز عبور برابر نیست"
      )
      .required("تأیید رمز عبور مورد نیاز است"),
  })
  .required();
const ChangePassword = () => {
  const { user,dispatch } = useContext(context);

  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [success, setSuccess] = useState<boolean | null>(null);
  const [newData, setNewdata] = useState({});

  const onSubmit = (data: any) => {
    setNewdata({ password: data.password });
    setShowModal(true);
  };
  const modalAction = () => {
    setShowModal(false);
    fetch("http://localhost:3000/users/" + user.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newData,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("نتیجه:", result);
        setSuccess(true);
        dispatch("user", result);
        setTimeout(() => {
          setSuccess(null);
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

  return (
    <div className="bg-white px-4 py-10 shadow sm:rounded-lg sm:px-10">
      {showModal && (
        <Modal
          action={modalAction}
          cancel={modalCancel}
          buttonMessage="تغییر رمز عبور"
          cancelMessage="لغو"
          headerMessage="تغییر  رمز عبور"
          message="ایا میخواهید رمز عبورتان تغییر کند."
          color="red"
        />
      )}
      <div className="h-[50px] mb-1">
        {success && <Alert message="تفییر رمز عبور با موفقیت انجام شد. " />}
        {success === false && (
          <Alert error={true} title="خطا در انجام عملیات." />
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="lg:flex gap-2">
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
        </div>
        <br />
        <button className="flex  justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          اعمال تغییرات
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
