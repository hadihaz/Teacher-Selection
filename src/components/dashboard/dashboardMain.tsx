import DashboardCard from "./dashboardCard";

const DashboardMain = () => {
  return (
    <>
      <div className="bg-white text-gray-600 ">
          <DashboardCard />
      </div>
      {/* <div className="bg-white text-green-600 ">
        <div>
          <div className="border-b-2 border-green-700  flex justify-between">
            <p className="bg-green-100 rounded-t-3xl text-xl py-1 px-5 mx-5 hover:bg-green-200">
              لیست اساتید
            </p>

            <ul className="flex gap-7 mx-5">
              <li className="rounded-t-3xl w-32 text-center px-5 py-2 test-green-500 bg-green-100 hover:bg-green-200">
                پذیرفته شده
              </li>
              <li className="rounded-t-3xl w-32 text-center px-5 py-2 test-yellow-500 bg-yellow-100 hover:bg-yellow-200">
                در حال برسی
              </li>
              <li className="rounded-t-3xl w-32 text-center px-5 py-2 test-red-500 bg-red-100 hover:bg-red-200">
                رد شده
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 text-center p-20 text-lg ">
            استادی یافت نشد
          </div>
        </div>
      </div> */}
    </>
  );
};

export default DashboardMain;
