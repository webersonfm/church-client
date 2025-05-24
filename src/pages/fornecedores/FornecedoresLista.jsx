"use client"

import { useState } from "react"
import { FaEdit, FaTrash, FaSearch, FaPlus } from "react-icons/fa"
import { Link } from "react-router-dom"

// Dados de exemplo
const fornecedoresExemplo = [
  {
    id: 1,
    razaoSocial: "Empresa A Ltda",
    nomeFantasia: "Empresa A",
    cnpj: "12.345.678/0001-90",
    telefone: "(11) 3456-7890",
    cidade: "São Paulo",
    estado: "SP",
  },
  {
    id: 2,
    razaoSocial: "Empresa B Ltda",
    nomeFantasia: "Empresa B",
    cnpj: "23.456.789/0001-01",
    telefone: "(21) 3456-7890",
    cidade: "Rio de Janeiro",
    estado: "RJ",
  },
  {
    id: 3,
    razaoSocial: "Empresa C Ltda",
    nomeFantasia: "Empresa C",
    cnpj: "34.567.890/0001-12",
    telefone: "(31) 3456-7890",
    cidade: "Belo Horizonte",
    estado: "MG",
  },
  {
    id: 4,
    razaoSocial: "Empresa D Ltda",
    nomeFantasia: "Empresa D",
    cnpj: "45.678.901/0001-23",
    telefone: "(41) 3456-7890",
    cidade: "Curitiba",
    estado: "PR",
  },
  {
    id: 5,
    razaoSocial: "Empresa E Ltda",
    nomeFantasia: "Empresa E",
    cnpj: "56.789.012/0001-34",
    telefone: "(51) 3456-7890",
    cidade: "Porto Alegre",
    estado: "RS",
  },
]

const FornecedoresLista = () => {
  const [fornecedores] = useState(fornecedoresExemplo)
  const [busca, setBusca] = useState("")
  const [fornecedoresFiltrados, setFornecedoresFiltrados] = useState(fornecedoresExemplo)

  const handleBusca = (e) => {
    const termo = e.target.value.toLowerCase()
    setBusca(termo)

    const filtrados = fornecedores.filter(
      (fornecedor) =>
        fornecedor.razaoSocial.toLowerCase().includes(termo) ||
        fornecedor.nomeFantasia.toLowerCase().includes(termo) ||
        fornecedor.cnpj.includes(termo) ||
        fornecedor.cidade.toLowerCase().includes(termo),
    )

    setFornecedoresFiltrados(filtrados)
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Lista de Fornecedores</h1>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar fornecedor..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={busca}
              onChange={handleBusca}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
          </div>

          <Link
            to="/fornecedores/cadastro"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          >
            <FaPlus className="mr-2" /> Novo Fornecedor
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Razão Social</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nome Fantasia</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">CNPJ</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Telefone</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Cidade/UF</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fornecedoresFiltrados.length > 0 ? (
                fornecedoresFiltrados.map((fornecedor) => (
                  <tr key={fornecedor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{fornecedor.razaoSocial}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{fornecedor.nomeFantasia}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{fornecedor.cnpj}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{fornecedor.telefone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {fornecedor.cidade}/{fornecedor.estado}
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
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    Nenhum fornecedor encontrado
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

export default FornecedoresLista
