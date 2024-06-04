"use client";
import Cookies from "js-cookie";
import { Task } from "@/app/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Tasks from "../tasks/page";

const UserDashboard = () => {
  const [userTasks, setUserTasks] = useState<Task[]>([]);

  const getUserTasks = async () => {
    try {
      const id = {
        user_id: Cookies.get("user"),
      };
      const response = await axios.post("/api/get-user-tasks", id);
      if (response.status === 200) {
        setUserTasks(response.data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Unknown error has occurred:", error);
      }
    }
  };

  console.log("tasks", userTasks);

  useEffect(() => {
    getUserTasks();
  }, []);
  return (
    <>
      <section className="flex gap-4 flex px-32 pt-32">
        {/* <h1 className="absolute top-44 left-32 text-blue">
          Good Morning, Future Name
        </h1> */}
        <div className="bg-white w-1/2 h-96 text-center p-8 rounded-xl shadow-custom overflow-hidden overflow-y-scroll hide-scrollbar">
          <h2 className="w-full flex justify-between">
            Task List for: Future Today Date{" "}
            <Link href="/pages/tasks">
              <button className="bg-blue text-white p-2 rounded-xl text-xs">
                Go to Tasks
              </button>
            </Link>
          </h2>
          <div className="flex flex-col justify-center items-center gap-4 mt-4">
            {userTasks
              .filter((tasks) => tasks.status === "in progress")
              .map((task, ind) => (
                <button
                  key={ind}
                  className="w-full flex flex-col text-left gap-4 rounded-xl shadow-outline transition-transform transform hover:scale-102 duration-300 ease-in-out p-4 bg-lightBlue"
                >
                  <p className="text-sm">{task?.title}</p>
                  <p className="text-xs">{task?.description}</p>
                </button>
              ))}
          </div>
        </div>
        <div className="bg-white w-1/2 h-96 text-center p-8 rounded-xl shadow-custom">
          <h2 className="w-full flex justify-between">
            Job application{" "}
            <button className="bg-blue text-white p-2 rounded-xl text-xs">
              Go to applications
            </button>
          </h2>
        </div>
      </section>
      <section className="flex gap-4 flex px-32 mt-4 pb-32">
        <div className="bg-white w-full min-h-96 text-center p-8 rounded-xl shadow-custom">
          <h2 className="w-full flex justify-between">
            OTHER{" "}
            <button className="bg-blue text-white p-2 rounded-xl text-xs">
              Go to other
            </button>
          </h2>
        </div>
      </section>
    </>
  );
};

export default UserDashboard;
