import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";

import { useCarrinho } from "../../context/CarrinhoContext";

export default function Carrinho() {
  const navigate = useNavigate();
  const {
    itens,
    atualizarQuantidade,
    removerDoCarrinho,
    valorTotal,
    quantidadeTotal,
  } = useCarrinho();

  if (itens.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <ShoppingBag className="mx-auto mb-6 text-gray-300" size={72} />
        <h1 className="text-2xl font-semibold text-gray-700">
          Seu carrinho está vazio.
        </h1>
        <Link
          to="/produtos"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          <ArrowLeft size={18} />
          Ver produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold text-gray-800">
        Meu carrinho{" "}
        <span className="text-lg font-normal text-gray-500">
          ({quantidadeTotal} {quantidadeTotal === 1 ? "item" : "itens"})
        </span>
      </h1>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* Lista de itens */}
        <div className="space-y-4 lg:col-span-2">
          {itens.map(({ produto, quantidade }) => (
            <div
              key={produto.id}
              className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
            >
              <img
                src={
                  produto.foto ||
                  "https://placehold.co/150x150/f8fafc/e30613?text=Produto"
                }
                alt={produto.nome}
                className="h-24 w-24 shrink-0 rounded-xl object-cover sm:mx-0"
              />

              <div className="flex-1">
                <h2 className="font-bold text-gray-800">{produto.nome}</h2>
                <p className="mt-1 text-sm text-gray-500">
                  R$ {Number(produto.preco).toFixed(2)} / unidade
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    atualizarQuantidade(produto.id, quantidade - 1)
                  }
                  disabled={quantidade <= 1}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Minus size={16} />
                </button>

                <span className="w-6 text-center font-semibold">
                  {quantidade}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    atualizarQuantidade(produto.id, quantidade + 1)
                  }
                  disabled={
                    typeof produto.quantidade === "number" &&
                    quantidade >= produto.quantidade
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg border text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Plus size={16} />
                </button>
              </div>

              <div className="w-24 text-right font-bold text-red-600">
                R$ {(Number(produto.preco) * quantidade).toFixed(2)}
              </div>

              <button
                type="button"
                onClick={() => removerDoCarrinho(produto.id)}
                title="Remover"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          <Link
            to="/produtos"
            className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:underline"
          >
            <ArrowLeft size={16} />
            Continuar comprando
          </Link>
        </div>

        {/* Resumo */}
        <div className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-800">Resumo</h2>

          <div className="flex items-center justify-between text-gray-600">
            <span>Subtotal</span>
            <span>R$ {valorTotal.toFixed(2)}</span>
          </div>

          <div className="mt-2 flex items-center justify-between text-gray-600">
            <span>Frete</span>
            <span className="text-green-600">Grátis</span>
          </div>

          <div className="mt-4 flex items-center justify-between border-t pt-4 text-xl font-bold text-gray-800">
            <span>Total</span>
            <span>R$ {valorTotal.toFixed(2)}</span>
          </div>

          <button
            type="button"
            onClick={() => navigate("/checkout")}
            className="mt-6 w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
}
