import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { buscar, deletarCategoria } from "../../services/services";
import Button from "../ui/Button";
import { ToastAlerta } from "../../utils/ToastAlert";

export default function DeletarCategoria() {
  // Hook utilizado para navegar entre as páginas
  const navigate = useNavigate();

  // Obtém o id da categoria pela URL
  const { id } = useParams();

  // Armazena os dados da categoria que será exibida
  const [categoria, setCategoria] = useState({});

  // Controla o estado de carregamento do botão
  const [isLoading, setIsLoading] = useState(false);

  // Executa quando o componente é carregado
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
      // Envia a requisição DELETE para a API
      await deletarCategoria(Number(id));

      ToastAlerta("Categoria deletada com sucesso", "sucesso");

      // Redireciona para a listagem de categorias
      navigate("/categorias");
    } catch {
      ToastAlerta("Erro ao deletar categoria", "erro");
    }

    // Finaliza o loading
    setIsLoading(false);
  }

  return (
    <div className="mx-auto mt-20 max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
      {/* Título da página */}
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
        Deletar Categoria
      </h1>

      {/* Mensagem de confirmação */}
      <p className="mb-4 text-center text-gray-600">
        Tem certeza que deseja apagar a categoria abaixo?
      </p>

      {/* Exibe as informações da categoria */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {categoria.nome}
        </h3>

        <p className="text-gray-600">
          {categoria.descricao}
        </p>
      </div>

      {/* Botões de ação */}
      <div className="flex gap-4">
        {/* Cancela a exclusão e retorna para a listagem */}
        <Button
          variante="secundario"
          onClick={() => navigate("/categorias")}
        >
          Não
        </Button>

        {/* Confirma a exclusão da categoria */}
        <Button
          variante="perigo"
          onClick={handleDelete}
          isLoading={isLoading}
        >
          Sim, deletar
        </Button>
      </div>
    </div>
  );
}