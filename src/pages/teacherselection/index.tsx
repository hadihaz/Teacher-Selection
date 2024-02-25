import { Link, useNavigate, useParams } from "react-router-dom";
import DashboardHeader from "../../components/dashboard/dashboardHeader";
import { useContext } from "react";
import { context } from "../../context/mainContext";
import { studentsRequests } from "../../../db.json";
import { FaCircleQuestion } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
const Teacherselectionrequest = () => {
  const { id } = useParams();

  const { isAuth } = useContext(context);
  const navigate = useNavigate();
  if (!isAuth()) {
    navigate("/");
  }

  const req = studentsRequests.filter((item) => {
    return item.id == id;
  });
  const data = req[0];
  return (
    <div>
      <div className="mb-20">
        <DashboardHeader menuOptins="صفحه اصلی" address="/dashboard" />
      </div>
      <div className="w-screen px-5 sm:px-10 md:px-28 py-10 mt-20 ">
        <h1 className="text-gray-500 text-xl border-b-2 p-1 mb-10">
          اطلاعات درخواست
        </h1>
        <div className="bg-gray-50 p-2">
          <div className="lg:flex gap-4 sm:m-5">
            <div className="flex gap-2 p-5 border-2 my-4">
              <p className="text-gray-600 w-16">نام استاد:</p>
              <p className="text-gray-900">{`${data.firstname} ${data.lastname}`}</p>
            </div>
            <div className="flex gap-2 p-5 border-2 my-4">
              <p className="text-gray-600 w-16">نام درس:</p>
              <p className="text-gray-900">{`${data.Course} `}</p>
            </div>
            <div className="flex gap-2 p-5 border-2 my-4">
              <p className="text-gray-600 w-16"> ظرفیت:</p>
              <p className="text-gray-900">{`${data.capicity} `}</p>
            </div>
            <div className="flex gap-2 p-5 border-2 my-4">
              <p className="text-gray-600 w-16"> ترم:</p>
              <p className="text-gray-900">{`${data.term} `}</p>
            </div>
            <div className="flex gap-2 p-5 border-2 my-4">
              <p className="text-gray-600 w-16"> وضعیت:</p>
              <div>
                {data.requests.accepted && (
                  <span className="flex gap-1 items-center text-green-500">
                    <FaCheckCircle />
                    <p>پذیرفته شده</p>
                  </span>
                )}
                {data.requests.NotChecked && (
                  <span className="flex gap-1 items-center text-yellow-500">
                    <FaCircleQuestion />
                    <p>برسی نشده</p>
                  </span>
                )}
                {data.requests.rejected && (
                  <span className="flex gap-1 items-center text-red-500">
                    <IoMdCloseCircle />
                    <p>رد شده</p>
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="  gap-4 sm:m-5">
            <div className=" ">
              <p className="text-gray-600 p-2 "> متن درخواست:</p>
              <textarea
                id="message"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-400 bg-gray-50 rounded-lg border "
                disabled
                value={data.res}
              ></textarea>
            </div>
            <div className="mb-3">
              <p className="text-gray-600 p-2 "> پاسخ استاد:</p>

              <textarea
                id="message"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-400 bg-gray-50 rounded-lg border "
                disabled
                value={data.req}
              ></textarea>
            </div>
          </div>
          <div className="lg:flex gap-4 sm:m-5 ">
            {data.requests.NotChecked && (
              <button className="rounded bg-red-500 px-2 py-1    text-md font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                لغو درخواست
              </button>
            )}
            <button className="rounded bg-yellow-500 px-2 py-1 text-md font-semibold text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
              <Link to={"/dashboard"}>بازگشت</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacherselectionrequest;
