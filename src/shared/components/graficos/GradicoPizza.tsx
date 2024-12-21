import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar os componentes necessários
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Venda", "Blue", "Yellow", "Compra", "Purple", "Orange"],
  datasets: [
    {
      label: "Dataset 1",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 206, 86)",
        "rgb(75, 192, 192)",
        "rgb(153, 102, 255)",
        "rgb(255, 159, 64)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function GraficoPizza() {
  return (
    <div style={{ width: "100%", height: "350px", margin: "0 auto", padding: "5px" }}>
      <Pie
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const value = tooltipItem.raw as number;
                  return `Valor: ${value}`;
                },
              },
            },
          },
          maintainAspectRatio: false, // Permite ajustar o tamanho com base no contêiner
        }}
      />
    </div>
  );
}
