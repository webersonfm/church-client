"use client"

import { useState, useEffect } from "react"
import { FaEdit, FaTrash, FaSearch, FaUserPlus, FaSync } from "react-icons/fa"
import { GoArrowLeft, GoArrowRight } from "react-icons/go"
import { Link } from "react-router-dom"
import axios from "axios"
import ConfirmationModal from "../../components/ConfirmationModal"
import API_CONFIG from "../../config/api"
import { cpf, cnpj } from "../../components/Functions"  // Adicione esta importação

const ClientesLista = () => {
    const [clientes, setClientes] = useState([])
    const [busca, setBusca] = useState("")
    const [campoBusca, setCampoBusca] = useState("razao_social")
    const [clientesFiltrados, setClientesFiltrados] = useState([])
    const [paginaAtual, setPaginaAtual] = useState(1)
    const [registrosPorPagina, setRegistrosPorPagina] = useState(10)
    const [totalRegistros, setTotalRegistros] = useState(0)
    const [totalRegistrosFiltrados, setTotalRegistrosFiltrados] = useState(0)
    const [loading, setLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [clienteParaExcluir, setClienteParaExcluir] = useState(null)

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get(`${API_CONFIG.BASE_URL}/clientes`)
                setClientes(response.data)
                setClientesFiltrados(response.data)
                setTotalRegistros(response.data.length)
                setLoading(false)
            } catch (error) {
                console.error("Erro ao buscar clientes:", error)
                setLoading(false)
            }
        }

        fetchClientes()
    }, [])

    const handleCampoBuscaChange = (e) => {
        setCampoBusca(e.target.value)
    }

    const handleBusca = (e) => {
        const termo = e.target.value.toLowerCase()
        setBusca(termo)

        if (termo === "") {
            setClientesFiltrados(clientes)
            setTotalRegistrosFiltrados(0)
        } else {
            const filtrados = clientes.filter((cliente) =>
                cliente[campoBusca]?.toLowerCase().includes(termo)
            )
            setClientesFiltrados(filtrados)
            setTotalRegistrosFiltrados(filtrados.length)
        }
    }

    const handlePaginaChange = (novaPagina) => {
        setPaginaAtual(novaPagina)
    }

    const handleRegistrosPorPaginaChange = (e) => {
        setRegistrosPorPagina(Number(e.target.value))
        setPaginaAtual(1)
    }

    const clientesPaginados = clientesFiltrados.slice(
        (paginaAtual - 1) * registrosPorPagina,
        paginaAtual * registrosPorPagina,
    )

    const handleDelete = async (codigo, razaoSocial) => {
        setClienteParaExcluir(codigo)
        setModalOpen(true)
        setClienteParaExcluir({ codigo, razaoSocial })
    }

    const confirmarExclusao = async () => {
        try {
            await axios.delete(`http://localhost:3000/delete/${clienteParaExcluir.codigo}`)
            setClientes(clientes.filter(cliente => cliente.codigo !== clienteParaExcluir.codigo))
            setClientesFiltrados(clientesFiltrados.filter(cliente => cliente.codigo !== clienteParaExcluir.codigo))
            setTotalRegistros(totalRegistros - 1)
            setTotalRegistrosFiltrados(totalRegistrosFiltrados - 1)
            setModalOpen(false)
            setClienteParaExcluir(null)
        } catch (error) {
            console.error("Erro ao excluir cliente:", error)
            setModalOpen(false)
            setClienteParaExcluir(null)
        }
    }

    const handleAtualizar = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${API_CONFIG.BASE_URL}/clientes`)
            setClientes(response.data)
            setClientesFiltrados(response.data)
            setTotalRegistros(response.data.length)
        } catch (error) {
            console.error("Erro ao atualizar clientes:", error)
        } finally {
            setLoading(false)
        }
    }

    function cpf(v) {
        // Remove tudo o que não é dígito
        v = v.replace(/\D/g, "")         
        
        // Coloca um ponto entre o terceiro e o quarto dígitos
        v = v.replace(/(\d{3})(\d)/, "$1.$2")       

        // Coloca um ponto entre o sexto e o sétimo dígitos
        v = v.replace(/(\d{3})(\d)/, "$1.$2")       // Coloca um ponto entre o sexto e o sétimo dígitos

        // Coloca um hífen entre o nono e o décimo dígitos
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2") 

        return v
    }

    function cnpj(v) {
        // Remove tudo o que não é dígito
        v = v.replace(/\D/g, "")                           

        // Coloca ponto entre o segundo e o terceiro dígitos
        v = v.replace(/^(\d{2})(\d)/, "$1.$2")             
        
        // Coloca ponto entre o quinto e o sexto dígitos
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") 
        
        // Coloca uma barra entre o oitavo e o nono dígitos
        v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")           

        // Coloca um hífen depois do bloco de quatro dígitos
        v = v.replace(/(\d{4})(\d)/, "$1-$2")              
        
        return v
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={handleAtualizar}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg 
                                    transform transition-transform duration-200 hover:scale-105 
                                    active:scale-95 shadow-lg hover:shadow-xl flex items-center gap-2"
                        style={{
                            background: 'linear-gradient(145deg, #3b82f6, #2563eb)',
                            boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.2), -3px -3px 6px rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        <FaSync className={`${loading ? 'animate-spin' : ''}`} />
                        Atualizar
                    </button>
                    {/* <select
                                value={campoBusca}
                                onChange={handleCampoBuscaChange}
                                className="border border-gray-300 rounded-md p-2"
                                style={{
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    transform: 'perspective(1000px) rotateX(10deg)',
                                }}
                            >
                                <option value="razao_social">Razão Social</option>
                                <option value="nome_fantasia">Nome Fantasia</option>
                            </select> */}

                    <Link
                        to="/clientes/cadastro"
                        className="bg-green-500 hover:bg-green-500 hover:text-white text-black 
                                                font-bold py-2 px-4 rounded flex items-center justify-center"
                        style={{
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            transform: 'perspective(1000px) rotateX(10deg)',
                        }}
                    >
                        <FaUserPlus className="mr-2" /> Novo Cliente
                    </Link>
                </div>
            </div>

            <div className="flex justify-between items-center mb-4">
                <div>
                    <label htmlFor="registrosPorPagina" className="mr-2">Registros por página:</label>
                    <select
                        id="registrosPorPagina"
                        value={registrosPorPagina}
                        onChange={handleRegistrosPorPaginaChange}
                        className="border border-gray-300 rounded-md p-2 cursor-pointer"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <div>
                    <span className="mr-4">Total de registros: {totalRegistros}</span>
                    <span>Registros filtrados: {totalRegistrosFiltrados}</span>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blue-800 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider">Código</th>
                                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">CPF / CNPJ</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nome Cliente</th>
                                <th className="px-10 py-3 text-left text-xs font-medium uppercase tracking-wider">Telefone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ativo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {clientesPaginados.length > 0 ? (
                                clientesPaginados.map((cliente, index) => (
                                    <tr key={cliente.codigo} className={index % 2 === 0 ? "bg-green-200 cursor-pointer" : "bg-white cursor-pointer"}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{cliente.CODIGO}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="text-sm text-gray-500">{cliente.CPF_CNPJ.length === 11 ? cpf(cliente.CPF_CNPJ) : cnpj(cliente.CPF_CNPJ)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{cliente.NOME}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{cliente.FONE_1}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{cliente.ATIVO === 'S' ? 'Sim' : 'Não'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-900"
                                                onClick={() => handleDelete(cliente.codigo, cliente.razao_social)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                        Servidor pode não estar ativo. Nenhuma Informção encontrada !!!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>


            <div className="flex justify-center mt-4">
                <button
                    className="px-4 py-2 mx-5 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => handlePaginaChange(paginaAtual - 1)}
                    disabled={paginaAtual === 1}
                    style={{
                        background: 'linear-gradient(145deg, #3b82f6, #2563eb)',
                        boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.2), -3px -3px 6px rgba(255, 255, 255, 0.1)'
                    }}
                >
                    Anterior
                </button>
                <button
                    className="px-4 py-2 mx-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => handlePaginaChange(paginaAtual + 1)}
                    disabled={clientesFiltrados.length <= paginaAtual * registrosPorPagina}
                    style={{
                        background: 'linear-gradient(145deg, #3b82f6, #2563eb)',
                        boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.2), -3px -3px 6px rgba(255, 255, 255, 0.1)'
                    }}
                >
                    Próximo
                </button>
            </div>
            <ConfirmationModal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false)
                    setClienteParaExcluir(null)
                }}
                onConfirm={confirmarExclusao}
                title="Confirmar Exclusão"
                message={`Excluir cliente: "${clienteParaExcluir?.razaoSocial}" ?`}
            />
        </div>
    )
}


export default ClientesLista