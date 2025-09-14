import React from 'react'

const RecentTrades: React.FC = () => {
  const trades = [
    { pair: 'BTC/USDT', type: 'BUY', amount: '0.025', price: '$42,150', profit: '+$125', time: '2 min ago' },
    { pair: 'ETH/USDT', type: 'SELL', amount: '1.5', price: '$2,580', profit: '+$89', time: '5 min ago' },
    { pair: 'ADA/USDT', type: 'BUY', amount: '1000', price: '$0.45', profit: '+$23', time: '8 min ago' },
    { pair: 'SOL/USDT', type: 'SELL', amount: '5', price: '$98.50', profit: '+$67', time: '12 min ago' },
    { pair: 'DOT/USDT', type: 'BUY', amount: '50', price: '$7.25', profit: '+$15', time: '15 min ago' }
  ]

  return (
    <div className="bg-secondary-800/50 backdrop-blur-sm rounded-2xl border border-secondary-700 p-6">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <i className="bi bi-clock-history mr-3 text-accent-400"></i>
        Recent Trades
      </h3>
      <div className="space-y-4">
        {trades.map((trade, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-secondary-700/30 rounded-xl hover:bg-secondary-700/50 transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                trade.type === 'BUY' ? 'bg-success-600 text-white' : 'bg-danger-600 text-white'
              }`}>
                {trade.type === 'BUY' ? '↑' : '↓'}
              </div>
              <div>
                <p className="font-semibold text-white">{trade.pair}</p>
                <p className="text-xs text-secondary-400">{trade.amount} @ {trade.price}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-success-400">{trade.profit}</p>
              <p className="text-xs text-secondary-400">{trade.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentTrades
