import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { buscar, atualizarCategoria } from "../../services/services";
import Button from "../ui/Button";
import { ToastAlerta } from "../../utils/ToastAlert";

export default function EditarCategoria() {
  // Hook para navegar entre as páginas
  const navigate = useNavigate();

  // Obtém o id da categoria pela URL
  const { id } = useParams();

  // Estado que armazena os dados da categoria
  const [categoria, setCategoria] = useState({
    id: 0,
    nome: "",
    descricao: "",
    dataValidade: "",
    setor: "",
    responsavel: "",
  });

  // Estado responsável por controlar o loading do botão
  const [isLoading, setIsLoading] = useState(false);

  // Executa quando o componente é carregado
  // Busca os dados da categoria para preencher o formulário
  useEffect(() => {
    if (id) {
      buscar(`/categorias/${id}`, setCategoria).catch(() =>
        ToastAlerta("Erro ao buscar categoria", "erro"),
      );
    }
  }, [id]);

  // Atualiza o estado sempre que um campo do formulário é alterado
  function atualizarEstado(e) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  // Função executada ao enviar o formulário
  async function handleEditar(e) {
    e.preventDefault();

    // Ativa o estado de carregamento
    setIsLoading(true);

    // Cria um objeto somente com os campos necessários
    // Evita enviar propriedades extras para a API
    const categoriaAtualizada = {
      id: categoria.id,
      nome: categoria.nome,
      descricao: categoria.descricao,
      dataValidade: categoria.dataValidade,
      setor: categoria.setor,
      responsavel: categoria.responsavel,
    };

    try {
      // Envia os dados atualizados para o backend
      await atualizarCategoria(`/categorias/${id}`, categoriaAtualizada);

      // Exibe mensagem de sucesso
      ToastAlerta("Categoria editada com sucesso", "sucesso");

      // Redireciona para a listagem de categorias
      navigate("/categorias");
    } catch (error) {
      // Exibe o erro retornado pela API no console
      console.log(error.response?.data);

      ToastAlerta("Erro ao editar categoria", "erro");
    }

    setIsLoading(false);
  }

  // Lista dos campos do formulário
  // É utilizada para gerar os inputs dinamicamente
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
        {/* Título do formulário */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Editar Categoria
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Atualize as informações da categoria abaixo
          </p>
        </div>

        {/* Campos do formulário */}
        <div className="space-y-5">
          {campos.map(({ label, name, type }) => (
            <div key={name}>
              {/* Label do campo */}
              <label
                htmlFor={name}
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                {label}
              </label>

              {/* Input correspondente ao campo */}
              <input
                id={name}
                type={type}
                name={name}
                value={categoria[name]}
                onChange={atualizarEstado}
                required
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900
                  placeholder:text-gray-400
                  focus:outline-none focus:ring-2 focus:ring-red-500
                  focus:border-red-500 transition-colors"
              />
            </div>
          ))}
        </div>

        {/* Botão de envio */}
        <Button type="submit" isLoading={isLoading} className="mt-8">
          Salvar alterações
        </Button>
      </form>
    </div>
  );
}