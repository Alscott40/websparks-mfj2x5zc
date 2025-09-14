import React, { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Settings from './components/Settings'
import TradingView from './components/TradingView'
import Portfolio from './components/Portfolio'
import { BotProvider } from './context/BotContext'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => window.clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-accent-500 border-b-transparent rounded-full animate-spin-slow mx-auto"></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">CryptoBot AI</h2>
          <p className="text-secondary-300">Initializing Trading Engine...</p>
        </div>
      </div>
    )
  }

  return (
    <BotProvider>
      <div className="min-h-screen bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="pt-20">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'trading' && <TradingView />}
          {activeTab === 'portfolio' && <Portfolio />}
          {activeTab === 'settings' && <Settings />}
        </main>

        <footer className="bg-secondary-900/50 border-t border-secondary-700 py-4 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center">
              <p className="text-secondary-400 text-sm">
                Powered by <span className="text-primary-400 font-semibold">Websparks AI</span>
              </p>
            </div>
          </div>
        </footer>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#f1f5f9',
              border: '1px solid #334155'
            }
          }}
        />
      </div>
    </BotProvider>
  )
}

export default App
