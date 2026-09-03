import axios from "axios";

// Sem isso, o app tentaria falar com "localhost:8080", que não existe
// no navegador de quem está acessando o site publicado.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
});

// Anexa o token salvo no login em todas as requisições,
// para que as rotas de admin no back-end reconheçam o usuário autenticado.
// Obs.: back-ends Spring costumam já devolver o token com "Bearer " incluso,
// então evitamos duplicar o prefixo aqui.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`;
  }
  return config;
});

//buscar 
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

// Usuários
export async function cadastrarUsuario(usuario) {
  const response = await api.post("/usuarios/cadastrar", usuario);
  return response.data;
}

export default api;
