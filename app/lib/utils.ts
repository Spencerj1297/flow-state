"use client";
import axios from "axios";
import { Task } from "../types";
import Cookies from "js-cookie";

export const getPriority = (task: Task) => {
  switch (task.priority) {
    case "high":
      return "border-red text-red";
    case "med":
      return "border-blue text-blue";
    case "low":
      return "border-grey text-grey";
    default:
      return "border-blue text-blue";
  }
};

export const getQuotes = async () => {
  try {
    const response = await axios.get("/api/edit-task");
    if (response.status === 200) {
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Unknown error has occurred:", error);
    }
  }
};


export const signOut = () => {
  Cookies.remove("user");
  Cookies.remove("email");
  Cookies.remove("first_name");
  Cookies.remove("last_name");
  Cookies.remove("phone");
  window.location.href = "/ ";
};
