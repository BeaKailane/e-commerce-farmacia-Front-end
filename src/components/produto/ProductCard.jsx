import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2, Tag, ShoppingCart, Minus, Plus } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useCarrinho } from "../../context/CarrinhoContext";
import { ToastAlerta } from "../../utils/ToastAlert";

export default function ProductCard({ produto, onDelete }) {
  const { isAutenticado } = useAuth();
  const { adicionarAoCarrinho } = useCarrinho();
  const [quantidade, setQuantidade] = useState(1);

  const semEstoque = Number(produto.quantidade) <= 0;
  const estoqueMax = Number(produto.quantidade) || 1;

  function handleAddToCart() {
    adicionarAoCarrinho(produto, quantidade);
    ToastAlerta("Produto adicionado ao carrinho", "sucesso");
    setQuantidade(1);
  }

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Imagem */}
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={
            produto.foto ||
            "https://placehold.co/400x300/f8fafc/e30613?text=Produto"
          }
          alt={produto.nome}
          className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
          <Tag size={12} className="mr-1 inline" />
          {produto.categoria?.descricao || "Categoria"}
        </span>

        {semEstoque && (
          <span className="absolute right-3 top-3 rounded-full bg-gray-800 px-3 py-1 text-xs font-semibold text-white">
            Esgotado
          </span>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-5">
        <h2 className="line-clamp-1 text-xl font-bold text-gray-800">
          {produto.nome}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
          {produto.descricao}
        </p>

        <div className="mt-4">
          <span className="text-2xl font-bold text-red-600">
            R$ {Number(produto.preco).toFixed(2)}
          </span>
        </div>

        {/* Seletor de quantidade */}
        {!semEstoque && (
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
              disabled={quantidade <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg border text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Minus size={14} />
            </button>

            <span className="w-6 text-center font-semibold">{quantidade}</span>

            <button
              type="button"
              onClick={() => setQuantidade((q) => Math.min(estoqueMax, q + 1))}
              disabled={quantidade >= estoqueMax}
              className="flex h-8 w-8 items-center justify-center rounded-lg border text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus size={14} />
            </button>
          </div>
        )}

        {/* Botões */}
        <div className="mt-4 flex gap-2">
          <Link
            to={`/produtos/${produto.id}`}
            className="flex flex-1 items-center justify-center rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700"
            title="Detalhes"
          >
            <Eye size={18} />
          </Link>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={semEstoque}
            title={semEstoque ? "Produto esgotado" : "Adicionar ao carrinho"}
            className="flex flex-1 items-center justify-center rounded-lg bg-green-600 py-2 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <ShoppingCart size={18} />
          </button>

          {isAutenticado && (
            <>
              <Link
                to={`/produtos/editar/${produto.id}`}
                className="flex flex-1 items-center justify-center rounded-lg bg-yellow-500 py-2 text-white transition hover:bg-yellow-600"
                title="Editar"
              >
                <Pencil size={18} />
              </Link>

              <button
                type="button"
                onClick={() => onDelete?.(produto)}
                className="flex flex-1 items-center justify-center rounded-lg bg-red-600 py-2 text-white transition hover:bg-red-700"
                title="Excluir"
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}