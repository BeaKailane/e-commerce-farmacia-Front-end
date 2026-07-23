//forms para  do produto
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  buscar,
  cadastrarProduto,
  atualizarProduto,
} from "../../services/services";
import Button from "../ui/Button";
import { ToastAlerta } from "../../utils/ToastAlert";

export default function FormularioProduto() {
  const navigate = useNavigate();
  const { id } = useParams();
  const emEdicao = Boolean(id);

  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    marcaProduto: "",
    quantidade: "",
    preco: "",
    foto: "",
    categoria: {
      id: "",
    },
  });

  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    buscar("/categorias", setCategorias).catch(() =>
      ToastAlerta("Erro ao buscar categorias", "erro"),
    );

    if (emEdicao) {
      buscar(`/produtos/${id}`, setProduto).catch(() =>
        ToastAlerta("Erro ao buscar produto", "erro"),
      );
    }
  }, [id, emEdicao]);

  function atualizarEstado(e) {
    const { name, value } = e.target;

    if (name === "categoria") {
      setProduto({
        ...produto,
        categoria: {
          id: Number(value),
        },
      });
      return;
    }

    setProduto({
      ...produto,
      [name]:
        name === "quantidade"
          ? Number(value)
          : name === "preco"
            ? parseFloat(value)
            : value,
    });
  }

  async function handleSalvar(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (emEdicao) {
        await atualizarProduto(`/produtos/${produto.id}`, produto);
        ToastAlerta("Produto atualizado com sucesso", "sucesso");
      } else {
        await cadastrarProduto("/produtos", produto);
        ToastAlerta("Produto cadastrado com sucesso", "sucesso");
      }

      navigate("/produtos");
    } catch {
      ToastAlerta(
        emEdicao ? "Erro ao atualizar produto" : "Erro ao cadastrar produto",
        "erro",
      );
    }

    setIsLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <form
        onSubmit={handleSalvar}
        className="w-full max-w-2xl rounded-2xl border border-gray-100 bg-white p-8 shadow-lg"
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {emEdicao ? "Editar Produto" : "Novo Produto"}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Preencha as informações do produto abaixo
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label
              htmlFor="nome"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Nome
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              value={produto.nome}
              onChange={atualizarEstado}
              required
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label
              htmlFor="descricao"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Descrição
            </label>
            <textarea
              id="descricao"
              name="descricao"
              rows="3"
              value={produto.descricao}
              onChange={atualizarEstado}
              required
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label
              htmlFor="marcaProduto"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Marca
            </label>
            <input
              id="marcaProduto"
              name="marcaProduto"
              type="text"
              value={produto.marcaProduto}
              onChange={atualizarEstado}
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="quantidade"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Quantidade
              </label>
              <input
                id="quantidade"
                name="quantidade"
                type="number"
                min="0"
                value={produto.quantidade}
                onChange={atualizarEstado}
                required
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label
                htmlFor="preco"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Preço (R$)
              </label>
              <input
                id="preco"
                name="preco"
                type="number"
                min="0"
                step="0.01"
                value={produto.preco}
                onChange={atualizarEstado}
                required
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="foto"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              URL da Imagem
            </label>

            <input
              id="foto"
              name="foto"
              type="url"
              placeholder="https://exemplo.com/imagem.jpg"
              value={produto.foto}
              onChange={atualizarEstado}
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            {produto.foto && (
              <img
                src={produto.foto}
                alt={produto.nome}
                className="mt-4 h-56 w-full rounded-xl border object-cover"
                onError={(e) => (e.target.style.display = "none")}
              />
            )}
          </div>

          <div>
            <label
              htmlFor="categoria"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Categoria
            </label>

            <select
              id="categoria"
              name="categoria"
              value={produto.categoria?.id || ""}
              onChange={atualizarEstado}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="" disabled>
                Selecione uma categoria
              </option>

              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button type="submit" isLoading={isLoading} className="mt-8">
          {emEdicao ? "Salvar alterações" : "Cadastrar produto"}
        </Button>
      </form>
    </div>
  );
}
