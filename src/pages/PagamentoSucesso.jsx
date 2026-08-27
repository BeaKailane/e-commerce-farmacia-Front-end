import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PagamentoSucesso() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="text-3xl font-bold text-gray-800">
        Pagamento confirmado!
      </h1>
      <p className="mt-4 text-gray-500">
        Obrigado pela sua compra. Você será redirecionado para a página
        inicial em instantes.
      </p>
    </div>
  );
}