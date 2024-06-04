"use client";
import { IconSquareRoundedPlus } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { Modal } from "./ui/modal";
import { Task } from "../types";
import { Input } from "./ui/input";
import { DropDown } from "./ui/DropDown";
import axios from "axios";
import { create } from "domain";

interface Props {
  userTasks: Task[];
  getTask: any;
}

export const NewTask: FC<Props> = ({ userTasks, getTask }) => {
  const [addTaskModal, setAddTaskModal] = useState<boolean>(false);
  const [taskModalOpen, setTaskModalOpen] = useState<boolean>(false);

  const initialFormData = {
    user_id: "",
    title: "",
    description: "",
    status: "new",
  }
  const [formData, setFormData] = useState<Task>(initialFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, status: selectedOption });
  };
  const [selectedOption, setSelectedOption] = useState("new");
  const dropDownOptions = ["new", "in progress", "complete"];

  const createTaskSection = (task: Task) => {
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

  const editTask = async () => {
    try {
      const response = await axios.patch("/api/edit-task", formData);
      if (response.status === 200) {
        getTask();
        setTaskModalOpen(false);
        setFormData(initialFormData)
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Unknown error has occurred:", error);
      }
    }
  };

  const closeAndResetForm = () => {
    setTaskModalOpen(false)
    setAddTaskModal(false)
    setFormData(initialFormData)
  }

  const createTask = async () => {
    try {
      const response = await axios.post("/api/create-task", formData);
      if (response.status === 200) {
        getTask();
        closeAndResetForm()
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Unknown error has occurred:", error);
      }
    }
  };
console.log("f", formData)

useEffect(() => {
    setFormData({ ...formData, status: selectedOption });
  }, [selectedOption]);

  return (
    <>
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
        {userTasks
          .filter((tasks) => tasks.status === "new")
          .map((task, ind) => (
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
                  closeModal={closeAndResetForm}
                //   setOpen={setTaskModalOpen}
                  customSection={editTaskSection(formData)}
                  callBack={editTask}
                  isEdit
                />
              )}
            </>
          ))}
      </div>
      {addTaskModal && (
        <Modal
          modalTitle="Create new Task"
          closeModal={closeAndResetForm}
          customSection={createTaskSection(formData)}
          callBack={createTask}
        />
      )}
    </>
  );
};
