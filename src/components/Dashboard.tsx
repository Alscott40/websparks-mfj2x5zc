import React from 'react'
import { useBotContext } from '../context/BotContext'
import StatsCard from './StatsCard'
import PerformanceChart from './PerformanceChart'
import RecentTrades from './RecentTrades'
import BotControls from './BotControls'

const Dashboard: React.FC = () => {
  const { botState } = useBotContext()

  const stats = [
    {
      title: 'Total Balance',
      value: `$${botState.balance.toLocaleString()}`,
      change: '+12.5%',
      icon: 'bi-wallet2',
      color: 'primary'
    },
    {
      title: 'Total Profit',
      value: `$${botState.totalProfit.toLocaleString()}`,
      change: '+8.2%',
      icon: 'bi-graph-up-arrow',
      color: 'success'
    },
    {
      title: 'Active Trades',
      value: botState.activeTrades.toString(),
      change: '3 pending',
      icon: 'bi-arrow-left-right',
      color: 'accent'
    },
    {
      title: 'Reserve Fund',
      value: `$${botState.reserveBalance.toLocaleString()}`,
      change: `${botState.reservePercentage}% rate`,
      icon: 'bi-shield-check',
      color: 'secondary'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Trading Dashboard</h2>
        <p className="text-secondary-300">Monitor your autonomous trading performance</p>
      </div>

      <BotControls />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <PerformanceChart />
        <RecentTrades />
      </div>

      <div className="bg-secondary-800/50 backdrop-blur-sm rounded-2xl border border-secondary-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <i className="bi bi-cpu mr-3 text-primary-400"></i>
          AI Strategy Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="bi bi-brain text-primary-400 text-2xl"></i>
            </div>
            <h4 className="font-semibold text-white mb-2">Market Sentiment</h4>
            <p className="text-success-400 font-medium">Bullish (78%)</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-accent-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="bi bi-lightning text-accent-400 text-2xl"></i>
            </div>
            <h4 className="font-semibold text-white mb-2">Strategy Confidence</h4>
            <p className="text-accent-400 font-medium">High (92%)</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-success-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="bi bi-target text-success-400 text-2xl"></i>
            </div>
            <h4 className="font-semibold text-white mb-2">Win Rate</h4>
            <p className="text-success-400 font-medium">85.3%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
