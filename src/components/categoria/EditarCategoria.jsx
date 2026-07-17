import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { buscar, atualizarCategoria } from "../../services/services";
import Button from "../ui/Button";
import { ToastAlerta } from "../../utils/ToastAlert";

export default function EditarCategoria() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categoria, setCategoria] = useState({
    nome: "",
    descricao: "",
    dataValidade: "",
    setor: "",
    responsavel: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      buscar(`/categorias/${id}`, setCategoria).catch(() =>
        ToastAlerta("Erro ao buscar categoria", "erro"),
      );
    }
  }, [id]);

  function atualizarEstado(e) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  async function handleEditar(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await atualizarCategoria(`/categorias/${id}`, categoria);
      ToastAlerta("Categoria editada com sucesso", "sucesso");
      navigate("/categorias");
    } catch {
      ToastAlerta("Erro ao editar categoria", "erro");
    }

    setIsLoading(false);
  }

  const campos = [
    { label: "Nome", name: "nome", type: "text" },
    { label: "Descrição", name: "descricao", type: "text" },
    { label: "Data de Validade", name: "dataValidade", type: "date" },
    { label: "Setor", name: "setor", type: "text" },
    { label: "Responsável", name: "responsavel", type: "text" },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <form
        onSubmit={handleEditar}
        className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-lg"
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Editar Categoria</h1>
          <p className="mt-1 text-sm text-gray-500">
            Atualize as informações da categoria abaixo
          </p>
        </div>

        <div className="space-y-5">
          {campos.map(({ label, name, type }) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                {label}
              </label>
              <input
                id={name}
                type={type}
                name={name}
                value={categoria[name]}
                onChange={atualizarEstado}
                required
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900
                  placeholder:text-gray-400
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
                  transition-colors"
              />
            </div>
          ))}
        </div>

        <Button type="submit" isLoading={isLoading} className="mt-8">
          Salvar alterações
        </Button>
      </form>
    </div>
  );
}
