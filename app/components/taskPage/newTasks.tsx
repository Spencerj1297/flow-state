"use client";
import { IconSquareRoundedPlus } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Task } from "@/app/types";
import { Input } from "../ui/input";
import { DropDown } from "../ui/DropDown";
import axios from "axios";
import { getPriority } from "@/app/lib/utils";

interface Props {
  userTasks: Task[];
  getTask: any;
}

export const NewTask: FC<Props> = ({ userTasks, getTask }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [addTaskModal, setAddTaskModal] = useState<boolean>(false);
  const [taskModalOpen, setTaskModalOpen] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatue] = useState("new");
  const [selectedPri, setSelectedPri] = useState("medium");
  const dropDownOptions = ["new", "in progress", "complete"];
  const priorityLevel = ["low", "medium", "high"];
  const initialFormData = {
    user_id: "",
    title: "",
    description: "",
    status: "new",
    priority: "low",
  };
  const [formData, setFormData] = useState<Task>(initialFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      status: selectedStatus,
      priority: selectedPri,
    });
  };

  const createTaskSection = (task: Task) => {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <Input
            name="title"
            placeHolder="Enter task title"
            value={formData.title}
            handleChange={handleInputChange}
            type="text"
            label="Task Title"
          />
        </div>
        <div>
          <Input
            name="description"
            placeHolder="Enter task description"
            value={formData.description}
            handleChange={handleInputChange}
            type="text"
            label="Task"
          />
        </div>
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
              setSelectedOption={setSelectedStatue}
            />
          </div>
        </div>
      </div>
    );
  };

  const editTaskSection = (task: Task) => {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <Input
            name="title"
            placeHolder="Enter task title"
            value={formData.title}
            handleChange={handleInputChange}
            type="text"
            label="Task Title"
          />
        </div>
        <div>
          <Input
            name="description"
            placeHolder="Enter task description"
            value={formData.description}
            handleChange={handleInputChange}
            type="text"
            label="Task"
          />
        </div>
        <div>
          <DropDown
            label="Status"
            options={dropDownOptions}
            selectedOption={selectedStatus}
            setSelectedOption={setSelectedStatue}
          />
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

  const closeAndResetForm = () => {
    setTaskModalOpen(false);
    setAddTaskModal(false);
    setFormData(initialFormData);
  };

  const createTask = async () => {
    setLoading(true)
    try {
      const response = await axios.post("/api/create-task", formData);
      if (response.status === 200) {
        getTask();
        closeAndResetForm();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Unknown error has occurred:", error);
      }
    }
  };

  useEffect(() => {
    setFormData({ ...formData, status: selectedStatus, priority: selectedPri });
  }, [selectedStatus]);

  console.log("from", formData);

  return (
    <>
      <div className="flex flex-col gap-4 bg-grey rounded-lg h-[600px] w-full xl:w-1/3 shadow-custom p-4 overflow-hidden overflow-y-scroll hide-scrollbar border border-white">
        <h2 className="flex justify-between border-b-2 py-2">
          Tasks
          <button
            onClick={() => setAddTaskModal(!addTaskModal)}
            className="transition-transform transform hover:text-seafoam hover:scale-105 duration-300 ease-in-out"
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
          customSection={editTaskSection(formData)}
          callBack={editTask}
          isEdit
        />
      )}
      {addTaskModal && (
        <Modal
          modalTitle="Create new Task"
          closeModal={closeAndResetForm}
          customSection={createTaskSection(formData)}
          loading={loading}
          callBack={createTask}
        />
      )}
    </>
  );
};
