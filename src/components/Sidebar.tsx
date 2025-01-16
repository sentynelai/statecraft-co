import React from 'react';
import { useProvincialData } from '../hooks/useStoreData';
import { Users, School, Building2, TrendingUp } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { data: provincialData, isLoading } = useProvincialData();

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-dark-800/50 rounded-lg mb-4"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-dark-800/50 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const totals = provincialData.reduce((acc, curr) => ({
    poblacion: acc.poblacion + curr.poblacion,
    escuelas: acc.escuelas + curr.escuelas,
    hospitales: acc.hospitales + curr.hospitales,
    presupuesto: acc.presupuesto + curr.presupuesto
  }), {
    poblacion: 0,
    escuelas: 0,
    hospitales: 0,
    presupuesto: 0
  });

  const stats = [
    {
      label: 'Población Total',
      value: totals.poblacion.toLocaleString('es-AR'),
      icon: Users,
      color: 'text-[#00FF9C]'
    },
    {
      label: 'Escuelas',
      value: totals.escuelas.toLocaleString('es-AR'),
      icon: School,
      color: 'text-blue-400'
    },
    {
      label: 'Hospitales',
      value: totals.hospitales.toLocaleString('es-AR'),
      icon: Building2,
      color: 'text-purple-400'
    },
    {
      label: 'Presupuesto',
      value: `$${(totals.presupuesto / 1000000).toFixed(1)}M`,
      icon: TrendingUp,
      color: 'text-green-400'
    }
  ];

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold mb-6">Entre Ríos</h1>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass p-4 rounded-lg">
            <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
            <div className="text-sm text-dark-400">{stat.label}</div>
            <div className="text-lg font-semibold">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-sm font-medium text-dark-400 mb-3">Departamentos</h2>
        <div className="space-y-2 max-h-[calc(100vh-20rem)] overflow-y-auto">
          {provincialData.map((dept) => (
            <div key={dept.departamento} className="glass p-3 rounded-lg hover:bg-dark-800/50 cursor-pointer transition-colors">
              <div className="flex justify-between items-center">
                <span>{dept.departamento}</span>
                <span className="text-sm text-dark-400">
                  {dept.poblacion.toLocaleString('es-AR')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};