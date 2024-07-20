"use client";
import { FC, useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Task } from "../../types/types";
import { Input } from "../ui/input";
import { DropDown } from "../ui/DropDown";
import axios from "axios";
import { IconSquareCheck } from "@tabler/icons-react";
import { getPriority } from "@/app/lib/utils";

interface Props {
  userTasks: Task[];
  getTask: () => void;
}

export const CurrentTasks: FC<Props> = ({ userTasks, getTask }) => {
  const [taskModalOpen, setTaskModalOpen] = useState<boolean>(false);
  const initialFormData = {
    user_id: "",
    title: "",
    description: "",
    status: "in progress",
    priority: "",
  };

  const [formData, setFormData] = useState<Task>(initialFormData);
  const priorityLevel = ["low", "medium", "high"];
  const [selectedPri, setSelectedPri] = useState(formData.priority);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      status: selectedStatus,
      priority: selectedPri,
    });
  };

  const [selectedStatus, setSelectedStatus] = useState("in progress");
  const dropDownOptions = ["new", "in progress", "complete"];

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

  const closeAndResetForm = () => {
    setTaskModalOpen(false);
    setFormData(initialFormData);
  };

  useEffect(() => {
    setFormData({ ...formData, status: selectedStatus, priority: selectedPri });
  }, [selectedStatus, selectedPri]);

  return (
    <>
      <div className="flex flex-col gap-4 bg-aqua rounded-lg h-[600px] w-full xl:w-1/3 shadow-custom p-4 overflow-hidden overflow-y-scroll hide-scrollbar border border-white">
        <h2 className="flex justify-between border-b-2 py-2">In Progress</h2>
        {userTasks
          .filter((tasks) => tasks.status === "in progress")
          .map((task, ind) => (
            <>
              <button
                key={ind}
                onClick={() => {
                  setTaskModalOpen(!taskModalOpen);
                  setFormData(task);
                }}
                className={`w-full flex flex-col text-left gap-4 rounded-lg shadow-outline transition-transform transform hover:scale-102 duration-300 ease-in-out p-4 bg-white border ${getPriority(
                  task
                )}`}
              >
                <p className="text-sm">{task?.title}</p>
                <p className="text-xs">{task?.description}</p>
              </button>
            </>
          ))}
      </div>
      {taskModalOpen && (
        <Modal
          modalTitle="Edit Task"
          closeModal={closeAndResetForm}
          callBack={editTask}
          isEdit
        >
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
        </Modal>
      )}
    </>
  );
};
