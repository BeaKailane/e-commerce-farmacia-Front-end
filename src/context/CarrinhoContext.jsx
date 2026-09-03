import { createContext, useContext, useEffect, useState } from "react";

const CarrinhoContext = createContext(null);

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState(() => {
    try {
      const salvo = localStorage.getItem("carrinho");
      return salvo ? JSON.parse(salvo) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(itens));
  }, [itens]);

  function adicionarAoCarrinho(produto, quantidade = 1) {
    setItens((atual) => {
      const existente = atual.find((item) => item.produto.id === produto.id);

      if (existente) {
        return atual.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item,
        );
      }

      return [...atual, { produto, quantidade }];
    });
  }

  function removerDoCarrinho(produtoId) {
    setItens((atual) => atual.filter((item) => item.produto.id !== produtoId));
  }

  function atualizarQuantidade(produtoId, quantidade) {
    if (quantidade < 1) return;

    setItens((atual) =>
      atual.map((item) =>
        item.produto.id === produtoId ? { ...item, quantidade } : item,
      ),
    );
  }

  function limparCarrinho() {
    setItens([]);
  }

  const quantidadeTotal = itens.reduce((soma, item) => soma + item.quantidade, 0);

  const valorTotal = itens.reduce(
    (soma, item) => soma + Number(item.produto.preco || 0) * item.quantidade,
    0,
  );

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarAoCarrinho,
        removerDoCarrinho,
        atualizarQuantidade,
        limparCarrinho,
        quantidadeTotal,
        valorTotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error("useCarrinho deve ser usado dentro de um CarrinhoProvider");
  }
  return context;
}
