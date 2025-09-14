import React from 'react'

interface OrderBookProps {
  selectedPair: string
}

const OrderBook: React.FC<OrderBookProps> = ({ selectedPair }) => {
  const bids = [
    { price: '42,148.50', amount: '0.125', total: '5,268.56' },
    { price: '42,147.00', amount: '0.250', total: '10,536.75' },
    { price: '42,145.50', amount: '0.180', total: '7,586.19' },
    { price: '42,144.00', amount: '0.320', total: '13,486.08' },
    { price: '42,142.50', amount: '0.095', total: '4,003.54' }
  ]

  const asks = [
    { price: '42,152.00', amount: '0.085', total: '3,582.92' },
    { price: '42,153.50', amount: '0.195', total: '8,219.93' },
    { price: '42,155.00', amount: '0.275', total: '11,592.63' },
    { price: '42,156.50', amount: '0.140', total: '5,901.91' },
    { price: '42,158.00', amount: '0.220', total: '9,274.76' }
  ]

  return (
    <div className="bg-secondary-800/50 backdrop-blur-sm rounded-2xl border border-secondary-700 p-6">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <i className="bi bi-list-ol mr-3 text-accent-400"></i>
        Order Book
      </h3>
      <div className="text-center mb-4">
        <span className="text-secondary-300 text-sm">{selectedPair}</span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs text-secondary-400 mb-2">
            <span>Price</span>
            <span>Amount</span>
            <span>Total</span>
          </div>
          
          <div className="space-y-1">
            {asks.reverse().map((ask, index) => (
              <div key={index} className="flex justify-between text-xs py-1 hover:bg-danger-900/20 rounded">
                <span className="text-danger-400 font-mono">{ask.price}</span>
                <span className="text-white font-mono">{ask.amount}</span>
                <span className="text-secondary-300 font-mono">{ask.total}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-secondary-700 pt-4">
          <div className="text-center py-2">
            <span className="text-lg font-bold text-white">$42,150.25</span>
            <div className="text-xs text-success-400">+$1,025.50 (+2.49%)</div>
          </div>
        </div>

        <div>
          <div className="space-y-1">
            {bids.map((bid, index) => (
              <div key={index} className="flex justify-between text-xs py-1 hover:bg-success-900/20 rounded">
                <span className="text-success-400 font-mono">{bid.price}</span>
                <span className="text-white font-mono">{bid.amount}</span>
                <span className="text-secondary-300 font-mono">{bid.total}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderBook
