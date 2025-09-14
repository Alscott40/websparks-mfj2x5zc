import React from 'react'

interface StatsCardProps {
  title: string
  value: string
  change: string
  icon: string
  color: 'primary' | 'success' | 'accent' | 'secondary'
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon, color }) => {
  const colorClasses = {
    primary: 'from-primary-600 to-primary-700 text-primary-400',
    success: 'from-success-600 to-success-700 text-success-400',
    accent: 'from-accent-600 to-accent-700 text-accent-400',
    secondary: 'from-secondary-600 to-secondary-700 text-secondary-400'
  }

  return (
    <div className="bg-secondary-800/50 backdrop-blur-sm rounded-2xl border border-secondary-700 p-6 hover:border-secondary-600 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color].split(' ')[0]} ${colorClasses[color].split(' ')[1]} rounded-xl flex items-center justify-center`}>
          <i className={`${icon} text-white text-xl`}></i>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          change.includes('+') ? 'bg-success-900/30 text-success-400' : 'bg-secondary-700 text-secondary-300'
        }`}>
          {change}
        </div>
      </div>
      <h3 className="text-secondary-300 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  )
}

export default StatsCard
