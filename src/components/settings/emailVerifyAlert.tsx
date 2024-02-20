import { useState } from "react";
import { Link } from "react-router-dom";

const EmailVerifyAlert = () => {
  const [showAlert, setShowAlert] = useState(true);
  return showAlert ? (
    <div className="rounded-md bg-yellow-100 p-4 ">
      <div className="flex gap-1 ">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-yellow-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-yellow-800">
            {" "}
            ایمیل شما تایید نشده. برای تایید ایمیل رو این{" "}
            <Link to={"/email"} className="text-blue-700">
              لینک
            </Link>{" "}
            کلیک کنید.
          </p>
        </div>
        <div className="flex flex-1 justify-end  ">
          <div className="mx-3 pr-3  justify-self-end">
            <div className="-mx-1.5 -my-1.5 ">
              <button
                onClick={() => {
                  setShowAlert(false);
                }}
                type="button"
                className=" inline-flex rounded-md  p-1.5 text-yellow-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
              >
                <span className="sr-only">Dismiss</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};
export default EmailVerifyAlert;
