import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import DashboardHeader from "../../components/dashboard/dashboardHeader";
import { useContext, useEffect, useState } from "react";
import { context } from "../../context/mainContext";
import { ImasterCourses } from "../../core/interface/masterCourses";
import Modal from "../../components/common/modal";
import Alert from "../../components/common/alert";
const MastersPage = () => {
  const { id } = useParams();
  const { isAuth, getUserType, user } = useContext(context);
  const [data, setdata] = useState<ImasterCourses>();
  const [studentReq, setStudentReq] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    buttonMessage: "",
    cancelMessage: "",
    headerMessage: "",
    message: "",
    color: "",
  });
  const [fetchActionType, setFetchActionType] = useState("");
  const [seccess, setSeccess] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://0.0.0.0:3000/masterCourses", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setdata(data.filter((item: ImasterCourses) => item?.id == id)[0]);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, [id]);

  const activModal = (action: string) => {
    switch (action) {
      case "sendRequest":
        setModalInfo({
          buttonMessage: "ارسال درخواست",
          cancelMessage: "لغو",
          headerMessage: "ارسال درخواست",
          message: "ایا میخواهید درخواستتان را ارسال کنید.",
          color: "green",
        });
        setFetchActionType("sendRequest");
        break;
      case "deleteLesson":
        setModalInfo({
          buttonMessage: "حذف درس",
          cancelMessage: "لغو",
          headerMessage: "حذف درس",
          message: "ایا میخواهید درس را حذف کنید.",
          color: "red",
        });
        setFetchActionType("deleteLesson");
        break;
    }
    setShowModal(true);
  };
  const activeFetch = () => {
    setShowModal(false);
    switch (fetchActionType) {
      case "sendRequest":
        fetch("http://0.0.0.0:3000/studentsRequests", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: data?.firstname,
            lastname: data?.lastname,
            capicity: data?.capicity,
            requests: {
              accepted: false,
              rejected: false,
              NotChecked: true,
            },
            term: data?.term,
            Course: data?.Course,
            studentID: user.id,
            masterID: data?.masterID,
            req: studentReq,
            res: "",
          }),
        })
          .then((response) => response.json())
          .then((result) => {
            console.log("نتیجه:", result);
            setSeccess(true);
            setAlertError(false);
            setTimeout(() => {
              setSeccess(false);
              navigate("/dashboard");
            }, 2000);
          })
          .catch((error) => {
            console.error("خطا:", error);
            setSeccess(true);
            setAlertError(true);
            setTimeout(() => {
              setSeccess(false);
            }, 2000);
          });
        break;
      case "deleteLesson":
        fetch("http://0.0.0.0:3000/masterCourses/" + data?.id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((result) => {
            console.log("نتیجه:", result);
            setSeccess(true);
            setAlertError(false);
            setTimeout(() => {
              setSeccess(false);
              navigate("/dashboard");
            }, 2000);
          })
          .catch((error) => {
            console.error("خطا:", error);
            setSeccess(true);
            setAlertError(true);
            setTimeout(() => {
              setSeccess(false);
            }, 2000);
          });
        break;
    }
  };

  if (!isAuth()) {
    return <Navigate to={"/"}></Navigate>;
  }
  return (
    <>
      {showModal && (
        <Modal
          action={activeFetch}
          cancel={() => {
            setShowModal(false);
          }}
          buttonMessage={modalInfo?.buttonMessage}
          cancelMessage={modalInfo.cancelMessage}
          headerMessage={modalInfo.headerMessage}
          message={modalInfo.message}
          color={modalInfo.color}
        />
      )}
      {data && (
        <div>
          <div className="mb-20">
            <DashboardHeader menuOptins="صفحه اصلی" address="/dashboard" />
          </div>
          <div className=" px-5 sm:px-10 md:px-28 py-10 mt-20 ">
            <h1 className="flex justify-between text-gray-500 text-xl border-b-2 p-1 mb-10">
              <p>اطلاعات درخواست</p>
              <button className="text-xs mx-1 rounded bg-gray-400 px-2 py-1 text-md font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                <Link to={"/dashboard"}>بازگشت</Link>
              </button>
            </h1>
            {seccess && (
              <Alert
                error={alertError}
                title="خطا در انجام عملیات"
                message="عملیات با موفقیت انجام شد"
              />
            )}

            <div className="bg-gray-50 p-2">
              <div className="lg:flex gap-4 sm:m-5">
                <div className="flex gap-2 p-5 border-2 my-4">
                  <p className="text-gray-600 w-16">نام استاد:</p>
                  <p className="text-gray-900">{`${data?.firstname} ${data?.lastname}`}</p>
                </div>
                <div className="flex gap-2 p-5 border-2 my-4">
                  <p className="text-gray-600 w-16">نام درس:</p>
                  <p className="text-gray-900">{`${data?.Course} `}</p>
                </div>
                <div className="flex gap-2 p-5 border-2 my-4">
                  <p className="text-gray-600 w-16"> ظرفیت:</p>
                  <p className="text-gray-900">{`${data?.capicity} `}</p>
                </div>
                <div className="flex gap-2 p-5 border-2 my-4">
                  <p className="text-gray-600 w-16"> ترم:</p>
                  <p className="text-gray-900">{`${data?.term} `}</p>
                </div>
              </div>
              {getUserType() == "student" && (
                <div className="mb-3  gap-4 sm:m-5">
                  <div className=" ">
                    <p className="text-gray-600 p-2 "> متن درخواست:</p>
                    <textarea
                      id="message"
                      rows={4}
                      className="block p-2.5 w-full text-sm text-gray-400 bg-gray-50 rounded-lg border "
                      value={studentReq}
                      onChange={(e) => {
                        setStudentReq(e.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
              )}

              <div className="lg:flex gap-4 sm:m-5 ">
                {getUserType() == "master" && (
                  <button
                    className="mx-1 rounded bg-red-500 px-2 py-1    text-md font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    onClick={() => activModal("deleteLesson")}
                  >
                    حذف درس
                  </button>
                )}
                {getUserType() == "student" && (
                  <button
                    className="mx-1 rounded bg-green-500 px-2 py-1 text-md font-semibold text-white shadow-sm green:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    onClick={() => activModal("sendRequest")}
                  >
                    ارسال درخواست
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MastersPage;
