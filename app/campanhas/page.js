"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { FiMoreVertical } from "react-icons/fi";
import { Menu, Transition } from '@headlessui/react';
import CampanhaForm from "../components/CampanhaForm";
import SkeletonLoader from "../components/SkeletonLoader";

// Função para formatar as datas no formato dd/mm/aaaa
const formatarData = (data) => {
  const partesData = data.split("-");
  return `${partesData[2]}/${partesData[1]}/${partesData[0]}`;
};

export default function Campanhas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [campanhas, setCampanhas] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCampanha, setSelectedCampanha] = useState(null);
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

  useEffect(() => {
    if (!isLoading && typeof window !== "undefined") {
      localStorage.setItem("campanhas", JSON.stringify(campanhas));
    }
  }, [campanhas, isLoading]);

  // Função de busca
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Campanhas filtradas com base no termo de busca
  const campanhasFiltradas = campanhas.filter((campanha) =>
    campanha.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para abrir o formulário para adicionar campanha
  const handleAddCampanha = () => {
    setSelectedCampanha(null);
    setIsFormOpen(true);
  };

  // Função para salvar a campanha (nova ou editada)
  const handleSaveCampanha = (campanhaData) => {
    if (selectedCampanha) {
      const campanhasAtualizadas = campanhas.map((c) =>
        c.id === selectedCampanha.id ? { ...campanhaData, id: c.id } : c
      );
      setCampanhas(campanhasAtualizadas);
      toast.success("Campanha atualizada com sucesso!", { position: "bottom-right" });
    } else {
      const novaCampanha = { ...campanhaData, id: Date.now().toString() };
      setCampanhas([...campanhas, novaCampanha]);
      toast.success("Campanha adicionada com sucesso!", { position: "bottom-right" });
    }
  };

  // Função para abrir o formulário para editar campanha
  const handleEdit = (campanha) => {
    setSelectedCampanha(campanha);
    setIsFormOpen(true);
  };

  // Função para ativar/inativar campanha
  const handleToggleStatus = (id, status) => {
    const campanhaSelecionada = campanhas.find(c => c.id === id);

    // Não permitir ativar campanhas encerradas ou expiradas
    if (campanhaSelecionada.status === "Encerrada" || campanhaSelecionada.status === "Expirada") {
      toast.warning("Não é possível ativar uma campanha encerrada ou expirada.", { position: "bottom-right" });
      return;
    }

    const novaCampanhas = campanhas.map(c => 
      c.id === id ? { ...c, status: status === "Ativa" ? "Inativa" : "Ativa" } : c
    );
    setCampanhas(novaCampanhas);
    toast.success(`Campanha ${id} ${status === "Ativa" ? "inativada" : "ativada"}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-green-800 mb-6">Campanhas de Marketing</h2>

      {/* Componente de busca e botão adicionar */}
      <div className="mb-6 flex items-center justify-between">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Buscar campanha"
          className="px-4 py-3 border border-gray-300 rounded-md w-1/2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <button
          onClick={handleAddCampanha}
          className="ml-4 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          + Adicionar
        </button>
      </div>

      {/* Listagem de campanhas */}
      {
        isLoading ? (
          <SkeletonLoader />
        ) : (
        <div>
          {campanhasFiltradas.length > 0 ? (
            <ul className="space-y-4">
              {campanhasFiltradas.map((campanha) => (
                <li
                  key={campanha.id}
                  className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div className="flex w-full items-center">
                    <div className="mr-4">
                      <Image
                        src={campanha.imagem}
                        alt={campanha.nome}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-2 md:flex-row w-full justify-between">
                      <h3 className="text-xl md:w-4/12 font-semibold text-green-800">{campanha.nome}</h3>
                      <div className="md:w-4/12">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                            campanha.status === "Ativa"
                              ? "bg-green-100 text-green-800"
                              : campanha.status === "Inativa"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {campanha.status}
                        </span>
                      </div>
                      <div className="md:w-4/12 flex gap-2">
                        <p className="text-sm text-gray-500">
                          <strong className="mr-2">Início:</strong>
                          {formatarData(campanha.dataInicio)}
                        </p>
                        <p className="text-sm text-gray-500">
                          <strong className="mr-2">Fim:</strong>
                          {formatarData(campanha.dataFim)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Botão de ações */}
                  <div className="relative">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex justify-center p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                          <FiMoreVertical className="h-6 w-6 text-gray-600" />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={React.Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => handleEdit(campanha)}
                                  className={`${
                                    active ? "bg-gray-100" : ""
                                  } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                                >
                                  Editar Campanha
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => handleToggleStatus(campanha.id, campanha.status)}
                                  className={`${
                                    active ? "bg-gray-100" : ""
                                  } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                                >
                                  {campanha.status === "Ativa" ? "Inativar" : "Ativar"}
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700 text-center">Nenhuma campanha encontrada.</p>
          )}
        </div>
        )
      }
      

      {/* Componente do formulário deslizante */}
      <CampanhaForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveCampanha}
        campanha={selectedCampanha}
      />
    </div>
  );
}
