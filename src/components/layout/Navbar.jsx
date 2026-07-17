import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Pill,
  HeartPulse,
  Baby,
  Sparkles,
} from "lucide-react";

export default function Navbar() {
  return (
    <>
      {/* Barra superior */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">

            <div className="rounded-xl bg-red-600 p-2 text-white">
              <HeartPulse size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-red-600">
                Farma<span className="text-gray-800">Store</span>
              </h1>

              <p className="text-xs text-gray-500">
                Saúde e Bem-estar
              </p>
            </div>

          </Link>

          {/* Pesquisa */}
          <div className="hidden w-[45%] md:flex">

            <div className="flex w-full overflow-hidden rounded-full border border-gray-300">

              <input
                type="text"
                placeholder="Pesquisar medicamentos..."
                className="flex-1 px-5 py-3 outline-none"
              />

              <button className="bg-red-600 px-6 text-white transition hover:bg-red-700">
                <Search size={20} />
              </button>

            </div>

          </div>

          {/* Botões */}
          <div className="flex gap-3">

            <Link
              to="/produtos"
              className="rounded-xl bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Produtos
            </Link>

            <button className="rounded-xl border p-2 transition hover:bg-gray-100">
              <ShoppingCart size={22} />
            </button>

          </div>

        </div>

      </header>

      {/* Menu */}
      <nav className="border-y bg-gray-50">

        <div className="mx-auto flex max-w-7xl gap-8 overflow-x-auto px-6 py-3 text-sm font-medium">

          <Link
            to="/categorias"
            className="flex items-center gap-2 whitespace-nowrap hover:text-red-600"
          >
            <Pill size={18} />
            Medicamentos
          </Link>

          <Link
            to="/categorias"
            className="flex items-center gap-2 whitespace-nowrap hover:text-red-600"
          >
            <Sparkles size={18} />
            Vitaminas
          </Link>

          <Link
            to="/categorias"
            className="flex items-center gap-2 whitespace-nowrap hover:text-red-600"
          >
            <HeartPulse size={18} />
            Bem-estar
          </Link>

          <Link
            to="/categorias"
            className="flex items-center gap-2 whitespace-nowrap hover:text-red-600"
          >
            <Baby size={18} />
            Infantil
          </Link>

        </div>

      </nav>
    </>
  );
}