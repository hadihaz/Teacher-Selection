/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";

import Pagination from "../../common/pagination";
import { context } from "../../../context/mainContext";
import { IstudentsRequests } from "../../../core/interface/studentsRequests ";

const AllRequestsCard = () => {
  const [filterMasters, setFilterMasters] = useState<IstudentsRequests[]>([]);
  const [currentMasters, setCurrentMasters] = useState<IstudentsRequests[]>([]);
  const tableCol = ["نام استاد", "نام درس", "ظرفیت", "ترم"];
  const { user } = useContext(context);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(filterMasters.length / itemsPerPage);

  useEffect(() => {
    setCurrentMasters(filterMasters.slice(indexOfFirstItem, indexOfLastItem));
  }, [filterMasters, currentPage, itemsPerPage]);
  useEffect(() => {
    fetch("http://localhost:3000/masterCourses", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setFilterMasters(data);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, [user]);


  return (
    <>
      <div className="border-b-2 border-gray-700  flex justify-between">
        <p
          onClick={() => {
            // changeFilter("all");
            // ToggleShowMobileMenu(false);
          }}
          className="bg-gray-100 rounded-t-3xl text-base lg:text-xl py-1 px-5 mx-5 hover:bg-gray-200"
        >
          همه اساتید
        </p>
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
                        {user.capicity}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {user.term}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <button className="rounded bg-green-500 px-2 py-1  mr-5  text-md font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                          ثبت درخواست
                        </button>
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

export default AllRequestsCard;
