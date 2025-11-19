import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Users, TrendingUp, AlertOctagon, Map } from 'lucide-react';

const yieldData = [
  { name: 'Rice', yield: 4000, target: 4500 },
  { name: 'Cassava', yield: 3000, target: 2800 },
  { name: 'Cocoa', yield: 2000, target: 2200 },
  { name: 'Palm', yield: 2780, target: 2500 },
];

const riskData = [
  { name: 'Pest Risk', value: 400 },
  { name: 'Drought', value: 300 },
  { name: 'Flood', value: 300 },
  { name: 'Healthy', value: 2000 },
];

const COLORS = ['#ef4444', '#f97316', '#3b82f6', '#22c55e'];

const CoopDashboard: React.FC = () => {
  return (
    <div className="bg-gray-50 h-full overflow-y-auto pb-20">
      <div className="bg-white p-6 border-b border-gray-200 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-900">Cooperative Dashboard</h1>
        <p className="text-gray-500 text-sm">Region: Bo District • 124 Member Farms</p>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Farmers</p>
            <p className="text-xl font-bold text-gray-900">124</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-leaf-50 text-leaf-600 rounded-lg">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Yield Est.</p>
            <p className="text-xl font-bold text-gray-900">42.5 Tons</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-lg">
            <AlertOctagon size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Critical Alerts</p>
            <p className="text-xl font-bold text-gray-900">3</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <Map size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Fields Mapped</p>
            <p className="text-xl font-bold text-gray-900">98%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
        {/* Yield Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6">Harvest Yield vs Target (Kg)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yieldData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="yield" fill="#22c55e" radius={[4, 4, 0, 0]} name="Current Yield" />
                <Bar dataKey="target" fill="#e5e7eb" radius={[4, 4, 0, 0]} name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Map */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6">Farm Health Status</h3>
          <div className="h-64 w-full flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 rounded-xl p-6 text-white shadow-lg">
           <h3 className="font-bold text-lg mb-2">Extension Officer Tasks</h3>
           <div className="space-y-3">
              <div className="flex items-center justify-between bg-white/10 p-3 rounded-lg">
                 <span>Visit Farm #42 (Rice Blast reported)</span>
                 <span className="text-xs bg-red-500 px-2 py-1 rounded">Urgent</span>
              </div>
              <div className="flex items-center justify-between bg-white/10 p-3 rounded-lg">
                 <span>Distribute NPK Fertilizer to Zone B</span>
                 <span className="text-xs bg-blue-500 px-2 py-1 rounded">Pending</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CoopDashboard;
