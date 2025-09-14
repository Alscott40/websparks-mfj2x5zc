import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { botAPI } from '../services/api'

interface BotState {
  isRunning: boolean
  balance: number
  totalProfit: number
  activeTrades: number
  strategies: string[]
  selectedStrategy: string
  reservePercentage: number
  reserveBalance: number
  performance: any[]
  recentTrades: any[]
}

interface BotContextType {
  botState: BotState
  setBotState: React.Dispatch<React.SetStateAction<BotState>>
  startBot: () => Promise<void>
  stopBot: () => Promise<void>
  updateSettings: (settings: any) => Promise<void>
  refreshData: () => Promise<void>
}

const BotContext = createContext<BotContextType | undefined>(undefined)

export const useBotContext = () => {
  const context = useContext(BotContext)
  if (!context) {
    throw new Error('useBotContext must be used within a BotProvider')
  }
  return context
}

export const BotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [botState, setBotState] = useState<BotState>({
    isRunning: false,
    balance: 10000,
    totalProfit: 0,
    activeTrades: 0,
    strategies: ['Trend Following', 'Grid Trading', 'DCA', 'Scalping', 'Mean Reversion'],
    selectedStrategy: 'Trend Following',
    reservePercentage: 10,
    reserveBalance: 0,
    performance: [],
    recentTrades: []
  })

  const startBot = async () => {
    try {
      await botAPI.start()
      setBotState(prev => ({ ...prev, isRunning: true }))
      toast.success('Trading bot started successfully!')
    } catch (error) {
      toast.error('Failed to start trading bot')
      console.error('Start bot error:', error)
    }
  }

  const stopBot = async () => {
    try {
      await botAPI.stop()
      setBotState(prev => ({ ...prev, isRunning: false }))
      toast.success('Trading bot stopped')
    } catch (error) {
      toast.error('Failed to stop trading bot')
      console.error('Stop bot error:', error)
    }
  }

  const updateSettings = async (settings: any) => {
    try {
      await botAPI.updateSettings(settings)
      setBotState(prev => ({ ...prev, ...settings }))
      toast.success('Settings updated successfully!')
    } catch (error) {
      toast.error('Failed to update settings')
      console.error('Update settings error:', error)
    }
  }

  const refreshData = async () => {
    try {
      const data = await botAPI.getStatus()
      setBotState(prev => ({ ...prev, ...data }))
    } catch (error) {
      console.error('Refresh data error:', error)
    }
  }

  useEffect(() => {
    refreshData()
    const interval = window.setInterval(refreshData, 5000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <BotContext.Provider value={{
      botState,
      setBotState,
      startBot,
      stopBot,
      updateSettings,
      refreshData
    }}>
      {children}
    </BotContext.Provider>
  )
}
