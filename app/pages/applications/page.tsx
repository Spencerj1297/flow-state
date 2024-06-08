"use client";
import { Application } from "@/app/types";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import { Modal } from "@/app/components/ui/modal";
import { Loader } from "@/app/components/ui/loader";
import { Input } from "@/app/components/ui/input";

const Applications = () => {
  const [userApplications, setUserApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const initialFormData = {
    company: "",
    response: "",
    applied_via: "",
    email: "",
    connection: "",
    notes: "",
    user_id: "",
  };
  const [formData, setFormData] = useState<Application>(initialFormData);
  const [applicationCount, setAppicationCount] = useState<number>(0);

  const getUserApplications = async () => {
    setLoading(true);
    try {
      const id = {
        user_id: Cookies.get("user"),
      };
      const response = await axios.post("/api/get-applications", id);
      if (response.status === 200) {
        setUserApplications(response.data);
        setAppicationCount(response.data.length);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const closeAndResetForm = () => {
    setOpenCreate(false);
    setFormData(initialFormData);
  };

  const createApplication = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/create-application", formData);
      if (response.status === 200) {
        getUserApplications();
        closeAndResetForm();
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

  const createApplicationSection = (app: Application) => {
    const inputFeilds = [{}];

    return (
      <div className="flex flex-col gap-4">
        <div>
          <Input
            name="company"
            placeHolder="Enter company name"
            value={formData.company}
            handleChange={handleInputChange}
            type="text"
            label="Title"
          />
        </div>
        <div>
          <Input
            name="response"
            placeHolder="Enter Response"
            value={formData.response}
            handleChange={handleInputChange}
            type="text"
            label="Response"
          />
        </div>
        <div>
          <Input
            name="applied_via"
            placeHolder="Enter how you applied"
            value={formData.applied_via}
            handleChange={handleInputChange}
            type="text"
            label="Applied Via"
          />
        </div>
        <div>
          <Input
            name="email"
            placeHolder="Enter application email used"
            value={formData.email}
            handleChange={handleInputChange}
            type="text"
            label="Application Email"
          />
        </div>
        <div>
          <Input
            name="connection"
            placeHolder="Enter connection to company"
            value={formData.connection}
            handleChange={handleInputChange}
            type="text"
            label="Company Connection"
          />
        </div>
        <div>
          <Input
            name="notes"
            placeHolder="Notes"
            value={formData.notes}
            handleChange={handleInputChange}
            type="text"
            label="Notes"
          />
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="w-1/2">
            {/* <DropDown
              label="Priority"
              options={priorityLevel}
              selectedOption={selectedPri}
              setSelectedOption={setSelectedPri}
            /> */}
          </div>
        </div>
      </div>
    );
  };

  console.log("form", formData);

  useEffect(() => {
    getUserApplications();
  }, []);

  return (
    <>
      <section className="min-h-screen py-44 px-64 ">
        {loading ? (
          <div className="flex h-96 justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            <div>
              <div>
                <h2 className="flex justify-between text-blue text-3xl">
                  Total Applications: {applicationCount}
                  <button
                    onClick={() => setOpenCreate(true)}
                    className="flex justify-center items-center gap-1 bg-blue text-white px-4 py-2 rounded-full text-xs hover:opacity-80 shadow-outline"
                  >
                    <IconPlus />
                    Application
                  </button>
                </h2>
              </div>
              <div className="flex justify-center items-center p-8">
                <div className="w-1/4">
                  <p>Company</p>
                </div>
                <div className="w-1/4">
                  <p>Response</p>
                </div>
                <div className="w-1/4">
                  <p>Applied Via</p>
                </div>
                <div className="w-1/4">
                  <p>Company Connection</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {userApplications.map((app, ind) => (
                <div
                  key={ind}
                  className="flex bg-white hover:bg-seafoam hover:opacity-50 rounded-lg p-8 shadow-outline hover:cursor-pointer"
                >
                  <div className="w-1/4 ">
                    <p>{app.company}</p>
                  </div>
                  <div className="w-1/4">
                    <p>{app.response}</p>
                  </div>
                  <div className="w-1/4">
                    <p>{app.email}</p>
                  </div>
                  <div className="w-1/4">
                    <p>{app.connection}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {openCreate && (
        <Modal
          modalTitle="Add Application"
          closeModal={closeAndResetForm}
          customSection={createApplicationSection(formData)}
          callBack={createApplication}
        />
      )}
    </>
  );
};

export default Applications;
