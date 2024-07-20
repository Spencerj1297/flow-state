import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineChart(){
  const labels = [
    "Jan",
    "Fe",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Productivity (%)",
        data: [60, 20, 90, 20, 95, 40, 60, 10, 80, 90, 90, 95],
        borderColor: "rgb(81, 158, 206)",
        backgroundColor: "rgb(81, 158, 206, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};
