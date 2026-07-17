import axios from "axios";

// Em produção (Vercel), defina VITE_API_URL nas variáveis de ambiente.
// Sem isso, o app tentaria falar com "localhost:8080", que não existe
// no navegador de quem está acessando o site publicado.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
});

export async function buscar(url, setDados) {
  const resposta = await api.get(url);
  setDados(resposta.data);
}

// Categorias
export async function cadastrarCategoria(endpoint, categoria) {
  const response = await api.post(endpoint, categoria);
  return response.data;
}

export async function atualizarCategoria(endpoint, categoria) {
  const response = await api.put(endpoint, categoria);
  return response.data;
}

export async function deletarCategoria(id) {
  return await api.delete(`/categorias/${id}`);
}

// Produtos
export async function cadastrarProduto(endpoint, produto) {
  const response = await api.post(endpoint, produto);
  return response.data;
}

export async function atualizarProduto(endpoint, produto) {
  const response = await api.put(endpoint, produto);
  return response.data;
}

export async function deletarProduto(id) {
  return await api.delete(`/produtos/${id}`);
}

export default api;
