"use client"

import { FaExclamationTriangle, FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa"

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, type = 'tpConfirm' }) => {
  if (!isOpen) return null

  const modalStyles = {
    tpWarning: {
      gradient: "linear-gradient(135deg, #4ADE80, #22C55E)",
      icon: <FaInfoCircle className="text-2xl text-white" />,
      buttonBg: "bg-green-500 hover:bg-green-600",
      buttonShadow: "0 4px 6px -1px rgba(186, 197, 34, 0.3), 0 2px 4px -1px rgba(34, 197, 94, 0.2)",
      confirmText: "OK",
      showCancel: false
    },
    tpConfirm: {
      gradient: "linear-gradient(135deg, #60A5FA, #3B82F6)",
      icon: <FaCheck className="text-2xl text-white" />,
      buttonBg: "bg-blue-500 hover:bg-blue-600",
      buttonShadow: "0 4px 6px -1px rgba(59, 130, 246, 0.3), 0 2px 4px -1px rgba(59, 130, 246, 0.2)",
      confirmText: "Confirmar",
      showCancel: true
    },
    tpDelete: {
      gradient: "linear-gradient(135deg, #EF4444, #DC2626)",
      icon: <FaExclamationTriangle className="text-2xl text-white" />,
      buttonBg: "bg-red-500 hover:bg-red-600",
      buttonShadow: "0 4px 6px -1px rgba(220, 38, 38, 0.3), 0 2px 4px -1px rgba(220, 38, 38, 0.2)",
      confirmText: "Deletar",
      showCancel: true
    }
  }

  const currentStyle = modalStyles[type]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-all duration-300" 
        onClick={onClose}
        style={{
          animation: "fadeIn 0.3s ease-out"
        }}
      ></div>

      <div
        className="bg-white rounded-2xl overflow-hidden w-full max-w-md mx-4 relative"
        style={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 -2px 6px 0 rgba(255, 255, 255, 0.1)",
          transform: "perspective(1500px) rotateX(0deg)",
          transformOrigin: "top",
          animation: "modalSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div 
          className="px-6 py-4 flex items-center"
          style={{
            background: currentStyle.gradient,
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          }}
        >
          <div className="bg-white/20 p-2 rounded-lg mr-3">
            {currentStyle.icon}
          </div>
          <h3 className="text-xl font-semibold text-white">{title || "Confirmação"}</h3>
        </div>

        <div className="p-8 bg-gradient-to-b from-gray-50 to-white">
          <p className="text-gray-600 text-lg leading-relaxed">{message}</p>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-4">
          {currentStyle.showCancel && (
            <button
              onClick={onClose}
              className="group px-5 py-2.5 bg-white text-gray-600 rounded-xl border border-gray-200 
                       hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center"
              style={{
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              <FaTimes className="mr-2 group-hover:scale-110 transition-transform duration-300" /> 
              Cancelar
            </button>
          )}
          <button
            onClick={onConfirm}
            className={`group px-5 py-2.5 text-white rounded-xl 
                     transition-all duration-300 flex items-center ${currentStyle.buttonBg}`}
            style={{
              boxShadow: currentStyle.buttonShadow,
            }}
          >
            <FaCheck className="mr-2 group-hover:scale-110 transition-transform duration-300" /> 
            {currentStyle.confirmText}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: perspective(1500px) rotateX(-15deg) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: perspective(1500px) rotateX(0deg) translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default ConfirmationModal
