import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface TradingChartProps {
  selectedPair: string
}

const TradingChart: React.FC<TradingChartProps> = ({ selectedPair }) => {
  const data = [
    { time: '09:00', price: 41800, volume: 1200 },
    { time: '10:00', price: 42100, volume: 1450 },
    { time: '11:00', price: 41950, volume: 1100 },
    { time: '12:00', price: 42300, volume: 1800 },
    { time: '13:00', price: 42150, volume: 1350 },
    { time: '14:00', price: 42450, volume: 1600 },
    { time: '15:00', price: 42200, volume: 1250 },
    { time: '16:00', price: 42350, volume: 1400 }
  ]

  return (
    <div className="bg-secondary-800/50 backdrop-blur-sm rounded-2xl border border-secondary-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <i className="bi bi-graph-up-arrow mr-3 text-primary-400"></i>
          {selectedPair} Chart
        </h3>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 bg-primary-600 text-white text-sm rounded-lg">1H</button>
          <button className="px-3 py-1 bg-secondary-700 text-secondary-300 text-sm rounded-lg hover:bg-secondary-600">4H</button>
          <button className="px-3 py-1 bg-secondary-700 text-secondary-300 text-sm rounded-lg hover:bg-secondary-600">1D</button>
          <button className="px-3 py-1 bg-secondary-700 text-secondary-300 text-sm rounded-lg hover:bg-secondary-600">1W</button>
        </div>
      </div>
      
      <div className="h-80">
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
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#f1f5f9'
              }}
              formatter={(value) => [`$${value.toLocaleString()}`, 'Price']}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#0ea5e9" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, stroke: '#0ea5e9', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default TradingChart
