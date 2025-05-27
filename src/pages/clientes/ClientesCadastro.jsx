"use client"

import { useState } from "react"
import { FaUser, FaSave, FaTimes, FaArrowLeft } from "react-icons/fa"
import InputStyle from "../../components/InputStyle"
import ConfirmationModal from "../../components/ConfirmationModal"
import BrazilStates from "../../components/BrazilStates"
import { cpf, buscaCEP } from "../../components/Functions"

const ClientesCadastro = () => {
  const [formData, setFormData] = useState({
    cpf: "",
    dataNascimento: "",
    nome: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    telefone: "",
    observacoes: ""
  })

  const [foto, setFoto] = useState("")
  const [previewUrl, setPreviewUrl] = useState("")
  const [success, setSuccess] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const buscarNome = async (cpf, dataNascimento) => {
    try {
      // Remove caracteres não numéricos do CPF
      const cpfLimpo = cpf.replace(/\D/g, '')
      
      const response = await fetch(`http://api.portaldatransparencia.gov.br/api-de-dados/cpf/${cpfLimpo}`, {
        method: 'GET',
        headers: {
          'chave-api-dados': 'c660ba33832f086d9809d47e4bc2ce26',
          'Accept': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar dados: ${response.status}`)
      }

      const data = await response.json()
      if (data && data.nome) {
        setFormData(prev => ({
          ...prev,
          nome: data.nome
        }))
      }
    } catch (error) {
      console.error('Erro ao buscar nome:', error)
    }
  }

  const handleChange = async (e) => {
    const { name, value } = e.target
    let formattedValue = value

    if (name === 'cpf') {
      formattedValue = cpf(value)
      if (formattedValue === 'CPF inválido') {
        console.error('CPF inválido')
        return
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }))

    // Verifica se tanto CPF quanto data de nascimento estão preenchidos
    if ((name === 'cpf' || name === 'dataNascimento') && 
        formData.cpf && formData.dataNascimento) {
      const cpfValue = name === 'cpf' ? formattedValue : formData.cpf
      const dataValue = name === 'dataNascimento' ? formattedValue : formData.dataNascimento
      await buscarNome(cpfValue, dataValue)
    }

    if (name === 'cep') {
      const cepLimpo = value.replace(/\D/g, '')
      if (cepLimpo.length === 8) {
        const endereco = await buscaCEP(cepLimpo)
        if (endereco) {
          setFormData(prev => ({
            ...prev,
            [name]: value,
            endereco: endereco.endereco,
            bairro: endereco.bairro,
            cidade: endereco.cidade,
            estado: endereco.estado
          }))
          return
        }
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }))
  }

  const handleFotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFoto(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para salvar os dados
    console.log("Dados do formulário:", formData)
    console.log("Foto:", foto)

    // Simulação de sucesso
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  const handleReset = () => {
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      cpf: "",
      endereco: "",
      cidade: "",
      estado: "",
      cep: "",
      observacoes: "",
    })
    setFoto(null)
    setPreviewUrl("")

    // Resetar o campo de input file
    const fileInput = document.querySelector('input[type="file"]')
    if (fileInput) {
      fileInput.value = ""
    }
  }

  const handleReturn = () => {
    setShowModal(true)
  }

  const handleConfirmReturn = () => {
    setShowModal(false)
    window.history.back()
  }

  const handleCancelReturn = () => {
    setShowModal(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Cadastro de Cliente</h1>
        <button
          onClick={handleReturn}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm 
          text-sm font-medium text-white bg-blue-600 hover:bg-blue-800
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FaArrowLeft className="mr-2" />
          Voltar
        </button>
      </div>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 
        px-4 py-3 rounded mb-4">
          Cliente cadastrado com sucesso!
        </div>
      )}

      <div className="bg-slate-300 rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputStyle
                  id="cpf"
                  name="cpf"
                  label="CPF *"
                  value={formData.cpf}
                  onChange={handleChange}
                  required
                />
                <InputStyle
                  id="dataNascimento"
                  name="dataNascimento"
                  type="date"
                  label="Data de Nascimento *"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                  required
                />
                <InputStyle
                  id="nome"
                  name="nome"
                  label="Nome Completo *"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="md:col-span-2"
                />
                <InputStyle
                  id="cep"
                  name="cep"
                  label="CEP *"
                  value={formData.cep}
                  onChange={handleChange}
                  required
                />
                <InputStyle
                  id="endereco"
                  name="endereco"
                  label="Endereço *"
                  value={formData.endereco}
                  onChange={handleChange}
                  required
                />
                <InputStyle
                  id="numero"
                  name="numero"
                  label="Número *"
                  value={formData.numero}
                  onChange={handleChange}
                  required
                />
                <InputStyle
                  id="complemento"
                  name="complemento"
                  label="Complemento"
                  value={formData.complemento}
                  onChange={handleChange}
                />
                <InputStyle
                  id="bairro"
                  name="bairro"
                  label="Bairro *"
                  value={formData.bairro}
                  onChange={handleChange}
                  required
                />
                <InputStyle
                  id="cidade"
                  name="cidade"
                  label="Cidade *"
                  value={formData.cidade}
                  onChange={handleChange}
                  required
                />
                <BrazilStates
                  id="estado"
                  name="estado"
                  label="Estado *"
                  value={formData.estado}
                  onChange={handleChange}
                  required
                />
                <InputStyle
                  id="telefone"
                  name="telefone"
                  label="Telefone *"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                />
                <InputStyle
                  id="observacoes"
                  name="observacoes"
                  label="Observações"
                  value={formData.observacoes}
                  onChange={handleChange}
                  className="md:col-span-2"
                />
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Foto
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="
                    w-64 
                    flex flex-col 
                    items-center 
                    px-4 py-6 
                    bg-gradient-to-r from-blue-500 to-blue-600
                    rounded-xl
                    shadow-[0_8px_16px_rgba(0,0,0,0.1)]
                    transform hover:-translate-y-1
                    transition-all duration-300
                    border-4 border-white
                    cursor-pointer
                    group
                  ">
                    <div className="
                      p-4 
                      rounded-full 
                      bg-white 
                      shadow-inner 
                      group-hover:scale-110 
                      transition-transform duration-300
                    ">
                      <FaUser className="w-8 h-8 text-blue-500" />
                    </div>
                    <span className="
                      mt-4 
                      text-base 
                      font-semibold 
                      text-white 
                      group-hover:text-blue-100
                      transition-colors duration-300
                    ">
                      {foto ? foto.name : "Selecionar Foto"}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFotoChange}
                      accept="image/*"
                    />
                  </label>
                </div>
                {previewUrl && (
                  <div className="mt-4 relative group">
                    <div className="
                      absolute 
                      inset-0 
                      rounded-xl 
                      bg-gradient-to-r from-blue-500/20 to-blue-600/20 
                      opacity-0 
                      group-hover:opacity-100 
                      transition-opacity duration-300
                    "></div>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="
                        w-full 
                        h-auto 
                        rounded-xl 
                        shadow-lg 
                        transform 
                        transition-all duration-300 
                        group-hover:scale-[1.02]
                      "
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-4">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm 
              text-sm font-medium text-white bg-red-500 hover:bg-red-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaTimes className="mr-2" />
              Limpar
            </button>
            <button
              type="submit"
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaSave className="mr-2" />
              Salvar
            </button>
          </div>
        </form>
      </div>

      <ConfirmationModal
        isOpen={showModal}
        onClose={handleCancelReturn}
        onConfirm={handleConfirmReturn}
        title="Confirmar Retorno"
        message="Deseja cancelar inclusão?"
      />

    </div>
  )
}

export default ClientesCadastro