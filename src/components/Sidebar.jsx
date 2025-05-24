"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  FaTachometerAlt, FaUsers, FaBuilding, FaChevronDown,
  FaChevronUp, FaTimes, FaBoxOpen, FaClipboardList,
  FaChartLine, FaCog, FaFileInvoiceDollar, FaShoppingCart,
  FaTruck, FaWarehouse, FaTools, FaUserPlus
} from "react-icons/fa"
import "./Sidebar-style.css"

const MenuItem = ({ icon, title, to, submenu, isActive, location, collapsed }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const toggleSubmenu = (e) => {
    if (submenu) {
      e.preventDefault()
      setIsOpen(!isOpen)
    }
  }

  return (
    <div className="mb-2">
      <Link
        to={to || "#"}
        className={`
          flex items-center px-4 py-3 text-white rounded-lg transition-all duration-300
          transform hover:translate-x-1 menu-item-3d menu-item-glow
          ${isActive ? "bg-gradient-to-r from-blue-700 to-blue-600" : "hover:bg-blue-700/50"}
          ${isHovered ? "shadow-lg shadow-blue-500/30" : ""}
        `}
        onClick={toggleSubmenu}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title={collapsed ? title : ""}
      >
        <div className={`
          mr-3 text-xl transform transition-transform duration-300 menu-icon
          ${isHovered ? "scale-110 rotate-6" : ""}
        `}>
          {icon}
        </div>
        {!collapsed && (
          <>
            <span className="flex-1 font-medium">{title}</span>
            {submenu && (
              <span className={`ml-auto transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                <FaChevronDown />
              </span>
            )}
          </>
        )}
      </Link>

      {submenu && isOpen && !collapsed && (
        <div className="pl-6 mt-1 space-y-1 animate-fadeIn submenu-3d">
          {submenu.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`
                block px-4 py-2.5 text-sm text-white rounded-md transition-all duration-200
                hover:bg-blue-600/50 hover:translate-x-2 menu-item-glow
                ${location.pathname === item.to ? "bg-blue-700/30 shadow-md shadow-blue-500/20" : ""}
              `}
            >
              <div className="flex items-center">
                <span className="mr-2 text-blue-300 menu-icon">{item.icon}</span>
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

const Sidebar = ({ closeSidebar, collapsed = false }) => {
  const location = useLocation()

  const menuItems = [
    {
      icon: <FaChartLine />,
      title: "Dashboard",
      to: "/",
    },
    {
      icon: <FaUsers />,
      title: "Clientes",
      submenu: [
        { icon: <FaUserPlus />, title: "Cadastrar", to: "/clientes/cadastro" },
        { icon: <FaClipboardList />, title: "Listagem", to: "/clientes/lista" },
        { icon: <FaFileInvoiceDollar />, title: "Financeiro", to: "/clientes/financeiro" },
      ],
    },
    {
      icon: <FaBuilding />,
      title: "Fornecedores",
      submenu: [
        { icon: <FaBoxOpen />, title: "Cadastrar", to: "/fornecedores/cadastro" },
        { icon: <FaClipboardList />, title: "Listar", to: "/fornecedores/lista" },
        { icon: <FaTruck />, title: "Entregas", to: "/fornecedores/entregas" },
      ],
    },
    {
      icon: <FaShoppingCart />,
      title: "Produtos",
      submenu: [
        { icon: <FaBoxOpen />, title: "Cadastro", to: "/produtos/cadastro" },
        { icon: <FaWarehouse />, title: "Estoque", to: "/produtos/estoque" },
        { icon: <FaTools />, title: "Categorias", to: "/produtos/categorias" },
      ],
    },
    {
      icon: <FaCog />,
      title: "Configurações",
      to: "/configuracoes",
    },
  ]

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900">
      <div className={`
        flex items-center ${collapsed ? "justify-center" : "justify-between"}
        p-6 border-b border-blue-700/50 backdrop-blur-sm
      `}>
        {!collapsed ? (
          <>
            <h2 className="text-2xl font-bold text-white tracking-wide">
              Sistema
            </h2>
            {closeSidebar && (
              <button
                onClick={closeSidebar}
                className="text-white hover:rotate-90 transition-transform duration-300"
              >
                <FaTimes />
              </button>
            )}
          </>
        ) : (
          <div className="text-white p-2 rounded-lg bg-blue-700/30 backdrop-blur-sm">
            <FaTachometerAlt className="h-6 w-6" />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              title={item.title}
              to={item.to}
              submenu={item.submenu}
              location={location}
              collapsed={collapsed}
              isActive={
                location.pathname === item.to ||
                (item.submenu && item.submenu.some((subItem) => location.pathname === subItem.to))
              }
            />
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
