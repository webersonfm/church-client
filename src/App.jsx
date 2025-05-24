
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import LoginPage from "./pages/login/LoginPage"
import MainLayout from "./layouts/MainLayout"
import Dashboard from "./pages/dashboard/Dashboard"
import ClientesCadastro from "./pages/clientes/ClientesCadastro"
import ClientesLista from "./pages/clientes/ClientesLista"
import FornecedoresCadastro from "./pages/fornecedores/FornecedoresCadastro"
import FornecedoresLista from "./pages/fornecedores/FornecedoresLista"
import "./styles/globals.css"

// Componente para rotas protegidas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {
  return (
   
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="clientes">
              <Route path="cadastro" element={<ClientesCadastro />} />
              <Route path="lista" element={<ClientesLista />} />
            </Route>
            <Route path="fornecedores">
              <Route path="cadastro" element={<FornecedoresCadastro />} />
              <Route path="lista" element={<FornecedoresLista />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
