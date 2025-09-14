import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const Portfolio: React.FC = () => {
  const holdings = [
    { symbol: 'BTC', name: 'Bitcoin', amount: '0.25', value: '$10,537.50', change: '+2.45%', allocation: 35 },
    { symbol: 'ETH', name: 'Ethereum', amount: '4.2', value: '$10,838.10', change: '+1.85%', allocation: 36 },
    { symbol: 'ADA', name: 'Cardano', amount: '5000', value: '$2,260.00', change: '+3.12%', allocation: 8 },
    { symbol: 'SOL', name: 'Solana', amount: '25', value: '$2,462.50', change: '-0.75%', allocation: 8 },
    { symbol: 'DOT', name: 'Polkadot', amount: '150', value: '$1,087.50', change: '+1.20%', allocation: 4 },
    { symbol: 'USDT', name: 'Tether', amount: '2814.40', value: '$2,814.40', change: '0.00%', allocation: 9 }
  ]

  const pieData = holdings.map(holding => ({
    name: holding.symbol,
    value: holding.allocation,
    color: getColorForSymbol(holding.symbol)
  }))

  function getColorForSymbol(symbol: string) {
    const colors: { [key: string]: string } = {
      'BTC': '#f7931a',
      'ETH': '#627eea',
      'ADA': '#0033ad',
      'SOL': '#9945ff',
      'DOT': '#e6007a',
      'USDT': '#26a17b'
    }
    return colors[symbol] || '#64748b'
  }

  const totalValue = holdings.reduce((sum, holding) => sum + parseFloat(holding.value.replace('$', '').replace(',', '')), 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Portfolio</h2>
        <p className="text-secondary-300">Your cryptocurrency holdings and performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-secondary-800/50 backdrop-blur-sm rounded-2xl border border-secondary-700 p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <i className="bi bi-wallet2 mr-3 text-primary-400"></i>
              Holdings
            </h3>
            <div className="space-y-4">
              {holdings.map((holding, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-secondary-700/30 rounded-xl hover:bg-secondary-700/50 transition-all duration-200">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: getColorForSymbol(holding.symbol) }}
                    >
                      {holding.symbol}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{holding.name}</p>
                      <p className="text-sm text-secondary-400">{holding.amount} {holding.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">{holding.value}</p>
                    <p className={`text-sm ${
                      holding.change.includes('+') ? 'text-success-400' : 
                      holding.change.includes('-') ? 'text-danger-400' : 'text-secondary-400'
                    }`}>
                      {holding.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-secondary-800/50 backdrop-blur-sm rounded-2xl border border-secondary-700 p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <i className="bi bi-pie-chart mr-3 text-accent-400"></i>
              Allocation
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#f1f5f9'
                    }}
                    formatter={(value) => [`${value}%`, 'Allocation']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-secondary-800/50 backdrop-blur-sm rounded-2xl border border-secondary-700 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Portfolio Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-secondary-300">Total Value</span>
                <span className="font-semibold text-white">${totalValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-300">24h Change</span>
                <span className="font-semibold text-success-400">+$1,247.85 (+4.32%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-300">Total Profit/Loss</span>
                <span className="font-semibold text-success-400">+$3,892.15 (+14.85%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Portfolio
