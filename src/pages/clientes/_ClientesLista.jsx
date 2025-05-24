"use client"

import { useState } from "react"
import { FaEdit, FaTrash, FaSearch, FaUserPlus } from "react-icons/fa"
import { Link } from "react-router-dom"

// Dados de exemplo
const clientesExemplo = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@exemplo.com",
    telefone: "(11) 98765-4321",
    cidade: "São Paulo",
    estado: "SP",
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    email: "maria@exemplo.com",
    telefone: "(21) 98765-4321",
    cidade: "Rio de Janeiro",
    estado: "RJ",
  },
  {
    id: 3,
    nome: "Pedro Santos",
    email: "pedro@exemplo.com",
    telefone: "(31) 98765-4321",
    cidade: "Belo Horizonte",
    estado: "MG",
  },
  { id: 4, nome: "Ana Costa", email: "ana@exemplo.com", telefone: "(41) 98765-4321", cidade: "Curitiba", estado: "PR" },
  {
    id: 5,
    nome: "Carlos Souza",
    email: "carlos@exemplo.com",
    telefone: "(51) 98765-4321",
    cidade: "Porto Alegre",
    estado: "RS",
  },
]

const ClientesLista = () => {
  const [clientes] = useState(clientesExemplo)
  const [busca, setBusca] = useState("")
  const [clientesFiltrados, setClientesFiltrados] = useState(clientesExemplo)

  const handleBusca = (e) => {
    const termo = e.target.value.toLowerCase()
    setBusca(termo)

    const filtrados = clientes.filter(
      (cliente) =>
        cliente.nome.toLowerCase().includes(termo) ||
        cliente.email.toLowerCase().includes(termo) ||
        cliente.telefone.includes(termo) ||
        cliente.cidade.toLowerCase().includes(termo),
    )

    setClientesFiltrados(filtrados)
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Lista de Clientes</h1>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar cliente..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={busca}
              onChange={handleBusca}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
          </div>

          <Link
            to="/clientes/cadastro"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          >
            <FaUserPlus className="mr-2" /> Novo Cliente
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Telefone</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Cidade/UF</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clientesFiltrados.length > 0 ? (
                clientesFiltrados.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{cliente.nome}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{cliente.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{cliente.telefone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {cliente.cidade}/{cliente.estado}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    Nenhum cliente encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ClientesLista
