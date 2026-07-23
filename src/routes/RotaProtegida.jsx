import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { ToastAlerta } from "../utils/ToastAlert";

export default function RotaProtegida({ children }) {
  const { isAutenticado } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAutenticado) {
      ToastAlerta("Faça login para acessar esta área", "erro");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isAutenticado) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
