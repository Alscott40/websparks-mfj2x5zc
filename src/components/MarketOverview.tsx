import React from 'react'

interface MarketOverviewProps {
  onPairSelect: (pair: string) => void
}

const MarketOverview: React.FC<MarketOverviewProps> = ({ onPairSelect }) => {
  const markets = [
    { pair: 'BTC/USDT', price: '$42,150.00', change: '+2.45%', volume: '$1.2B', high: '$43,200', low: '$41,800' },
    { pair: 'ETH/USDT', price: '$2,580.50', change: '+1.85%', volume: '$890M', high: '$2,620', low: '$2,540' },
    { pair: 'ADA/USDT', price: '$0.4520', change: '+3.12%', volume: '$245M', high: '$0.465', low: '$0.438' },
    { pair: 'SOL/USDT', price: '$98.50', change: '-0.75%', volume: '$180M', high: '$102', low: '$96.20' },
    { pair: 'DOT/USDT', price: '$7.25', change: '+1.20%', volume: '$95M', high: '$7.45', low: '$7.10' },
    { pair: 'MATIC/USDT', price: '$0.8950', change: '+4.25%', volume: '$120M', high: '$0.920', low: '$0.865' }
  ]

  return (
    <div className="bg-secondary-800/50 backdrop-blur-sm rounded-2xl border border-secondary-700 p-6">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <i className="bi bi-bar-chart mr-3 text-primary-400"></i>
        Market Overview
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-secondary-700">
              <th className="text-left text-secondary-300 font-medium py-3">Pair</th>
              <th className="text-right text-secondary-300 font-medium py-3">Price</th>
              <th className="text-right text-secondary-300 font-medium py-3">24h Change</th>
              <th className="text-right text-secondary-300 font-medium py-3">Volume</th>
              <th className="text-right text-secondary-300 font-medium py-3">High/Low</th>
            </tr>
          </thead>
          <tbody>
            {markets.map((market, index) => (
              <tr 
                key={index} 
                className="border-b border-secondary-700/50 hover:bg-secondary-700/30 cursor-pointer transition-all duration-200"
                onClick={() => onPairSelect(market.pair)}
              >
                <td className="py-4">
                  <span className="font-semibold text-white">{market.pair}</span>
                </td>
                <td className="text-right py-4">
                  <span className="font-semibold text-white">{market.price}</span>
                </td>
                <td className="text-right py-4">
                  <span className={`font-semibold ${
                    market.change.includes('+') ? 'text-success-400' : 'text-danger-400'
                  }`}>
                    {market.change}
                  </span>
                </td>
                <td className="text-right py-4">
                  <span className="text-secondary-300">{market.volume}</span>
                </td>
                <td className="text-right py-4">
                  <div className="text-xs">
                    <div className="text-success-400">{market.high}</div>
                    <div className="text-danger-400">{market.low}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MarketOverview
