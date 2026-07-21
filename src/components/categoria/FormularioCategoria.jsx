import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { cadastrarCategoria } from "../../services/services";
import Button from "../ui/Button";
import { ToastAlerta } from "../../utils/ToastAlert";

export default function FormularioCategoria() {
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState({
    nome: "",
    descricao: "",
    dataValidade: "",
    setor: "",
    responsavel: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  function atualizarEstado(e) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  async function cadastrar(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await cadastrarCategoria("/categorias", categoria);
      ToastAlerta("Categoria cadastrada com sucesso", "sucesso");
      navigate("/categorias");
    } catch {
      ToastAlerta("Erro ao cadastrar categoria", "erro");
    }

    setIsLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <form
        onSubmit={cadastrar}
        className="w-full max-w-2xl rounded-2xl border border-gray-100 bg-white p-8 shadow-lg"
      >
        <h2 className="mb-8 text-center text-3xl font-bold text-red-600">
          Nova Categoria
        </h2>

        <div className="space-y-5">
          <div>
            <label htmlFor="nome" className="mb-2 block font-medium text-gray-700">
              Nome
            </label>
            <input
              id="nome"
              type="text"
              name="nome"
              value={categoria.nome}
              onChange={atualizarEstado}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label htmlFor="descricao" className="mb-2 block font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              id="descricao"
              name="descricao"
              value={categoria.descricao}
              onChange={atualizarEstado}
              rows="4"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label htmlFor="dataValidade" className="mb-2 block font-medium text-gray-700">
              Data de Validade
            </label>
            <input
              id="dataValidade"
              type="date"
              name="dataValidade"
              value={categoria.dataValidade}
              onChange={atualizarEstado}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label htmlFor="setor" className="mb-2 block font-medium text-gray-700">
              Setor
            </label>
            <input
              id="setor"
              type="text"
              name="setor"
              value={categoria.setor}
              onChange={atualizarEstado}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label htmlFor="responsavel" className="mb-2 block font-medium text-gray-700">
              Responsável
            </label>
            <input
              id="responsavel"
              type="text"
              name="responsavel"
              value={categoria.responsavel}
              onChange={atualizarEstado}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <Button type="submit" isLoading={isLoading}>
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
}
