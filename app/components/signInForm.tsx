"use client";
import { use, useEffect, useState } from "react";
import { Input } from "./ui/input";
import axios from "axios";
import Cookies from "js-cookie";

export const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState([]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const honeypot = (
      e.currentTarget.elements.namedItem("honeypot") as HTMLInputElement
    )?.value;
    if (honeypot) {
      console.log("Bot detected - form not submitted.");
      return;
    }

    try {
      const response = await axios.post("/api/sign-in", formData);
      console.log("----- Sign in successful -----:");
      if (response.status === 200) {
        Cookies.set("user", response.data.user._id);
        Cookies.set("email", response.data.user.email);
        Cookies.set("first_name", response.data.user.first_name);
        Cookies.set("last_name", response.data.user.last_name);
        Cookies.set("phone", response.data.user.phone);

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

  // const handleSubmit = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/api/sign-in", {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email: formData.email, password: formData.password }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const user = await response.json();
  //     setUser(user);
  //   } catch (error) {
  //     console.error('Error signing in:', error);
  //     // Handle error
  //   }
  // }

  return (
    <div className="flex flex-col gap-4 lg:h-96 w-[400px] bg-lightBlue rounded-xl p-8 lg:p-16">
      <h2 className="text-xl">Sign in to Flow State</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          name="email"
          placeHolder="email"
          value={formData.email}
          handleChange={handleInputChange}
          type="text"
        />
        <Input
          name="password"
          placeHolder="Password"
          value={formData.password}
          handleChange={handleInputChange}
          type="password"
        />
        <div className="absolute -left-full">
          <label htmlFor="honeypot" className="sr-only">
            Do not fill out this field
          </label>
          <input
            type="text"
            name="honeypot"
            id="honeypot"
            tabIndex={-1}
            autoComplete="off"
            className="opacity-0 h-0 w-0 overflow-hidden"
          />
        </div>

        <button
          className="bg-blue py-2 px-4 text-md text-white rounded-xl hover:bg-opacity-80 shadow-custom"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};
