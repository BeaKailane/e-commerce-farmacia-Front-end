import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus } from "lucide-react";

import { buscar, deletarProduto } from "../services/services";
import { useAuth } from "../context/AuthContext";
import ProductCard from "../components/produto/ProductCard";
import Loading from "../components/ui/Loading";
import { ToastAlerta } from "../utils/ToastAlert";

export default function Produtos() {
  const { isAutenticado } = useAuth();
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function carregarDados() {
    setIsLoading(true);
    try {
      await Promise.all([
        buscar("/produtos", setProdutos),
        buscar("/categorias", setCategorias),
      ]);
    } catch {
      ToastAlerta("Erro ao buscar produtos", "erro");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  async function handleDelete(produto) {
    if (!window.confirm(`Excluir "${produto.nome}"?`)) return;

    try {
      await deletarProduto(produto.id);
      ToastAlerta("Produto excluído com sucesso", "sucesso");
      setProdutos((atual) => atual.filter((p) => p.id !== produto.id));
    } catch {
      ToastAlerta("Erro ao excluir produto", "erro");
    }
  }

  const produtosFiltrados = produtos.filter((produto) => {
    const combinaNome = produto.nome
      .toLowerCase()
      .includes(busca.toLowerCase());

    const combinaCategoria =
      !categoriaSelecionada ||
      String(produto.categoria?.id) === categoriaSelecionada;

    return combinaNome && combinaCategoria;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Cabeçalho */}
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Produtos</h1>
            <p className="mt-2 text-gray-500">
              Encontre os melhores produtos para sua saúde.
            </p>
          </div>

          {isAutenticado && (
            <Link
              to="/produtos/cadastrar"
              className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              <Plus size={20} />
              Novo Produto
            </Link>
          )}
        </div>

        {/* Pesquisa + filtro de categoria */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row">
          <div className="flex flex-1 overflow-hidden rounded-xl border bg-white shadow-sm">
            <input
              type="text"
              placeholder="Pesquisar produto..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="flex-1 px-5 py-4 outline-none"
            />
            <button className="bg-red-600 px-6 text-white" type="button">
              <Search size={20} />
            </button>
          </div>

          <select
            value={categoriaSelecionada}
            onChange={(e) => setCategoriaSelecionada(e.target.value)}
            className="rounded-xl border bg-white px-5 py-4 text-gray-700 shadow-sm outline-none md:w-64"
          >
            <option value="">Todas as categorias</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={String(categoria.id)}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Lista */}
        {isLoading ? (
          <Loading texto="Carregando produtos..." />
        ) : produtosFiltrados.length === 0 ? (
          <div className="rounded-xl bg-white p-12 text-center shadow">
            <h2 className="text-2xl font-semibold text-gray-700">
              Nenhum produto encontrado.
            </h2>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {produtosFiltrados.map((produto) => (
              <ProductCard
                key={produto.id}
                produto={produto}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
