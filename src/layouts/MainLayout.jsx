"use client"

import { useState, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // Verificar preferência do usuário no localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed")
    if (savedState !== null) {
      setSidebarCollapsed(savedState === "true")
    }
  }, [])

  // Salvar preferência do usuário
  const toggleSidebarCollapsed = () => {
    const newState = !sidebarCollapsed
    setSidebarCollapsed(newState)
    localStorage.setItem("sidebarCollapsed", String(newState))
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar para desktop - agora com estado retrátil */}
      <div
        className={`hidden md:block bg-blue-800 text-white transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <Sidebar collapsed={sidebarCollapsed} />
      </div>

      {/* Sidebar móvel */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black opacity-50" onClick={toggleSidebar}></div>
          <div className="fixed inset-y-0 left-0 w-64 bg-blue-800 text-white z-50">
            <Sidebar closeSidebar={toggleSidebar} />
          </div>
        </div>
      )}

      {/* Conteúdo principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          toggleSidebarCollapsed={toggleSidebarCollapsed}
          sidebarCollapsed={sidebarCollapsed}
          user={user}
          onLogout={handleLogout}
        />

        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout
