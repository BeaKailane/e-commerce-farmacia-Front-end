import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export default function PedidoConfirmado() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <CheckCircle2 className="mx-auto mb-6 text-green-600" size={80} />

      <h1 className="text-3xl font-bold text-gray-800">
        Pedido confirmado com sucesso!
      </h1>

      <p className="mt-4 text-gray-500">
        Obrigado por comprar na FarmaStore. Você receberá as atualizações do
        seu pedido em breve.
      </p>

      <Link
        to="/produtos"
        className="mt-8 inline-block rounded-xl bg-red-600 px-8 py-4 font-semibold text-white transition hover:bg-red-700"
      >
        Continuar comprando
      </Link>
    </div>
  );
}
