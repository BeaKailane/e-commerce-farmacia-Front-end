import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import RotaProtegida from "./RotaProtegida";

import Home from "../pages/home/Home";
import Produtos from "../pages/Produtos";
import ProdutoDetalhe from "../pages/ProdutoDetalhe";
import Categorias from "../pages/Categorias";

import FormularioProduto from "../components/produto/FormularioProduto";
import Login from "../pages/login/Login";
import Cadastro from "../pages/cadastro/Cadastro";
import FormularioCategoria from "../components/categoria/FormularioCategoria";
import EditarCategoria from "../components/categoria/EditarCategoria";
import DeletarCategoria from "../components/categoria/DeletarCategoria";

import Carrinho from "../pages/carrinho/Carrinho";
import Checkout from "../pages/checkout/Checkout";
import PedidoConfirmado from "../pages/checkout/PedidoConfirmado";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          {/* Produtos — navegação e compra são públicas */}
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/:id" element={<ProdutoDetalhe />} />

          {/* Produtos — gestão restrita a administradores logados */}
          <Route
            path="/produtos/cadastrar"
            element={
              <RotaProtegida>
                <FormularioProduto />
              </RotaProtegida>
            }
          />
          <Route
            path="/produtos/editar/:id"
            element={
              <RotaProtegida>
                <FormularioProduto />
              </RotaProtegida>
            }
          />

          {/* Categorias — listagem é pública */}
          <Route path="/categorias" element={<Categorias />} />

          {/* Categorias — gestão restrita a administradores logados */}
          <Route
            path="/categorias/cadastrar"
            element={
              <RotaProtegida>
                <FormularioCategoria />
              </RotaProtegida>
            }
          />
          <Route
            path="/categorias/editar/:id"
            element={
              <RotaProtegida>
                <EditarCategoria />
              </RotaProtegida>
            }
          />
          <Route
            path="/categorias/deletar/:id"
            element={
              <RotaProtegida>
                <DeletarCategoria />
              </RotaProtegida>
            }
          />

          {/* Carrinho e finalização de compra — públicos, sem necessidade de login */}
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pedido-confirmado" element={<PedidoConfirmado />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
