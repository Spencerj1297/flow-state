"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { NewTask } from "@/app/components/newTasks";
import { CurrentTask } from "@/app/components/currentTasks";
import { CompleteTask } from "@/app/components/completeTask";

interface Task {
  title: string;
  description: string;
  status: string;
  user_id: string;
}

const Tasks = () => {
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
    <section className="min-h-screen flex flex-col xl:flex-row justify-center items-center gap-4 p-24">
      
      <NewTask userTasks={userTasks} getTask={getUserTasks} />
      <CurrentTask userTasks={userTasks} getTask={getUserTasks}/>
      <CompleteTask userTasks={userTasks} getTask={getUserTasks}/>
    </section>
  );
};

export default Tasks;
