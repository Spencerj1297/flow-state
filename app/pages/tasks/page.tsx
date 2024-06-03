"use client";
import { useEffect, useState } from "react";
import { Modal } from "../../components/ui/modal";
import axios from "axios";
import Cookies from "js-cookie";
import { IconSquareRoundedPlus } from "@tabler/icons-react";
import { Input } from "../../components/ui/input";
import { DropDown } from "@/app/components/ui/DropDown";

interface Task {
  title: string;
  description: string;
  status: string;
  user_id: string;
}

const Tasks = () => {
  const [taskModalOpen, setTaskModalOpen] = useState<boolean>(false);
  const [addTaskModal, setAddTaskModal] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState("Select an option");
  const dropDownOptions = ["new", "in progress", "complete"];
  const [userTasks, setUserTasks] = useState<Task[]>([]);
  const [formData, setFormData] = useState<Task>({
    user_id: "",
    title: "",
    description: "",
    status: "",
  });

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

  const addTask = () => {
    // Implement the addTask logic here
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log("selected option", selectedOption);

  const editTaskSection = (task: Task) => {
    return (
      <div className="flex flex-col gap-4">
        <Input
          name="title"
          placeHolder="Enter task title"
          value={formData.title}
          handleChange={handleInputChange}
          type="text"
          label="Task Title"
        />
        <Input
          name="description"
          placeHolder="Enter task description"
          value={formData.description}
          handleChange={handleInputChange}
          type="text"
          label="Task"
        />
        <label>Status</label>
        <DropDown
          options={dropDownOptions}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </div>
    );
  };

  useEffect(() => {
    getUserTasks();
  }, []);

  return (
    <section className="min-h-screen flex flex-col xl:flex-row justify-center gap-4 p-24">
      <div className="flex flex-col gap-4 bg-grey rounded-xl h-[600px] w-full xl:w-1/3 shadow-custom p-4">
        <h2 className="flex justify-between">
          Tasks
          <button
            onClick={() => setAddTaskModal(!addTaskModal)}
            className="transition-transform transform hover:text-blue hover:scale-105 duration-300 ease-in-out"
          >
            <IconSquareRoundedPlus />
          </button>
        </h2>
        {userTasks.map((task, ind) => (
          <>
            <button
              key={ind}
              onClick={() => {
                setTaskModalOpen(!taskModalOpen);
                setFormData(task); 
              }}
              className="w-full flex flex-col text-left gap-4 rounded-xl shadow-outline transition-transform transform hover:scale-102 duration-300 ease-in-out p-4 bg-white"
            >
              <p className="text-sm">{task?.title}</p>
              <p className="text-xs">{task?.description}</p>
            </button>

            {taskModalOpen && (
              <Modal
                modalTitle="Edit Task"
                modalText={task?.description}
                setOpen={setTaskModalOpen}
                customSection={editTaskSection(formData)}
                callBack={addTask}
                isEdit
              />
            )}
          </>
        ))}
      </div>
      <div className="flex flex-col gap-4 p-4 rounded-xl h-[600px] w-full xl:w-1/3 shadow-custom bg-lightBlue">
        <h2>In Progress</h2>
        {userTasks.map((task, ind) => (
          <>
            <button
              key={ind}
              onClick={() => {
                setTaskModalOpen(!taskModalOpen);
                setFormData(task); 
              }}
              className="w-full flex flex-col text-left gap-4 rounded-xl shadow-outline transition-transform transform hover:scale-102 duration-300 ease-in-out p-4 bg-white"
            >
              <p className="text-sm">{task?.title}</p>
              <p className="text-xs">{task?.description}</p>
            </button>

            {taskModalOpen && (
              <Modal
                modalTitle="Edit Task"
                modalText={task?.description}
                setOpen={setTaskModalOpen}
                customSection={editTaskSection(formData)}
                callBack={addTask}
                isEdit
              />
            )}
          </>
        ))}
      </div>
      <div className="flex flex-col gap-4 p-4 rounded-xl h-[600px] w-full xl:w-1/3 shadow-custom bg-seafoam">
        <h2>Complete</h2>
        {userTasks.map((task, ind) => (
          <>
            <button
              key={ind}
              onClick={() => {
                setTaskModalOpen(!taskModalOpen);
                setFormData(task); 
              }}
              className="w-full flex flex-col text-left gap-4 rounded-xl shadow-outline transition-transform transform hover:scale-102 duration-300 ease-in-out p-4 bg-white"
            >
              <p className="text-sm">{task?.title}</p>
              <p className="text-xs">{task?.description}</p>
            </button>

            {taskModalOpen && (
              <Modal
                modalTitle="Edit Task"
                modalText={task?.description}
                setOpen={setTaskModalOpen}
                customSection={editTaskSection(formData)}
                callBack={addTask}
                isEdit
              />
            )}
          </>
        ))}
      </div>
    </section>
  );
};

export default Tasks;
