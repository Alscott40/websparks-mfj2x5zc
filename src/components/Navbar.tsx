import React from 'react'

interface NavbarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
    { id: 'trading', label: 'Trading', icon: 'bi-graph-up-arrow' },
    { id: 'portfolio', label: 'Portfolio', icon: 'bi-wallet2' },
    { id: 'settings', label: 'Settings', icon: 'bi-gear' }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary-900/95 backdrop-blur-sm border-b border-secondary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <i className="bi bi-robot text-white text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">CryptoBot AI</h1>
              <p className="text-xs text-secondary-400">Autonomous Trading</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  activeTab === item.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-secondary-300 hover:text-white hover:bg-secondary-700'
                }`}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-success-900/30 rounded-full">
              <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></div>
              <span className="text-success-400 text-sm font-medium">Live</span>
            </div>
          </div>
        </div>

        <div className="md:hidden flex items-center justify-center space-x-1 pb-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex flex-col items-center space-y-1 ${
                activeTab === item.id
                  ? 'bg-primary-600 text-white'
                  : 'text-secondary-400 hover:text-white hover:bg-secondary-700'
              }`}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
