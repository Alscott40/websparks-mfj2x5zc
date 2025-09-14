import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const PerformanceChart: React.FC = () => {
  const data = [
    { time: '00:00', profit: 0 },
    { time: '04:00', profit: 150 },
    { time: '08:00', profit: 280 },
    { time: '12:00', profit: 420 },
    { time: '16:00', profit: 380 },
    { time: '20:00', profit: 650 },
    { time: '24:00', profit: 820 }
  ]

  return (
    <div className="bg-secondary-800/50 backdrop-blur-sm rounded-2xl border border-secondary-700 p-6">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <i className="bi bi-graph-up mr-3 text-primary-400"></i>
        Performance Chart
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="time" 
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#f1f5f9'
              }}
              formatter={(value) => [`$${value}`, 'Profit']}
            />
            <Line 
              type="monotone" 
              dataKey="profit" 
              stroke="#0ea5e9" 
              strokeWidth={3}
              dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#0ea5e9', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PerformanceChart
