import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { buscar, deletarCategoria } from "../../services/services";
import Button from "../ui/Button";
import { ToastAlerta } from "../../utils/ToastAlert";

export default function DeletarCategoria() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categoria, setCategoria] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      buscar(`/categorias/${id}`, setCategoria).catch(() =>
        ToastAlerta("Erro ao buscar categoria", "erro"),
      );
    }
  }, [id]);

  async function handleDelete() {
    setIsLoading(true);

    try {
      await deletarCategoria(Number(id));
      ToastAlerta("Categoria deletada com sucesso", "sucesso");
      navigate("/categorias");
    } catch {
      ToastAlerta("Erro ao deletar categoria", "erro");
    }

    setIsLoading(false);
  }

  return (
    <div className="mx-auto mt-20 max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
        Deletar Categoria
      </h1>

      <p className="mb-4 text-center text-gray-600">
        Tem certeza que deseja apagar a categoria abaixo?
      </p>

      <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {categoria.nome}
        </h3>
        <p className="text-gray-600">{categoria.descricao}</p>
      </div>

      <div className="flex gap-4">
        <Button
          variante="secundario"
          onClick={() => navigate("/categorias")}
        >
          Não
        </Button>

        <Button variante="perigo" onClick={handleDelete} isLoading={isLoading}>
          Sim, deletar
        </Button>
      </div>
    </div>
  );
}
