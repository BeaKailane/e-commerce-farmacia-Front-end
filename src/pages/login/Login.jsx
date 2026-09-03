import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeartPulse } from "lucide-react";

import api from "../../services/services";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";
import { ToastAlerta } from "../../utils/ToastAlert";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post("/usuarios/logar", {
        usuario,
        senha,
      });

      login(response.data.token, response.data);
      ToastAlerta("Login realizado com sucesso!", "sucesso");
      navigate("/produtos");
    } catch (error) {
      console.error(error);
      ToastAlerta("Usuário ou senha inválidos", "erro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-600 to-red-500 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl sm:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-600 text-white">
            <HeartPulse size={28} />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Farma<span className="text-red-600">Store</span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">Acesse sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="usuario"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Usuário
            </label>
            <input
              id="usuario"
              type="email"
              placeholder="admin@farmacia.com"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label
              htmlFor="senha"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <Button type="submit" isLoading={isLoading} className="mt-2">
            Entrar
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Não tem conta?{" "}
          <Link to="/cadastro" className="font-semibold text-red-600 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
