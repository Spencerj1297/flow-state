"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { NewTask } from "@/app/components/taskPage/newTasks";
import { CurrentTasks } from "@/app/components/taskPage/currentTasks";
import { CompleteTasks } from "@/app/components/taskPage/completeTasks";

import { Loader } from "@/app/components/ui/loader";
import { Task } from "../../types/types";
import { IconListCheck } from "@tabler/icons-react";

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

  useEffect(() => {
    getUserTasks();
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center gap-4 p-4 pt-32 lg:p-24 lg:pt-32 lg:pl-48">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="flex gap-2 text-8xl text-blue mb-8 w-full">
            Tasks <IconListCheck size={48} />
          </h1>
          <div className="flex flex-col xl:flex-row w-full gap-4">
            <NewTask userTasks={userTasks} getTask={getUserTasks} />
            <CurrentTasks userTasks={userTasks} getTask={getUserTasks} />
            <CompleteTasks userTasks={userTasks} getTask={getUserTasks} />
          </div>
        </>
      )}
    </section>
  );
};

export default Tasks;
