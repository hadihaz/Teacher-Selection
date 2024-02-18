
import { Link } from "react-router-dom";
const tableCol = ["نام استاد", "نام درس", "ظرفیت", "ترم", "وضعیت"];

const UserList = ({ users }: { users: any[] }) => {
  return (
    <div className="mb-10 -mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <table className="min-w-full table-fixed divide-y divide-gray-300">
          <thead>
            <tr>
              {tableCol.map((item: string, index: any) => (
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
            {users.map((user) => (
              <tr key={user.id}>
                <Link to={`/edituser/${user.id}`}>
                  <td className=" whitespace-nowrap py-4 p-3 text-sm font-medium text-gray-900">
                    {user.firstname}
                  </td>
                </Link>
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
                  {user.requests.acceptsd && <span className="text-green-500">تایید شده</span>}
                  {user.requests.rejected && <span className="text-yellow-500">برسی نشده</span>}
                  {user.requests.NotChecked && <span className="text-red-500">رد شده</span>}
                </td>
{/*                 
                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-3 space-x-3">
                  <button className="rounded bg-red-600 px-2 py-1  text-md font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                    Delete
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
