import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useCarrinho } from "../../context/CarrinhoContext";
import Button from "../../components/ui/Button";

export default function Checkout() {
  const navigate = useNavigate();
  const { itens, valorTotal, limparCarrinho } = useCarrinho();

  const [dados, setDados] = useState({
    nomeCompleto: "",
    endereco: "",
    cidade: "",
    cep: "",
    telefone: "",
    pagamento: "cartao",
  });
  const [isLoading, setIsLoading] = useState(false);

  if (itens.length === 0) {
    return <Navigate to="/carrinho" replace />;
  }

  function atualizarEstado(e) {
    const { name, value } = e.target;
    setDados((atual) => ({ ...atual, [name]: value }));
  }

  async function handleConfirmar(e) {
    e.preventDefault();
    setIsLoading(true);

    // Ainda não existe endpoint de pedidos no back-end, então a
    // finalização de compra é simulada por enquanto.
    await new Promise((resolve) => setTimeout(resolve, 900));

    limparCarrinho();
    navigate("/pedido-confirmado");
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold text-gray-800">
        Finalizar compra
      </h1>

      <div className="grid gap-10 lg:grid-cols-3">
        <form
          onSubmit={handleConfirmar}
          className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2"
        >
          <h2 className="text-lg font-bold text-gray-800">
            Dados de entrega
          </h2>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Nome completo
            </label>
            <input
              type="text"
              name="nomeCompleto"
              value={dados.nomeCompleto}
              onChange={atualizarEstado}
              required
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Endereço
            </label>
            <input
              type="text"
              name="endereco"
              value={dados.endereco}
              onChange={atualizarEstado}
              required
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Cidade
              </label>
              <input
                type="text"
                name="cidade"
                value={dados.cidade}
                onChange={atualizarEstado}
                required
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                CEP
              </label>
              <input
                type="text"
                name="cep"
                value={dados.cep}
                onChange={atualizarEstado}
                required
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Telefone
            </label>
            <input
              type="tel"
              name="telefone"
              value={dados.telefone}
              onChange={atualizarEstado}
              required
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Forma de pagamento
            </label>
            <select
              name="pagamento"
              value={dados.pagamento}
              onChange={atualizarEstado}
              className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="cartao">Cartão de crédito</option>
              <option value="pix">Pix</option>
              <option value="boleto">Boleto</option>
            </select>
          </div>

          <Button type="submit" isLoading={isLoading} className="mt-2">
            Confirmar pedido
          </Button>
        </form>

        {/* Resumo do pedido */}
        <div className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-800">
            Resumo do pedido
          </h2>

          <div className="max-h-64 space-y-3 overflow-y-auto">
            {itens.map(({ produto, quantidade }) => (
              <div
                key={produto.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-gray-600">
                  {produto.nome} x{quantidade}
                </span>
                <span className="font-medium text-gray-800">
                  R$ {(Number(produto.preco) * quantidade).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t pt-4 text-xl font-bold text-gray-800">
            <span>Total</span>
            <span>R$ {valorTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
