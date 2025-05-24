"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { FaUser, FaLock } from "react-icons/fa"

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientY - innerHeight / 2) / 30
      const y = -(clientX - innerWidth / 2) / 30
      setRotation({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!username || !password) {
      setError("Por favor, preencha todos os campos")
      return
    }

    if (username === "admin" && password === "admin") {
      login({ name: "Administrador", username })
      navigate("/")
    } else {
      setError("Usuário ou senha inválidos")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-black perspective-1000">
      <div 
        className="relative bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md transform-gpu transition-transform duration-300"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform">
            <FaLock className="text-white text-6xl" />
          </div>
        </div>

        <div className="text-center mb-8 mt-12">
          <h1 className="text-3xl font-bold text-white">Sistema de Gerenciamento</h1>
          <p className="text-gray-300 mt-2">Faça login para acessar o sistema</p>
        </div>

        {error && <div className="bg-red-500/20 border border-red-400 text-red-100 px-4 py-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">
              Usuário
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-blue-400" />
              </div>
              <input
                id="username"
                type="text"
                className="pl-10 w-full p-3 bg-white/5 border border-blue-400/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Digite seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
              Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-blue-400" />
              </div>
              <input
                id="password"
                type="password"
                className="pl-10 w-full p-3 bg-white/5 border border-blue-400/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 transform hover:scale-105"
          >
            Entrar
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-400">
          <p>Use admin/admin para testar o sistema</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
