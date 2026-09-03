import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, HeartPulse, LogIn, LogOut } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useCarrinho } from "../../context/CarrinhoContext";
import { ToastAlerta } from "../../utils/ToastAlert";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAutenticado, logout } = useAuth();
  const { quantidadeTotal } = useCarrinho();

  function handleLogout() {
    logout();
    ToastAlerta("Você saiu da conta", "sucesso");
    navigate("/");
  }

  return (
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

            <p className="text-xs text-gray-500">Saúde e Bem-estar</p>
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
        <div className="flex items-center gap-3">
          <Link
            to="/produtos"
            className="hidden rounded-xl bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700 sm:block"
          >
            Produtos
          </Link>
          {isAutenticado ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
            >
              <LogOut size={20} />
              Sair
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              <LogIn size={20} />
              Entrar
            </Link>
          )}
          <Link
            to="/carrinho"
            className="relative flex items-center gap-2 rounded-xl border p-2 text-gray-700 transition hover:bg-gray-100"
            title="Carrinho"
          >
            <ShoppingCart size={22} />
            {quantidadeTotal > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                {quantidadeTotal}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
