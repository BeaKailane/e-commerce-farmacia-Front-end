import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { CarrinhoProvider } from "./context/CarrinhoContext";

function App() {
  return (
    <AuthProvider>
      <CarrinhoProvider>
        <AppRoutes />
      </CarrinhoProvider>
    </AuthProvider>
  );
}

export default App;
