import * as yup from "yup";

export const studentSignupSchema = yup
  .object({
    firstname: yup.string().required("نام مورد نیاز است"),
    lastname: yup.string().required("نام خانوادگی مورد نیاز است"),
    email: yup
      .string()
      .email("قالب ایمیل معتبر نیست")
      .required("ایمیل مورد نیاز است"),
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
    national_id_number: yup
      .string()
      .required("کد ملی مورد نیاز است")
      .matches(/^\d+$/, "کد ملی باید فقط شامل اعداد باشد"),
    phone_number: yup
      .string()
      .matches(/^(\+98|0)?9\d{9}$/, "شماره تلفن نامعتبر")
      .required("شماره تلفن مورد نیاز است"),
    student_number: yup
      .string()
      .required("شماره دانشجویی مورد نیاز است")
      .matches(/^\d+$/, "شماره دانشجویی باید فقط شامل اعداد باشد"),
    major_name: yup.string().required("نام رشته تحصیلی مورد نیاز است"),
  })
  .required();
