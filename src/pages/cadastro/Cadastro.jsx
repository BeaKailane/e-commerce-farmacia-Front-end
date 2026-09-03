import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeartPulse } from "lucide-react";

import { cadastrarUsuario } from "../../services/services";
import Button from "../../components/ui/Button";
import { ToastAlerta } from "../../utils/ToastAlert";

export default function Cadastro() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  });
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function atualizarEstado(e) {
    const { name, value } = e.target;
    setUsuario((atual) => ({ ...atual, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (usuario.senha !== confirmarSenha) {
      ToastAlerta("As senhas não coincidem", "erro");
      return;
    }

    if (usuario.senha.length < 8) {
      ToastAlerta("A senha deve ter no mínimo 8 caracteres", "erro");
      return;
    }

    setIsLoading(true);

    try {
      await cadastrarUsuario(usuario);
      ToastAlerta("Cadastro realizado com sucesso", "sucesso");
      navigate("/login");
    } catch (error) {
      console.error(error);
      ToastAlerta("Erro ao realizar cadastro", "erro");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-600 to-red-500 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl sm:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-600 text-white">
            <HeartPulse size={28} />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Criar conta em Farma<span className="text-red-600">Store</span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Preencha seus dados para começar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="Seu nome completo"
              value={usuario.nome}
              onChange={atualizarEstado}
              required
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label
              htmlFor="usuario"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              id="usuario"
              name="usuario"
              type="email"
              placeholder="voce@exemplo.com"
              value={usuario.usuario}
              onChange={atualizarEstado}
              required
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="senha"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <input
                id="senha"
                name="senha"
                type="password"
                placeholder="Mínimo 8 caracteres"
                value={usuario.senha}
                onChange={atualizarEstado}
                required
                minLength={8}
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label
                htmlFor="confirmarSenha"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Confirmar senha
              </label>
              <input
                id="confirmarSenha"
                name="confirmarSenha"
                type="password"
                placeholder="Repita a senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
                minLength={8}
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="foto"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              URL da foto <span className="font-normal text-gray-400">(opcional)</span>
            </label>
            <input
              id="foto"
              name="foto"
              type="url"
              placeholder="https://exemplo.com/foto.jpg"
              value={usuario.foto}
              onChange={atualizarEstado}
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            {usuario.foto && (
              <img
                src={usuario.foto}
                alt="Pré-visualização"
                className="mt-4 h-32 w-32 rounded-full border object-cover"
                onError={(e) => (e.target.style.display = "none")}
              />
            )}
          </div>

          <Button type="submit" isLoading={isLoading} className="mt-2">
            Cadastrar
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Já tem conta?{" "}
          <Link to="/login" className="font-semibold text-red-600 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
