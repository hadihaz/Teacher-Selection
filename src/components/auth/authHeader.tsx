/* eslint-disable @typescript-eslint/no-explicit-any */
const AuthHeader = ({ formType, changeform }: any) => {
  return (
    <div className="flex justify-center  mb-1">
      <button
        style={{ borderRadius: "0px 5px 5px 0px" }}
        className={`
        ${!formType ? "bg-green-300" : "bg-green-100"}
        bg-green-100 hover:bg-green-200 text-green-900  font-bold py-1 px-3  w-[110px]`}
        onClick={() => {
          changeform(false);
        }}
      >
        ثبت نام
      </button>
      <button
        style={{ borderRadius: "5px 0px 0px 5px" }}
        className={`
        ${formType ? "bg-green-300" : "bg-green-100"}
        bg-green-100 hover:bg-green-200 text-green-900  font-bold py-1 px-3  w-[110px]`}
        onClick={() => {
          changeform(true);
        }}
      >
        ورود
      </button>
    </div>
  );
};

export default AuthHeader;
