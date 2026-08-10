import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

import { useCarrinho } from "../context/CarrinhoContext";

export default function Pagamento() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { limparCarrinho } = useCarrinho();

  const pagamento = state?.pagamento;
  const linkPagamento = pagamento?.url;

  // Redireciona automaticamente para a página de pagamento hospedada
  // pelo AbacatePay assim que o link estiver disponível. O carrinho só
  // é limpo aqui, depois do redirect já disparado — limpar antes, lá no
  // Checkout, fazia o componente re-renderizar com itens vazios e
  // competir com a navegação para cá.
  useEffect(() => {
    console.log("Pagamento.jsx montado. linkPagamento:", linkPagamento);
    if (linkPagamento) {
      limparCarrinho();
      window.location.href = linkPagamento;
    }
  }, [linkPagamento]);

  // Sem dado de pagamento (ex: usuário atualizou a página / acessou direto)
  if (!pagamento) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Pagamento não encontrado.
        </h2>
        <p className="mt-3 text-gray-500">
          Volte ao carrinho e finalize a compra novamente.
        </p>
        <Link
          to="/carrinho"
          className="mt-6 inline-block rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          Voltar ao carrinho
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="text-3xl font-bold text-gray-800">Redirecionando...</h1>

      <p className="mt-4 text-gray-500">
        Você está sendo levado para a página de pagamento PIX. Se nada
        acontecer em alguns segundos, clique no botão abaixo.
      </p>

      {linkPagamento ? (
        <a
          href={linkPagamento}
          className="mt-8 inline-block rounded-xl bg-red-600 px-8 py-4 font-semibold text-white transition hover:bg-red-700"
        >
          Ir para o pagamento
        </a>
      ) : (
        <p className="mt-6 text-sm text-red-600">
          Link de pagamento não disponível. Tente novamente.
        </p>
      )}
    </div>
  );
}