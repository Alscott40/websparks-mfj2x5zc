import axios from 'axios'

const API_BASE_URL = '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

export const botAPI = {
  async getStatus() {
    try {
      const response = await api.get('/bot/status')
      return response.data
    } catch (error) {
      console.error('API Error:', error)
      return {
        isRunning: false,
        balance: 10000,
        totalProfit: 0,
        activeTrades: 0,
        performance: [],
        recentTrades: []
      }
    }
  },

  async start() {
    const response = await api.post('/bot/start')
    return response.data
  },

  async stop() {
    const response = await api.post('/bot/stop')
    return response.data
  },

  async updateSettings(settings: any) {
    const response = await api.put('/bot/settings', settings)
    return response.data
  },

  async getMarketData() {
    try {
      const response = await api.get('/market/data')
      return response.data
    } catch (error) {
      console.error('Market data error:', error)
      return []
    }
  },

  async getTrades() {
    try {
      const response = await api.get('/trades')
      return response.data
    } catch (error) {
      console.error('Trades error:', error)
      return []
    }
  }
}

export default api
