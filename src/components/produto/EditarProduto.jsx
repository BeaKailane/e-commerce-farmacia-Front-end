import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { buscar, atualizarProduto } from "../../services/services";
import Button from "../ui/Button";
import { ToastAlerta } from "../../utils/ToastAlert";

export default function EditarProduto() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [produto, setProduto] = useState({
    id: 0,
    nome: "",
    descricao: "",
    marcaProduto: "",
    quantidade: 0,
    preco: 0,
    foto: "",
    categoria: {
      id: "",
    },
  });

  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    buscar("/categorias", setCategorias).catch(() =>
      ToastAlerta("Erro ao buscar categorias", "erro"),
    );

    if (id) {
      buscar(`/produtos/${id}`, setProduto).catch(() =>
        ToastAlerta("Erro ao buscar produto", "erro"),
      );
    }
  }, [id]);

  function atualizarEstado(e) {
    const { name, value } = e.target;

    if (name === "categoria") {
      setProduto({
        ...produto,
        categoria: {
          id: Number(value),
        },
      });
    } else {
      setProduto({
        ...produto,
        [name]:
          name === "quantidade" || name === "preco" ? Number(value) : value,
      });
    }
  }

  async function handleEditar(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await atualizarProduto("/produtos", produto);

      ToastAlerta("Produto editado com sucesso", "sucesso");
      navigate("/produtos");
    } catch (error) {
      console.log(error);
      ToastAlerta("Erro ao editar produto", "erro");
    }

    setIsLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <form
        onSubmit={handleEditar}
        className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-lg"
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Editar Produto</h1>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block mb-1">Nome</label>
            <input
              type="text"
              name="nome"
              value={produto.nome}
              onChange={atualizarEstado}
              className="w-full rounded-lg border p-2"
            />
          </div>

          <div>
            <label className="block mb-1">Descrição</label>
            <input
              type="text"
              name="descricao"
              value={produto.descricao}
              onChange={atualizarEstado}
              className="w-full rounded-lg border p-2"
            />
          </div>

          <div>
            <label className="block mb-1">Marca</label>
            <input
              type="text"
              name="marcaProduto"
              value={produto.marcaProduto}
              onChange={atualizarEstado}
              className="w-full rounded-lg border p-2"
            />
          </div>

          <div>
            <label className="block mb-1">Quantidade</label>
            <input
              type="number"
              name="quantidade"
              value={produto.quantidade}
              onChange={atualizarEstado}
              className="w-full rounded-lg border p-2"
            />
          </div>

          <div>
            <label className="block mb-1">Imagem</label>
            <input
              type="url"
              name="foto"
              value={produto.foto}
              onChange={atualizarEstado}
              className="w-full rounded-lg border p-2"
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>

          <div>
            <label className="block mb-1">Preço</label>
            <input
              type="number"
              step="0.01"
              name="preco"
              value={produto.preco}
              onChange={atualizarEstado}
              className="w-full rounded-lg border p-2"
            />
          </div>

          <div>
            <label className="block mb-1">Categoria</label>
            <select
              name="categoria"
              value={produto.categoria.id}
              onChange={atualizarEstado}
              className="w-full rounded-lg border p-2"
            >
              <option value="">Selecione uma categoria</option>

              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.descricao}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button type="submit" isLoading={isLoading} className="mt-8">
          Salvar alterações
        </Button>
      </form>
    </div>
  );
}
