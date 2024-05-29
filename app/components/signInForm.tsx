"use client";
import { useState } from "react";
import { Input } from "./ui/input";

export const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData);
  return (
    <div className="flex flex-col gap-4 h-96 w-full bg-lightBlue rounded-xl p-16">
      <h2>Sign in to Flow State</h2>
      <Input
        name="email"
        placeHolder="email"
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
      <button
        className="bg-blue p-4 text-md text-white rounded-xl hover:bg-opacity-80 shadow-custom"
        type="submit"
      >
        Sign In
      </button>
    </div>
  );
};
