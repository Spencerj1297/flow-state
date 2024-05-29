"use client";
import { ChangeEvent, useCallback, useState } from "react";
import axios, { AxiosError } from "axios";
import { Input } from "@/app/components/ui/input";
import { IconCircleCheck } from "@tabler/icons-react";
import { get } from "http";

const SignIn = () => {
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // NOT SURE IF CONFIRMING PASSWORD IS WANTED

  // const handleConfirmPassword = useCallback(
  //   (e: ChangeEvent<HTMLInputElement>) => {
  //     setConfirmPassword(e.target.value);
  //   },
  //   []
  // );

  const validatePassword = () => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`])[A-Za-z\d!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]{8,}$/;
    return regex.test(formData.password);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validatePassword()) {
      console.error("Password does not match the criteria.");
    } else {
      try {
        const response = await axios.post("/api/create-new-user", formData);
        console.log("Signup successful:", response.data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error:", error.message);
        } else {
          console.error("Unknown error has occurred:", error);
        }
      }
    }
  };

  const getCriteria = () => {
    let rules = [
      "minimum of 8 characters",
      "contains a digit",
      "contains a lowercase letter",
      "contains an uppercase letter",
      "contains a symbol",
    ];

    return rules.map((rule, ind) => (
      <p key={ind} className="flex gap-2 text-lightGrey">
        {rule}
      </p>
    ));
  };


  console.log("form data", formData);
  console.log("password", confirmPassword);

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="hidden lg:flex lg:w-1/2 lg:text-7xl xl:text-8xl text-blue flex-col justify-center gap-16 px-16 font-bold">
        <h2 className="text-shadow">Find Your Flow </h2>
        <h2 className="text-shadow">Stay Organized</h2>
        <h2 className="text-shadow">Stay Focused</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="lg:w-1/2 h-full flex flex-col gap-4 p-8 "
      >
        <Input
          name="username"
          placeHolder="Username"
          value={formData.username}
          callBack={handleInputChange}
          type="text"
        />
        <Input
          name="email"
          placeHolder="Email"
          value={formData.email}
          callBack={handleInputChange}
          type="text"
        />
        <Input
          name="password"
          placeHolder="Password"
          value={formData.password}
          callBack={handleInputChange}
          type="password"
        />
        <p className="font-bold">Password must:</p>
        <div className="px-4">{getCriteria()}</div>
        <button
          className="bg-blue p-4 text-xl text-white rounded-xl hover:bg-opacity-80 shadow-custom"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </section>
  );
};

export default SignIn;
