import { ChangeEvent, FC, useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

interface Props {
  name: string;
  placeHolder: string;
  value: string;
  callBack: React.ChangeEventHandler<HTMLInputElement>;
  type: string;
}

export const Input: FC<Props> = ({
  name,
  value,
  placeHolder,
  callBack,
  type,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const isPasswordInput = name === "password";

  return isPasswordInput ? (
    <div className="relative">
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type={isPasswordInput && showPassword ? "text" : "password"}
        name={name}
        placeholder={placeHolder}
        value={value}
        onChange={callBack}
        required
      />
      {isPasswordInput && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
        >
          {showPassword ? <IconEye /> : <IconEyeOff />}
        </button>
      )}
    </div>
  ) : (
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type={type}
        name={name}
        placeholder={placeHolder}
        value={value}
        onChange={callBack}
        required
      />
  );
};
