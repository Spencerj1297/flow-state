import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BarGraph(){
const today = new Date();
const currentMonth = today.toLocaleString('default', { month: 'long' });

  const labels = ["week 1", "week 2", "week 3", "week 4"];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "tasks",
        data: [6, 4, 7, 4],
        backgroundColor: "#9fe2bf",
      },
      {
        label: "applications",
        data: [3, 5, 10, 3],
        backgroundColor: "#519ece",
      },
      {
        label: "shorts",
        data: [6, 8, 4, 1],
        backgroundColor: "#F8481c",
      },
    ],
  };

  return <Bar data={data} options={options} />;
};
