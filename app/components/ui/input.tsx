import { ChangeEvent, FC, useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

interface Props {
  name: string;
  placeHolder: string;
  value: string;
  handleChange?: React.ChangeEventHandler<HTMLInputElement>;
  type: string;
  label?: string;
}

export const Input: FC<Props> = ({
  name,
  value,
  placeHolder,
  handleChange,
  type,
  label
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const isPasswordInput = name === "password" || name === "confirm";

  return isPasswordInput ? (
    <div className="relative">
      <label>{label}</label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type={isPasswordInput && showPassword ? "text" : "password"}
        name={name}
        placeholder={placeHolder}
        value={value}
        onChange={handleChange}
        required
      />
      {isPasswordInput && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 top-6 right-0 pr-3 flex items-center text-sm leading-5"
        >
          {showPassword ? <IconEye /> : <IconEyeOff />}
        </button>
      )}
    </div>
  ) : (
    <>
      <label>{label}</label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type={type}
        name={name}
        placeholder={placeHolder}
        value={value}
        onChange={handleChange}
        required
      />
    </>
  );
};
