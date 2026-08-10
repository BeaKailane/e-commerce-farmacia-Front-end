import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [usuario, setUsuario] = useState(null);

  const isAutenticado = !!token;

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  function login(novoToken, usuarioLogado) {
    setToken(novoToken);
    setUsuario(usuarioLogado);
  }

  function logout() {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        usuario,
        isAutenticado,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }

  return context;
}