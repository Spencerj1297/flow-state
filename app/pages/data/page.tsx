"use client";
import { BarGraph } from "@/app/components/ui/barGraph";
import { PieChart } from "@/app/components/ui/pieChart";
import { LineChart } from "@/app/components/ui/lineChart";
import { IconReportAnalytics } from "@tabler/icons-react";

const Data = () => {
  let styles = "text-2xl lg:text-3xl text-center";
  const getProdScore = () => {
    if (2 === 2) {
      return (
        <p className={`${styles} text-blue`}>
          Your overall score is up __% this month
        </p>
      );
    } else {
      return (
        <p className={`${styles} text-red`}>
          Your overall score is down __% this month
        </p>
      );
    }
  };

  return (
    <section className="min-h-screen flex flex-col gap-4 flex px-4 lg:px-32 pt-32 lg:pt-36 lg:pl-48">
      <h1 className="flex gap-2 text-4xl lg:text-8xl text-blue mb-8">Analytics <IconReportAnalytics size={48}/></h1>
      <div className="flex flex-col lg:flex-row gap-4 w-full min-h-96">
        <div className="flex flex-col justify-between items-center lg:w-3/6 bg-white rounded-xl shadow-custom p-2 lg:p-8 gap-4">
          <h2 className="w-full text-start">LeetCode questions solved</h2>
          <div className="max-h-[400px]">
            <PieChart />
          </div>
        </div>
        <div className="flex flex-col justify-between items-center lg:w-3/6 bg-white rounded-xl shadow-custom p-2 lg:p-8 gap-4">
          <h2 className="w-full text-start">Task, Applcation, Shorts</h2>
          <BarGraph />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 w-full min-h-96 mb-16">
        <div className="flex flex-col justify-between items-center lg:w-4/6 bg-white rounded-xl shadow-custom p-2 lg:p-8 gap-4">
          <h2 className="w-full text-start">Overall Productivity</h2>
          <LineChart />
        </div>
        <div className="flex justify-center items-center lg:w-2/6 bg-white bg-opacity-70 rounded-xl shadow-custom p-2 py-4 lg:p-8">
          {getProdScore()}
        </div>
      </div>
    </section>
  );
};

export default Data;
