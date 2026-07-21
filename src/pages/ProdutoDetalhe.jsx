import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Tag } from "lucide-react";

import { buscar } from "../services/services";
import Loading from "../components/ui/Loading";
import { ToastAlerta } from "../utils/ToastAlert";

export default function ProdutoDetalhe() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    buscar(`/produtos/${id}`, setProduto)
      .catch(() => ToastAlerta("Erro ao buscar produto", "erro"))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) return <Loading texto="Carregando produto..." />;

  if (!produto) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold text-gray-700">
          Produto não encontrado.
        </h1>
        <Link to="/produtos" className="mt-6 inline-block text-red-600 hover:underline">
          Voltar para produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link
        to="/produtos"
        className="mb-6 inline-flex items-center gap-2 text-gray-500 hover:text-red-600"
      >
        <ArrowLeft size={18} />
        Voltar para produtos
      </Link>

      <div className="grid gap-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:grid-cols-2">
        <img
          src={produto.foto || "https://placehold.co/500x400/f8fafc/e30613?text=Produto"}
          alt={produto.nome}
          className="h-full max-h-96 w-full rounded-xl object-cover"
        />

        <div>
          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
            <Tag size={12} />
            {produto.categoria?.descricao || "Categoria"}
          </span>

          <h1 className="mt-4 text-3xl font-bold text-gray-800">
            {produto.nome}
          </h1>

          {produto.marcaProduto && (
            <p className="mt-1 text-sm text-gray-500">{produto.marcaProduto}</p>
          )}

          <p className="mt-4 text-gray-600">{produto.descricao}</p>

          <div className="mt-6 flex items-center gap-6">
            <span className="text-3xl font-bold text-red-600">
              R$ {Number(produto.preco).toFixed(2)}
            </span>
            <span className="text-sm text-gray-500">
              {produto.quantidade} em estoque
            </span>
          </div>

          <Link
            to={`/produtos/editar/${produto.id}`}
            className="mt-8 inline-block rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Editar produto
          </Link>
        </div>
      </div>
    </div>
  );
}
