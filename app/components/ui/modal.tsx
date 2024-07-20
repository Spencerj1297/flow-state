"use client";
import { FC } from "react";
import { IconPlus, IconX } from "@tabler/icons-react";
import { Loader } from "./loader";

interface Props {
  modalTitle: string;
  closeModal: () => void;
  callBack?: any;
  secondaryCallBack?: any;
  isEdit?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export const Modal: FC<Props> = ({
  modalTitle,
  closeModal,
  callBack,
  secondaryCallBack,
  isEdit,
  loading,
  children
}) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-30">
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
        {children}
        {isEdit ? (
          <div className="flex justify-center items-center gap-4">
            {loading ? (
              <Loader />
            ) : (
              <>
                <button
                  onClick={callBack}
                  className="bg-blue px-4 py-2 text-md text-white rounded-xl hover:bg-opacity-80 shadow-custom"
                >
                  Save Task
                </button>
                <button
                  onClick={secondaryCallBack}
                  className=" p-1 text-md text-red hover:bg-opacity-80 hover:underline underline-offset"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <button
            onClick={callBack}
            className="flex justify-center items-center bg-blue px-4 py-2 text-md text-white rounded-xl hover:bg-opacity-80 shadow-custom"
          >
            <IconPlus /> Add
          </button>
        )}
      </div>
    </div>
  );
};
