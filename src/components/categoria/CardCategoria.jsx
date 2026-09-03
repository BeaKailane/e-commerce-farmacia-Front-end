import { Pencil, Trash2, Package } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function CardCategoria({ categoria }) {
  const { id, nome, descricao } = categoria;
  const { isAutenticado } = useAuth();

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
      {/* Cabeçalho */}
      <div className="bg-blue-600 p-4 flex items-center gap-3">
        <Package className="text-white" size={28} />

        <div>
          <h2 className="text-lg font-bold text-white">{nome}</h2>
          <p className="text-blue-100 text-sm">
            Categoria de produtos
          </p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-5">
        <p className="text-gray-600 min-h-[60px]">
          {descricao}
        </p>

        {isAutenticado && (
          <div className="flex justify-end gap-3 mt-6">
            <Link
              to={`/categorias/editar/${id}`}
              className="bg-blue-100 p-2 rounded-lg hover:bg-blue-200 transition"
            >
              <Pencil
                size={20}
                className="text-blue-700"
              />
            </Link>

            <Link
              to={`/categorias/deletar/${id}`}
              className="bg-red-100 p-2 rounded-lg hover:bg-red-200 transition"
            >
              <Trash2
                size={20}
                className="text-red-600"
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
