import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";

import Home from "../pages/Home";
import Produtos from "../pages/Produtos";
import ProdutoDetalhe from "../pages/ProdutoDetalhe";
import Categorias from "../pages/Categorias";

import FormularioProduto from "../components/produto/FormularioProduto";

import FormularioCategoria from "../components/categoria/FormularioCategoria";
import EditarCategoria from "../components/categoria/EditarCategoria";
import DeletarCategoria from "../components/categoria/DeletarCategoria";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          {/* Produtos */}
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/cadastrar" element={<FormularioProduto />} />
          <Route path="/produtos/editar/:id" element={<FormularioProduto />} />
          <Route path="/produtos/:id" element={<ProdutoDetalhe />} />

          {/* Categorias */}
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/categorias/cadastrar" element={<FormularioCategoria />} />
          <Route path="/categorias/editar/:id" element={<EditarCategoria />} />
          <Route path="/categorias/deletar/:id" element={<DeletarCategoria />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
