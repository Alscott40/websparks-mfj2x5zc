import React, { useState } from 'react'
import MarketOverview from './MarketOverview'
import OrderBook from './OrderBook'
import TradingChart from './TradingChart'

const TradingView: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState('BTC/USDT')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Live Trading</h2>
        <p className="text-secondary-300">Real-time market data and trading opportunities</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <TradingChart selectedPair={selectedPair} />
          <MarketOverview onPairSelect={setSelectedPair} />
        </div>
        <div className="space-y-6">
          <OrderBook selectedPair={selectedPair} />
        </div>
      </div>
    </div>
  )
}

export default TradingView
