import { CiWarning } from "react-icons/ci";

interface IModelProps {
  action: () => void;
  cancel: () => void;
  buttonMessage: string;
  cancelMessage: string;
  headerMessage: string;
  message: string;
  color?: string;
}
const Modal: React.FC<IModelProps> = ({
  action,
  cancel,
  buttonMessage,
  cancelMessage,
  headerMessage,
  message,
  color = "gray",
}) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div className="sm:flex sm:items-start gap-3">
              <div
                className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full  sm:mx-0 sm:h-10 sm:w-10
                ${
                  color == "green" || color == "gray"
                    ? color == "green"
                      ? "text-green-600 bg-green-100"
                      : "text-gray-600 bg-gray-100"
                    : color == "red"
                    ? "text-red-600 bg-red-100"
                    : "text-yellow-500 bg-yellow-100"
                }
                `}
              >
                <CiWarning className={`h-6 w-6 `} />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-right">
                <h3
                  className="text-base font-semibold leading-6 text-gray-900"
                  id="modal-title"
                >
                  {headerMessage}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{message}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row gap-3">
              <button
                type="button"
                onClick={action}
                // className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                className={`
                ${
                  color == "green" || color == "gray"
                    ? color == "green"
                      ? "bg-green-600 hover:bg-green-500"
                      : "bg-gray-600 hover:bg-gray-500"
                    : color == "red"
                    ? "bg-red-600 hover:bg-red-500"
                    : "bg-yellow-500 hover:bg-yellow-400"
                }
                inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto`}
              >
                {buttonMessage}
              </button>
              <button
                type="button"
                onClick={cancel}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto "
              >
                {cancelMessage}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
