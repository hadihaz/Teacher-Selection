/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleQuestion } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import Pagination from "../../common/pagination";
import { RxDropdownMenu } from "react-icons/rx";
import { context } from "../../../context/mainContext";
import { IstudentsRequests } from "../../../core/interface/studentsRequests ";

const MasterRequestCards = () => {
  const [masters, setMasters] = useState<IstudentsRequests[]>([]);
  const [filterMasters, setFilterMasters] = useState<IstudentsRequests[]>([]);
  const [currentMasters, setCurrentMasters] = useState<IstudentsRequests[]>([]);
  const tableCol = ["نام استاد", "نام درس", "ترم", "وضعیت"];
  const { user } = useContext(context);
  const [showMobileMenu, ToggleShowMobileMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(filterMasters.length / itemsPerPage);

  useEffect(() => {
    setCurrentMasters(filterMasters.slice(indexOfFirstItem, indexOfLastItem));
    console.log(currentMasters)
  }, [filterMasters, currentPage, itemsPerPage]);
  useEffect(() => {
    fetch("http://localhost:3000/studentsRequests", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        // setMasters(data);
        // setFilterMasters(data);
        setMasters(
          data.filter((item: IstudentsRequests) => item.masterID == user.id)
        );
        setFilterMasters(
          data.filter((item: IstudentsRequests) => item.masterID == user.id)
        );
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, [user]);

  const changeFilter = (filterType: string) => {
    const filter = masters.filter((master) => {
      if (filterType == "acceptsd") return master.requests.acceptsd;
      else if (filterType == "rejected") return master.requests.rejected;
      else if (filterType == "NotChecked") return master.requests.NotChecked;
      else if (filterType == "all") return master.requests;
    });
    setFilterMasters(filter);
  };

  return (
    <>
      <div className="border-b-2 border-gray-700  flex justify-between">
        <p
          onClick={() => {
            changeFilter("all");
            ToggleShowMobileMenu(false);
          }}
          className="bg-gray-100 rounded-t-3xl text-base lg:text-xl py-1 px-5 mx-5 hover:bg-gray-200"
        >
          درخواست های دریافت شده
        </p>
        <ul className="flex gap-7 mx-5">
          <li
            onClick={() => {
              changeFilter("acceptsd");
            }}
            className="rounded-t-3xl hidden lg:flex justify-center w-32 text-center px-5 py-2 test-green-500 bg-green-100 hover:bg-green-200"
          >
            پذیرفته شده
          </li>
          <li
            onClick={() => {
              changeFilter("NotChecked");
            }}
            className="rounded-t-3xl hidden lg:flex justify-center w-32 text-center px-5 py-2 test-yellow-500 bg-yellow-100 hover:bg-yellow-200"
          >
            برسی نشده
          </li>
          <li
            onClick={() => {
              changeFilter("rejected");
            }}
            className="rounded-t-3xl hidden lg:flex justify-center w-32 text-center px-5 py-2 test-red-500 bg-red-100 hover:bg-red-200"
          >
            رد شده
          </li>
          <li
            className={`
          ${showMobileMenu ? "absolute" : "hidden"}
           bg-white mt-9 p-4 left-4 w-60 border-2`}
          >
            <ul>
              <li
                className="m-2 p-2 text-gray-500 border-b-2"
                onClick={() => {
                  changeFilter("acceptsd");
                  ToggleShowMobileMenu(false);
                }}
              >
                پذیرفته شده
              </li>
              <li
                className="m-2 p-2 text-gray-500 border-b-2"
                onClick={() => {
                  changeFilter("NotChecked");
                  ToggleShowMobileMenu(false);
                }}
              >
                برسی نشده
              </li>
              <li
                className="m-2 p-2 text-gray-500 "
                onClick={() => {
                  changeFilter("rejected");
                  ToggleShowMobileMenu(false);
                }}
              >
                رد شده
              </li>
            </ul>
          </li>
          <li
            onClick={() => {
              ToggleShowMobileMenu(!showMobileMenu);
            }}
            className=" flex justify-center items-center lg:hidden "
          >
            <RxDropdownMenu className="size-5" />
          </li>
        </ul>
      </div>
      {currentMasters.length == 0 && (
        <div className="bg-gray-50 text-center p-20 text-lg ">
          درخواستی یافت نشد!
        </div>
      )}
      {currentMasters.length != 0 && (
        <div className="mb-10">
          <div className=" -mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead>
                  <tr>
                    {tableCol.map((item: string, index: number) => (
                      <th
                        key={index}
                        scope="col"
                        className="min-w-[12rem] px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                      >
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white ">
                  {currentMasters.map((user) => (
                    <tr key={user.id}>
                      <td className=" whitespace-nowrap py-4 p-3 text-sm font-medium text-gray-900">
                        {`${user.firstname} ${user.lastname}`}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {user.Course}
                      </td>

                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {user.term}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {user.requests.acceptsd && (
                          <span className="flex gap-1 items-center text-green-500">
                            <FaCheckCircle />
                            <p>پذیرفته شده</p>
                          </span>
                        )}
                        {user.requests.NotChecked && (
                          <span className="flex gap-1 items-center text-yellow-500">
                            <FaCircleQuestion />
                            <span>برسی نشده</span>
                            <button className="rounded bg-yellow-500 px-2 py-1  mr-5  text-md font-semibold text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                              برسی درخواست
                            </button>
                          </span>
                        )}
                        {user.requests.rejected && (
                          <span className="flex gap-1 items-center text-red-500">
                            <IoMdCloseCircle />
                            <p>رد شده</p>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </>
  );
};

export default MasterRequestCards;
