"use client";
import { FC, useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Task } from "../../types/types"
import { Input } from "../ui/input";
import { DropDown } from "../ui/DropDown";
import axios from "axios";
import { IconSquare, IconTrash } from "@tabler/icons-react";
import { getPriority } from "@/app/lib/utils";

interface Props {
  userTasks: Task[];
  getTask: () => void;
}

export const CompleteTasks: FC<Props> = ({ userTasks, getTask }) => {
  const [taskModalOpen, setTaskModalOpen] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState("complete");
  const dropDownOptions = ["new", "in progress", "complete"];
  const [activeDelete, setActiveDelete] = useState<boolean>(false);
  const [arrDeletedTask, setArrDeletedTask] = useState<Task[]>([]);
  const priorityLevel = ["low", "medium", "high"];
  const [selectedPri, setSelectedPri] = useState("medium");

  const initialFormData = {
    user_id: "",
    title: "",
    description: "",
    status: "complete",
    priority: "",
  };

  const [formData, setFormData] = useState<Task>(initialFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, status: selectedStatus, priority: selectedPri });
  };
  console.log(formData);
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
        <div className="w-full flex justify-between items-center">
          <div className="w-1/2">
            <DropDown
              label="Priority"
              options={priorityLevel}
              selectedOption={selectedPri}
              setSelectedOption={setSelectedPri}
            />
          </div>
          <div className="w-1/2 text-left">
            <DropDown
              label="Status"
              options={dropDownOptions}
              selectedOption={selectedStatus}
              setSelectedOption={setSelectedStatus}
            />
          </div>
        </div>
      </div>
    );
  };

  const editTask = async () => {
    try {
      const response = await axios.patch("/api/edit-task", formData);
      if (response.status === 200) {
        getTask();
        setTaskModalOpen(false);
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

  const deleteTask = async () => {
    if (formData.title !== "") {
      arrDeletedTask.push(formData);
    }
    if (arrDeletedTask.length > 0) {
      try {
        const response = await axios.post("/api/delete-task", arrDeletedTask);
        if (response.status === 200) {
          getTask();
          setTaskModalOpen(false);
          setFormData(initialFormData);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error:", error.message);
        } else {
          console.error("Unknown error has occurred:", error);
        }
      }
    }
  };

  const closeAndResetForm = () => {
    setTaskModalOpen(false);
    setFormData(initialFormData);
  };

  const addToDelete = (task: Task) => {
    if (!arrDeletedTask.some((t) => t.title === task.title)) {
      arrDeletedTask.push(task);
    }
    console.log("arr", arrDeletedTask);
  };

  useEffect(() => {
    setFormData({ ...formData, status: selectedStatus, priority: selectedPri });
  }, [selectedStatus, selectedPri]);

  return (
    <>
      <div className="flex flex-col gap-4 bg-seafoam rounded-lg h-[600px] w-full xl:w-1/3 shadow-custom p-4 overflow-hidden overflow-y-scroll hide-scrollbar border border-white">
        <div className="flex justify-between border-b-2 py-2">
          <h2>Complete</h2>
          <div
            onClick={() => setActiveDelete(!activeDelete)}
            className=" transition-transform transform hover:scale-102 duration-300 ease-in-out hover:cursor-pointer"
          >
            {activeDelete ? (
              <button
                onClick={deleteTask}
                className="bg-red text-white rounded-lg px-4 py-2"
              >
                delete
              </button>
            ) : (
              <IconTrash />
            )}
          </div>
        </div>

        {userTasks
          .filter((tasks) => tasks.status === "complete")
          .map((task, ind) => (
            <>
              <div
                key={ind}
                onClick={() => {
                  setTaskModalOpen(!taskModalOpen);
                  setFormData(task);
                }}
                className={`${
                  activeDelete ? "opacity-100" : "opacity-55"
                } hover:opacity-100 w-full flex flex-col text-left gap-4 rounded-lg shadow-outline transition-transform transform hover:scale-102 duration-300 ease-in-out p-4 bg-white border ${getPriority(
                  task
                )}`}
              >
                <p className="text-sm">{task?.title}</p>
                <p className="text-xs">{task?.description}</p>
                <button
                  disabled={!activeDelete}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToDelete(task);
                  }}
                  className={`absolute top-4 right-4 text-grey ${
                    activeDelete ? "hover:text-red" : ""
                  }`}
                >
                  <IconSquare />
                </button>
              </div>
            </>
          ))}
      </div>
      {taskModalOpen && (
        <Modal
          modalTitle="Edit Task"
          closeModal={closeAndResetForm}
          customSection={editTaskSection(formData)}
          callBack={editTask}
          secondaryCallBack={deleteTask}
          isEdit
        />
      )}
    </>
  );
};
