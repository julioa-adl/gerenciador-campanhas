"use client";
import { Bar, Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard() {
  const [campanhas, setCampanhas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        const storedCampanhas = localStorage.getItem("campanhas");
        if (storedCampanhas) {
          setCampanhas(JSON.parse(storedCampanhas));
        } else {
          setCampanhas([]);
        }
        setIsLoading(false);
      }, 3000);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center bg-gray-50 min-h-screen">
        <ReloadIcon className="animate-spin h-10 w-10 text-green-600" />
      </div>
    );
  }

  const campanhasAtivas = campanhas.filter((campanha) => campanha.status === "Ativa").length;
  const campanhasEncerradas = campanhas.filter((campanha) => campanha.status === "Encerrada").length;

  const barData = {
    labels: ["Campanhas Ativas", "Campanhas Encerradas"],
    datasets: [
      {
        label: "Quantidade",
        data: [campanhasAtivas, campanhasEncerradas],
        backgroundColor: ["#34D399", "#EF4444"],
        borderColor: ["#34D399", "#EF4444"],
        borderWidth: 1,
      },
    ],
  };

  // Configurar os dados do gráfico de pizza
  const pieData = {
    labels: campanhas.map((campanha) => campanha.nome),
    datasets: [
      {
        label: "Campanhas",
        data: campanhas.map((campanha) => new Date(campanha.dataFim) - new Date(campanha.dataInicio)), // Duração das campanhas
        backgroundColor: ["#60A5FA", "#FBBF24", "#34D399", "#EF4444"],
        hoverOffset: 4,
      },
    ],
  };

  // Total de campanhas
  const totalCampanhas = campanhas.length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-green-800 mb-6">Dashboard de Campanhas</h2>

      <div className="bg-white p-4 mb-4 rounded-lg shadow-md text-center">
        <h3 className="text-xl text-gray-700 font-semibold mb-4">Total de Campanhas</h3>
        <p className="text-4xl font-bold text-green-600">{totalCampanhas}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gráfico de Barras */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl text-gray-700 font-semibold mb-4">Status das Campanhas</h3>
          <Bar data={barData} />
        </div>

        {/* Gráfico de Pizza */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl text-gray-700 font-semibold mb-4">Duração das Campanhas</h3>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
}
