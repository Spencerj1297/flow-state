"use client";
import Cookies from "js-cookie";
import { Application, Task } from "../../types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { IconSquare, IconSquareCheck } from "@tabler/icons-react";
import { Loader } from "@/app/components/ui/loader";
import { getPriority } from "@/app/lib/utils";

const UserDashboard = () => {
  const [userTasks, setUserTasks] = useState<Task[]>([]);
  const [userApplications, setUserApplications] = useState<Application[]>([]);
  const [applicationCount, setAppicationCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const initialFormData = {
    _id: "",
    user_id: "",
    title: "",
    description: "",
    status: "in progress",
    priority: "low",
  };

  const [formData, setFormData] = useState<Task>(initialFormData);

  const handleMouseEnter = (task: Task) => {
    setFormData({
      ...task,
      status: "complete",
    });
  };

  const handleMouseLeave = () => {
    setFormData(initialFormData);
  };

  const getUserTasks = async () => {
    setLoading(true);
    try {
      const id = {
        user_id: Cookies.get("user"),
      };
      const response = await axios.post("/api/get-tasks", id);
      if (response.status === 200) {
        setUserTasks(response.data);
        setLoading(false);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
        setLoading(false);
      } else {
        console.error("Unknown error has occurred:", error);
        setLoading(false);
      }
    }
  };

  const editTask = async () => {
    try {
      const response = await axios.patch("/api/edit-task", formData);
      if (response.status === 200) {
        getUserTasks();
        setFormData(initialFormData);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Unknown error has occurred:", error);
      }
    }
  };

  const getUserApplications = async () => {
    setLoading(true);
    try {
      const id = {
        user_id: Cookies.get("user"),
      };
      const response = await axios.post("/api/get-applications", id);
      if (response.status === 200) {
        setUserApplications(response.data);
        setAppicationCount(response.data.length);
        setLoading(false);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
        setLoading(false);
      } else {
        console.error("Unknown error has occurred:", error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getUserApplications();
    getUserTasks();
  }, []);
  
  return (
    <>
      <section className="flex flex-col lg:flex-row gap-4 flex px-4 lg:px-32 pt-32 lg:pt-36 lg:pl-48">
        <div className="bg-white w-full lg:w-1/2 h-96 text-center p-8 rounded-lg shadow-custom overflow-hidden overflow-y-scroll hide-scrollbar">
          <h2 className="w-full flex justify-between border-b py-2">
            Task List for: Future Today Date{" "}
            <Link href="/pages/tasks">
              <button className="bg-blue text-white p-2 rounded-full text-xs hover:opacity-80">
                Go to Tasks
              </button>
            </Link>
          </h2>
          <div className="flex flex-col justify-center items-center gap-4 mt-4">
            {loading ? (
              <div className="flex justify-center items-center h-32 w-full">
                <Loader />
              </div>
            ) : (
              userTasks
                .filter((tasks) => tasks.status === "in progress")
                .map((task, ind) => (
                  <div
                    key={ind}
                    className={`w-full flex rounded-lg shadow-outline transition-transform transform hover:scale-102 duration-300 ease-in-out p-4 border-2 ${getPriority(
                      task
                    )}`}
                  >
                    <div className="h-full w-[90%] text-left">
                      <p className="text-sm">{task?.title}</p>
                      <p className="text-xs">{task?.description}</p>
                    </div>
                    <div
                      onMouseEnter={() => handleMouseEnter(task)}
                      onMouseLeave={handleMouseLeave}
                      className="h-12 flex justify-end w-[10%]"
                    >
                      <span
                        onClick={editTask}
                        className="text-grey hover:text-seafoam"
                      >
                        <IconSquareCheck />
                      </span>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
        <div className="bg-white w-full lg:w-1/2 text-center p-8 rounded-lg shadow-custom">
          <h2 className="w-full flex justify-between border-b py-2">
            Job application{" "}
            <Link href="/pages/applications">
              <button className="bg-blue text-white p-2 rounded-full text-xs hover:opacity-80">
                Go to applications
              </button>
            </Link>
          </h2>
          <div className="h-full w-full flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 lg:mt-0">
            <div className="flex flex-col justify-center items-center w-1/2">
              <h3 className="flex flex-col justify-center items-center text-3xl text-blue bg-blue text-white h-44 w-44 xl:h-52 xl:w-52 rounded-xl gap-4">
                Total
                <span className="text-4xl">{applicationCount}</span>
              </h3>
            </div>
            <div className="flex flex-col justify-center items-center w-1/2">
              <h3 className="flex flex-col justify-center items-center text-3xl text-blue bg-blue text-white h-44 w-44 xl:h-52 xl:w-52 rounded-xl gap-4">
                This Week
                <span className="text-4xl">{applicationCount}</span>
              </h3>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col lg:flex-row gap-4 flex px-4 lg:px-32 pt-4 lg:pl-48">
        <div className="bg-white w-full min-h-96 text-center p-8 rounded-lg shadow-custom">
          <h2 className="w-full flex justify-between border-b py-2">
            OTHER{" "}
            <button className="bg-blue text-white p-2 rounded-full text-xs hover:opacity-80">
              Go to other
            </button>
          </h2>
        </div>
      </section>
    </>
  );
};

export default UserDashboard;
