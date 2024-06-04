"use client";
import { Dispatch, FC, SetStateAction } from "react";
import { IconX } from "@tabler/icons-react";

interface Props {
  modalTitle: string;
  modalText?: string;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  closeModal: () => void;
  callBack?: any;
  handleInput?: any;
  customSection?: any;
  isEdit?: boolean;
}

export const Modal: FC<Props> = ({
  modalTitle,
  modalText,
  setOpen,
  closeModal,
  callBack,
  customSection,
  isEdit,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-30 z-10">
      <div className="flex flex-col gap-16 bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h2 className="flex justify-between text-2xl font-bold mb-4">
          {modalTitle}
          <button
            onClick={() => {
              closeModal();
            }}
          >
            <IconX />
          </button>
        </h2>
        {isEdit ? <></> : <p className="mb-4">{modalText}</p>}
        {customSection}
        {isEdit ? (
          <button
            onClick={callBack}
            className="bg-blue p-4 text-md text-white rounded-xl hover:bg-opacity-80 shadow-custom"
          >
            Edit Task
          </button>
        ) : (
          <button 
          onClick={callBack}
          className="bg-blue p-4 text-md text-white rounded-xl hover:bg-opacity-80 shadow-custom">
            Add Task
          </button>
        )}
      </div>
    </div>
  );
};
