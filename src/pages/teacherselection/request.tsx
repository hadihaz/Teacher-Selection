import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import DashboardHeader from "../../components/dashboard/dashboardHeader";
import { useContext, useEffect, useState } from "react";
import { context } from "../../context/mainContext";
import { FaCircleQuestion } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { IstudentsRequests } from "../../core/interface/studentsRequests ";
import Modal from "../../components/common/modal";
import Alert from "../../components/common/alert";

const RequestsPage = () => {
  const { id } = useParams();
  const { isAuth, getUserType } = useContext(context);
  const [data, setdata] = useState<IstudentsRequests>();
  const [masterRes, setMasterRes] = useState(data?.res);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dbjson.liara.run/studentsRequests", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setdata(data.filter((item: IstudentsRequests) => item?.id == id)[0]);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, [id]);

  const [modalInfo, setModalInfo] = useState({
    buttonMessage: "",
    cancelMessage: "",
    headerMessage: "",
    message: "",
    color: "",
  });
  const [fetchActionType, setFetchActionType] = useState("");
  const activModal = (action: string) => {
    switch (action) {
      case "dalate":
        setModalInfo({
          buttonMessage: "حذف درخواست",
          cancelMessage: "لغو",
          headerMessage: "حذف درخواست",
          message: "ایا میخواهید درخواستتان را حذف کنید.",
          color: "red",
        });
        setFetchActionType("dalate");
        break;
      case "accept":
        setModalInfo({
          buttonMessage: "قبول درخواست",
          cancelMessage: "لغو",
          headerMessage: "قبول درخواست",
          message: "ایا میخواهید درخواستت را فبول کنید.",
          color: "green",
        });
        setFetchActionType("accept");
        break;
      case "reject":
        setModalInfo({
          buttonMessage: "رد درخواست",
          cancelMessage: "لغو",
          headerMessage: "رد درخواست",
          message: "ایا میخواهید درخواست را رد کنید.",
          color: "red",
        });
        setFetchActionType("reject");
        break;
    }
    setShowModal(true);
  };
  const activeFetch = () => {
    setShowModal(false);
    switch (fetchActionType) {
      case "dalate":
        fetch("https://dbjson.liara.run/studentsRequests/" + data?.id, {
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
      case "accept":
        fetch("https://dbjson.liara.run/studentsRequests/" + data?.id, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requests: {
              accepted: true,
              rejected: false,
              NotChecked: false,
            },
            res: masterRes,
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
      case "reject":
        fetch("https://dbjson.liara.run/studentsRequests/" + data?.id, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requests: {
              accepted: false,
              rejected: true,
              NotChecked: false,
            },
            res: masterRes,
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
    }
  };

  const [seccess, setSeccess] = useState(false);
  const [alertError, setAlertError] = useState(false);

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
                    {data.requests?.accepted && (
                      <span className="flex gap-1 items-center text-green-500">
                        <FaCheckCircle />
                        <p>پذیرفته شده</p>
                      </span>
                    )}
                    {data?.requests?.NotChecked && (
                      <span className="flex gap-1 items-center text-yellow-500">
                        <FaCircleQuestion />
                        <p>برسی نشده</p>
                      </span>
                    )}
                    {data?.requests?.rejected && (
                      <span className="flex gap-1 items-center text-red-500">
                        <IoMdCloseCircle />
                        <p>رد شده</p>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-3  gap-4 sm:m-5">
                <div className="mb-3">
                  <p className="text-gray-600 p-2 "> متن درخواست:</p>
                  <textarea
                    id="message"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-400 bg-gray-50 rounded-lg border "
                    disabled
                    value={data?.req}
                  ></textarea>
                </div>
                {!data?.requests?.NotChecked &&  (
                  <div className="mb-3">
                    <p className="text-gray-600 p-2 "> پاسخ استاد:</p>
                    <textarea
                      id="message"
                      rows={4}
                      className="block p-2.5 w-full text-sm text-gray-400 bg-gray-50 rounded-lg border "
                      disabled
                      value={data?.res}
                    ></textarea>
                  </div>
                )}
                {data?.requests?.NotChecked && getUserType() == "master" && (
                  <div className="mb-3">
                    <p className="text-gray-600 p-2 "> پاسخ استاد:</p>
                    <textarea
                      id="message"
                      rows={4}
                      className="block p-2.5 w-full text-sm text-gray-400 bg-gray-50 rounded-lg border "
                      value={masterRes}
                      placeholder={data?.res}
                      onChange={(e) => setMasterRes(e.target.value)}
                    ></textarea>
                  </div>
                )}
              </div>
              <div className="lg:flex gap-4 sm:m-5 ">
                {data?.requests?.NotChecked && getUserType() == "student" && (
                  <button
                    className="rounded bg-red-500 px-2 py-1 text-md font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    onClick={() => activModal("dalate")}
                  >
                    لغو درخواست
                  </button>
                )}
                {data?.requests?.NotChecked && getUserType() == "master" && (
                  <>
                    <button
                      className="mx-1 rounded bg-green-500 px-2 py-1 text-md font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      onClick={() => activModal("accept")}
                    >
                      قبول درخواست
                    </button>
                    <button
                      className="mx-1 rounded bg-red-500 px-2 py-1 text-md font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      onClick={() => activModal("reject")}
                    >
                      رد درخواست
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RequestsPage;
