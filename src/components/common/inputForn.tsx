/* eslint-disable @typescript-eslint/no-explicit-any */
type inputFormTypes = {
  inputName: string;
  label: string;
  type: string;
  register: any;
  dir: string;
  errors: any;
};

const Inputform = ({
  inputName,
  label,
  register,
  type,
  dir,
  errors,
}: inputFormTypes) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium leading-6 text-gray-900 undefined"
      >
        {inputName}
      </label>
      <div className="mt-2">
        <input
          {...register(label)}
          dir={dir}
          id={label}
          type={type}
          className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 "
        />
        <p className="text-red-600">{errors.label?.message}</p>
      </div>
    </div>
  );
};

export default Inputform;
