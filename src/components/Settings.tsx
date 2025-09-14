import React, { useState } from 'react'
import { useBotContext } from '../context/BotContext'
import { toast } from 'react-hot-toast'

const Settings: React.FC = () => {
  const { botState, updateSettings } = useBotContext()
  const [settings, setSettings] = useState({
    selectedStrategy: botState.selectedStrategy,
    reservePercentage: botState.reservePercentage,
    riskLevel: 'Medium',
    maxTradeAmount: 1000,
    stopLoss: 5,
    takeProfit: 10,
    apiKeys: {
      kraken: '',
      kucoin: '',
      groq: '',
      coingecko: '',
      newsapi: ''
    }
  })

  const handleSave = async () => {
    try {
      await updateSettings(settings)
      toast.success('Settings saved successfully!')
    } catch (error) {
      toast.error('Failed to save settings')
    }
  }

  const strategies = [
    { id: 'trend', name: 'Trend Following', description: 'Follow market trends and momentum' },
    { id: 'grid', name: 'Grid Trading', description: 'Place buy/sell orders at regular intervals' },
    { id: 'dca', name: 'Dollar Cost Averaging', description: 'Regular purchases regardless of price' },
    { id: 'scalping', name: 'Scalping', description: 'Quick trades for small profits' },
    { id: 'mean-reversion', name: 'Mean Reversion', description: 'Trade based on price returning to average' }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Settings</h2>
        <p className="text-secondary-300">Configure your trading bot parameters</p>
      </div>

      <div className="space-y-8">
        <div className="bg-secondary-800/50 backdrop-blur-sm rounded-2xl border border-secondary-700 p-6">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <i className="bi bi-cpu mr-3 text-primary-400"></i>
            Trading Strategy
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {strategies.map((strategy) => (
              <div
                key={strategy.id}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  settings.selectedStrategy === strategy.name
                    ? 'border-primary-500 bg-primary-900/20'
                    : 'border-secondary-600 bg-secondary-700/30 hover:border-secondary-500'
                }`}
                onClick={() => setSettings({ ...settings, selectedStrategy: strategy.name })}
              >
                <h4 className="font-semibold text-white mb-2">{strategy.name}</h4>
                <p className="text-sm text-secondary-300">{strategy.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-secondary-800/50 backdrop-blur-sm rounded-2xl border border-secondary-700 p-6">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <i className="bi bi-sliders mr-3 text-accent-400"></i>
            Risk Management
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-secondary-300 mb-2">
                Reserve Percentage
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={settings.reservePercentage}
                onChange={(e) => setSettings({ ...settings, reservePercentage: parseInt(e.target.value) })}
                className="w-full h-2 bg-secondary-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-secondary-400 mt-1">
                <span>0%</span>
                <span className="text-primary-400 font-semibold">{settings.reservePercentage}%</span>
                <span>50%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-300 mb-2">
                Max Trade Amount ($)
              </label>
              <input
                type="number"
                value={settings.maxTradeAmount}
                onChange={(e) => setSettings({ ...settings, maxTradeAmount: parseInt(e.target.value) })}
                className="w-full px-4 py-2 bg-secondary-700 border border-secondary-600 rounded-lg text-white focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-300 mb-2">
                Stop Loss (%)
              </label>
              <input
                type="number"
                value={settings.stopLoss}
                onChange={(e) => setSettings({ ...settings, stopLoss: parseInt(e.target.value) })}
                className="w-full px-4 py-2 bg-secondary-700 border border-secondary-600 rounded-lg text-white focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-300 mb-2">
                Take Profit (%)
              </label>
              <input
                type="number"
                value={settings.takeProfit}
                onChange={(e) => setSettings({ ...settings, takeProfit: parseInt(e.target.value) })}
                className="w-full px-4 py-2 bg-secondary-700 border border-secondary-600 rounded-lg text-white focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-secondary-800/50 backdrop-blur-sm rounded-2xl border border-secondary-700 p-6">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <i className="bi bi-key mr-3 text-success-400"></i>
            API Configuration
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-300 mb-2">
                Kraken API Key
              </label>
              <input
                type="password"
                placeholder="Enter your Kraken API key"
                value={settings.apiKeys.kraken}
                onChange={(e) => setSettings({ 
                  ...settings, 
                  apiKeys: { ...settings.apiKeys, kraken: e.target.value }
                })}
                className="w-full px-4 py-2 bg-secondary-700 border border-secondary-600 rounded-lg text-white focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-300 mb-2">
                KuCoin API Key
              </label>
              <input
                type="password"
                placeholder="Enter your KuCoin API key"
                value={settings.apiKeys.kucoin}
                onChange={(e) => setSettings({ 
                  ...settings, 
                  apiKeys: { ...settings.apiKeys, kucoin: e.target.value }
                })}
                className="w-full px-4 py-2 bg-secondary-700 border border-secondary-600 rounded-lg text-white focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-300 mb-2">
                Groq API Key
              </label>
              <input
                type="password"
                placeholder="Enter your Groq API key"
                value={settings.apiKeys.groq}
                onChange={(e) => setSettings({ 
                  ...settings, 
                  apiKeys: { ...settings.apiKeys, groq: e.target.value }
                })}
                className="w-full px-4 py-2 bg-secondary-700 border border-secondary-600 rounded-lg text-white focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 flex items-center space-x-2 shadow-lg"
          >
            <i className="bi bi-check-circle"></i>
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
