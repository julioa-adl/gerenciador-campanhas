"use client";
import { useState, useEffect } from "react";

export default function CampanhaForm({ isOpen, onClose, onSave, campanha }) {
  const [formData, setFormData] = useState({
    nome: "",
    dataInicio: "",
    dataFim: "",
    status: "Ativa",
    descricao: "",
    imagem: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (campanha) {
      setFormData(campanha);
    } else {
      setFormData({
        nome: "",
        dataInicio: "",
        dataFim: "",
        status: "Ativa",
        descricao: "",
        imagem: "",
      });
    }
    setErrors({});
  }, [campanha]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const newErrors = {};

    const today = new Date();
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);

    const dataInicio = new Date(formData.dataInicio);
    const dataFim = new Date(formData.dataFim);

    // Validação para nome
    if (!formData.nome.trim()) {
      newErrors.nome = "O nome da campanha é obrigatório.";
    }

    // Validação para dataInicio
    if (!formData.dataInicio) {
      newErrors.dataInicio = "Data de início é obrigatória.";
    } else if (dataInicio < todayMidnight) {
      newErrors.dataInicio = "Data de início não pode ser anterior à data atual.";
    }

    // Validação para dataFim
    if (!formData.dataFim) {
      newErrors.dataFim = "Data de fim é obrigatória.";
    } else if (dataFim <= dataInicio) {
      newErrors.dataFim = "Data de fim deve ser maior que a data de início.";
    }

    // Atualiza status para "Expirada" se dataFim for anterior à data atual
    if (formData.dataFim && dataFim < todayMidnight) {
      formData.status = "Expirada";
    }

    // Verifica se há erros
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      setErrors({});
      onSave(formData);
      onClose();
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="p-6 overflow-y-auto h-full">
        <h2 className="text-2xl text-gray-700 font-bold mb-4">
          {campanha ? "Editar Campanha" : "Nova Campanha"}
        </h2>
        <div className="space-y-4">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="mt-1 text-gray-700 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
          </div>

          {/* Data Início */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Data Início</label>
            <input
              type="date"
              name="dataInicio"
              value={formData.dataInicio}
              onChange={handleChange}
              className="mt-1 text-gray-700 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.dataInicio && <p className="text-red-500 text-sm mt-1">{errors.dataInicio}</p>}
          </div>

          {/* Data Fim */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Data Fim</label>
            <input
              type="date"
              name="dataFim"
              value={formData.dataFim}
              onChange={handleChange}
              className="mt-1 text-gray-700 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.dataFim && <p className="text-red-500 text-sm mt-1">{errors.dataFim}</p>}
          </div>

          {/* Status */}
          {formData.status === "Expirada" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                readOnly
                disabled
                className="mt-1 text-gray-700 bg-gray-100 block w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 text-gray-700 block w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="Ativa">Ativa</option>
                <option value="Inativa">Inativa</option>
                <option value="Encerrada">Encerrada</option>
              </select>
            </div>
          )}

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              className="mt-1 text-gray-700 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Imagem */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Imagem (URL)</label>
            <input
              type="text"
              name="imagem"
              value={formData.imagem}
              onChange={handleChange}
              className="mt-1 text-gray-700 block w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
