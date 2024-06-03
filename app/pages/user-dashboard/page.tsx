"use client";

import Link from "next/link";


const UserDashboard = () => {
  return (
    <>
      <section className="flex gap-4 flex px-32 pt-32">
        <h1 className="absolute top-44 left-32 text-blue">
          Good Morning, Future Name
        </h1>
        <div className="bg-white w-1/2 h-96 text-center p-8 rounded-xl shadow-custom">
          <h2 className="w-full flex justify-between">
            Task List for: Future Today Date{" "}
            <Link href='/pages/tasks'>
            <button className="bg-blue text-white p-2 rounded-xl text-xs">
              Go to Tasks
            </button>
            </Link>
          </h2>
        </div>
        <div className="bg-white w-1/2 h-96 text-center p-8 rounded-xl shadow-custom">
        <h2 className="w-full flex justify-between">
            Job application{" "}
            <button className="bg-blue text-white p-2 rounded-xl text-xs">
              Go to applications
            </button>
          </h2>
        </div>
      </section>
      <section className="flex gap-4 flex px-32 mt-4 pb-32">
        <div className="bg-white w-full min-h-96 text-center p-8 rounded-xl shadow-custom">
        <h2 className="w-full flex justify-between">
            OTHER{" "}
            <button className="bg-blue text-white p-2 rounded-xl text-xs">
              Go to other
            </button>
          </h2>
        </div>
      </section>
    </>
  );
};

export default UserDashboard;
