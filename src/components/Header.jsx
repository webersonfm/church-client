"use client"
import { FaBars, FaUserCircle, FaSignOutAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa"

const Header = ({ toggleSidebar, toggleSidebarCollapsed, sidebarCollapsed, user, onLogout }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          {/* Botão para dispositivos móveis */}
          <button onClick={toggleSidebar} className="text-blue-800 md:hidden focus:outline-none">
            <FaBars className="h-6 w-6" />
          </button>

          {/* Botão para recolher/expandir o menu em desktop */}
          <button
            onClick={toggleSidebarCollapsed}
            className="hidden md:flex text-blue-800 focus:outline-none mr-3 hover:bg-blue-50 p-2 rounded-full"
            title={sidebarCollapsed ? "Expandir menu" : "Recolher menu"}
          >
            {sidebarCollapsed ? <FaChevronRight className="h-5 w-5" /> : <FaChevronLeft className="h-5 w-5" />}
          </button>

          <h1 className="ml-2 text-xl font-bold text-blue-800">Sistema de Gerenciamento</h1>
        </div>

        <div className="flex items-center">
          <div className="mr-4 text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-700">Bem-vindo,</p>
            <p className="text-sm font-bold text-blue-800">{user?.name || "Usuário"}</p>
          </div>

          <div className="relative">
            <button className="flex items-center text-gray-700 focus:outline-none" onClick={onLogout}>
              <FaUserCircle className="h-8 w-8 text-blue-700" />
              <FaSignOutAlt className="ml-2 h-5 w-5 text-red-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
