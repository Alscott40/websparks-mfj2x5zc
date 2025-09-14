import React from 'react'
import { useBotContext } from '../context/BotContext'

const BotControls: React.FC = () => {
  const { botState, startBot, stopBot } = useBotContext()

  return (
    <div className="bg-secondary-800/50 backdrop-blur-sm rounded-2xl border border-secondary-700 p-6 mb-8">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className={`w-4 h-4 rounded-full ${botState.isRunning ? 'bg-success-400 animate-pulse' : 'bg-danger-400'}`}></div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              Bot Status: {botState.isRunning ? 'Active' : 'Inactive'}
            </h3>
            <p className="text-secondary-300 text-sm">
              Strategy: {botState.selectedStrategy}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {!botState.isRunning ? (
            <button
              onClick={startBot}
              className="px-6 py-3 bg-gradient-to-r from-success-600 to-success-700 text-white font-semibold rounded-xl hover:from-success-700 hover:to-success-800 transition-all duration-200 flex items-center space-x-2 shadow-lg"
            >
              <i className="bi bi-play-fill"></i>
              <span>Start Trading</span>
            </button>
          ) : (
            <button
              onClick={stopBot}
              className="px-6 py-3 bg-gradient-to-r from-danger-600 to-danger-700 text-white font-semibold rounded-xl hover:from-danger-700 hover:to-danger-800 transition-all duration-200 flex items-center space-x-2 shadow-lg"
            >
              <i className="bi bi-stop-fill"></i>
              <span>Stop Trading</span>
            </button>
          )}
          
          <button className="px-4 py-3 bg-secondary-700 text-secondary-300 rounded-xl hover:bg-secondary-600 hover:text-white transition-all duration-200">
            <i className="bi bi-arrow-clockwise"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default BotControls
