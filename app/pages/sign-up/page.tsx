"use client";
import { useState } from "react";
import axios from "axios";
import { Input } from "@/app/components/ui/input";


const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [allow, setAllow] = useState<boolean>(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePassword = () => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`])[A-Za-z\d!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]{8,}$/;

    if (formData.confirm !== formData.password) {
      console.log("Password not matching");
    } else {
      return regex.test(formData.password);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (allow) {
      if (!validatePassword()) {
        console.error("Password does not match the criteria.");
      } else {
        try {
          const response = await axios.post("/api/create-new-user", formData);
          console.log("Signup successful:");
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error("Error:", error.message);
          } else {
            console.error("Unknown error has occurred:", error);
          }
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
      <p key={ind} className="flex gap-2 text-black text-sm">
        {rule}
      </p>
    ));
  };
  
  return (
    <section className="min-h-screen flex justify-center items-center bg-seafoam lg:py-24 px-4 lg:px-44">
      <div className="hidden lg:flex lg:w-2/3 lg:text-7xl xl:text-8xl text-blue flex-col justify-start gap-16 px-16 font-bold">
        <h2>Find Your Flow </h2>
        <h2>Stay Organized</h2>
        <h2>Stay Focused</h2>
        <button
          onClick={() => setAllow(true)}
          className="cursor-pointer h-2 w-2"
        ></button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="lg:w-1/3 flex flex-col lg:px-8 gap-8"
      >
        <div>
          <Input
            name="email"
            placeHolder="Email"
            value={formData.email}
            handleChange={handleInputChange}
            type="text"
          />
        </div>
        <div>
          <Input
            name="password"
            placeHolder="Password"
            value={formData.password}
            handleChange={handleInputChange}
            type="password"
          />
        </div>
        <div>
          <Input
            name="confirm"
            placeHolder="Confirm Password"
            value={formData.confirm}
            handleChange={handleInputChange}
            type="password"
          />
          <p className="text-sm font-bold mt-4">Password must:</p>
          <div className="px-4">{getCriteria()}</div>
        </div>

        <button
          className="bg-blue px-4 py-2 text-xl text-white rounded-xl hover:bg-opacity-80 shadow-custom"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </section>
  );
};

export default SignIn;
