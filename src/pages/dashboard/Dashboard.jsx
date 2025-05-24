import { FaUsers, FaBuilding, FaChartLine, FaCalendarAlt } from "react-icons/fa"

const StatCard = ({ icon, title, value, color }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-t-4 ${color}`}>
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color.replace("border", "bg")} bg-opacity-20`}>{icon}</div>
        <div className="ml-4">
          <h3 className="text-gray-500 text-sm">{title}</h3>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  )
}

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<FaUsers className="h-6 w-6 text-blue-600" />}
          title="Total de Clientes"
          value="124"
          color="border-blue-600"
        />
        <StatCard
          icon={<FaBuilding className="h-6 w-6 text-yellow-600" />}
          title="Total de Fornecedores"
          value="38"
          color="border-yellow-600"
        />
        <StatCard
          icon={<FaChartLine className="h-6 w-6 text-green-600" />}
          title="Vendas do Mês"
          value="R$ 24.500"
          color="border-green-600"
        />
        <StatCard
          icon={<FaCalendarAlt className="h-6 w-6 text-red-600" />}
          title="Agendamentos"
          value="12"
          color="border-red-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Bem-vindo ao Sistema</h2>
          <p className="text-gray-600">
            Este é o painel de controle do seu sistema de gerenciamento. Aqui você pode acessar todas as funcionalidades
            disponíveis através do menu lateral.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-bold text-blue-800 mb-2">Clientes</h3>
              <p className="text-sm text-gray-600">
                Gerencie o cadastro de clientes, visualize históricos e atualize informações.
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="font-bold text-yellow-800 mb-2">Fornecedores</h3>
              <p className="text-sm text-gray-600">Cadastre e gerencie seus fornecedores, produtos e serviços.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Atividades Recentes</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-start border-b border-gray-200 pb-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FaUsers className="h-4 w-4 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Cliente {item} foi cadastrado</p>
                  <p className="text-xs text-gray-500">
                    Há {item} hora{item !== 1 ? "s" : ""} atrás
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
