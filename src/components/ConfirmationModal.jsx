"use client"

import { FaExclamationTriangle, FaCheck, FaTimes } from "react-icons/fa"

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay com efeito de desfoque */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal com efeito 3D */}
      <div
        className="bg-white rounded-lg overflow-hidden w-full max-w-md mx-4 relative"
        style={{
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
          transform: "perspective(1000px) rotateX(0deg)",
          transition: "transform 0.3s ease-out",
          animation: "modalAppear 0.3s forwards",
        }}
      >
        {/* Cabeçalho */}
        <div className="bg-red-600 text-white px-6 py-4 flex items-center">
          <FaExclamationTriangle className="text-2xl mr-3" />
          <h3 className="text-xl font-bold">{title || "Confirmação"}</h3>
        </div>

        {/* Corpo */}
        <div className="p-6">
          <p className="text-gray-700 text-lg">{message}</p>
        </div>

        {/* Rodapé com botões */}
        <div className="px-6 py-4 bg-gray-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center"
            style={{
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              transform: "perspective(500px) rotateX(5deg)",
            }}
          >
            <FaTimes className="mr-2" /> Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
            style={{
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              transform: "perspective(500px) rotateX(5deg)",
            }}
          >
            <FaCheck className="mr-2" /> Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
