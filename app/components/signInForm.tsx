"use client";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import axios from "axios";
import { useUser } from "../../context/user"
import Cookies from "js-cookie";

export const SignInForm = () => {
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/sign-in", formData);
      console.log("----- Sign in successful -----:", response.data);
      if (response.status === 200) {
        Cookies.set('email', response.data.user.email, { expires: 1 });
        Cookies.set('first_name', response.data.user.first_name, { expires: 1 });
        Cookies.set('last_name', response.data.user.last_name, { expires: 1 });
        Cookies.set('phone', response.data.user.phone, { expires: 1 });

        window.location.href = response.data.redirectUrl;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Unknown error has occurred:", error);
      }
    }
  };

  
  return (
    <div className="flex flex-col gap-4 h-96 w-[400px] bg-lightBlue rounded-xl p-16">
      <h2>Sign in to Flow State</h2>
      <form onSubmit={handleSubmit}>
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
      </form>
    </div>
  );
};
