import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart(){
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top" as const,
          },
        },
      };
    
  const data = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        label: "solved on leetcode",
        data: [50,5,1],
        backgroundColor: [
          "#9fe2bf",
          "#519ece",
          "#F8481c",
        ],
        borderColor: [
          "#9fe2bf",
          "#519ece",
          "#F8481c",
        ],
        borderWidth: 2,
      },
    ],
  };

  return <Doughnut data={data} options={options}/>;
};
