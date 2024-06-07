"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { NewTask } from "@/app/components/newTasks";
import { CurrentTask } from "@/app/components/currentTasks";
import { CompleteTask } from "@/app/components/completeTask";
import { Loader } from "@/app/components/ui/loader";
import { Task } from "@/app/types";

const Tasks = () => {
  const [userTasks, setUserTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

  console.log("tasks", userTasks);

  useEffect(() => {
    getUserTasks();
  }, []);

  return (
    <section className="min-h-screen flex flex-col xl:flex-row justify-center items-center gap-4 p-4 pt-32 lg:p-24 lg:pt-32 lg:pl-48">
      {loading ? (
        <Loader />
      ) : (
        <>
          <NewTask userTasks={userTasks} getTask={getUserTasks} />
          <CurrentTask userTasks={userTasks} getTask={getUserTasks} />
          <CompleteTask userTasks={userTasks} getTask={getUserTasks} />
        </>
      )}
    </section>
  );
};

export default Tasks;
