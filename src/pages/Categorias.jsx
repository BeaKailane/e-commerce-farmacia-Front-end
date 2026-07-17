import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import { buscar } from "../services/services";
import CardCategoria from "../components/categoria/CardCategoria";
import Loading from "../components/ui/Loading";
import { ToastAlerta } from "../utils/ToastAlert";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    buscarCategorias();
  }, []);

  async function buscarCategorias() {
    setIsLoading(true);
    try {
      await buscar("/categorias", setCategorias);
    } catch {
      ToastAlerta("Erro ao buscar categorias", "erro");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Cabeçalho */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Categorias</h1>
          <p className="mt-1 text-gray-500">
            Gerencie as categorias da farmácia
          </p>
        </div>

        <Link
          to="/categorias/cadastrar"
          className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          <Plus size={20} />
          Nova Categoria
        </Link>
      </div>

      {/* Cards */}
      {isLoading ? (
        <Loading texto="Carregando categorias..." />
      ) : categorias.length === 0 ? (
        <div className="rounded-xl bg-white p-12 text-center shadow">
          <h2 className="text-2xl font-semibold text-gray-700">
            Nenhuma categoria cadastrada.
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categorias.map((categoria) => (
            <CardCategoria key={categoria.id} categoria={categoria} />
          ))}
        </div>
      )}
    </div>
  );
}
