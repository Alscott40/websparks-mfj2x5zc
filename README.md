# CryptoBot AI - Autonomous Trading Platform

A sophisticated full-stack cryptocurrency trading bot powered by AI for real-time market analysis and autonomous trading decisions.

## 🚀 Features

### Frontend (React + TypeScript)
- **Real-time Dashboard** - Live portfolio tracking and performance metrics
- **Trading Interface** - Advanced charts and market data visualization
- **Portfolio Management** - Comprehensive asset allocation and profit tracking
- **Settings Panel** - Strategy configuration and API key management
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### Backend (Python FastAPI)
- **Multi-Exchange Support** - Integration with Kraken, KuCoin, and other major exchanges via CCXT
- **AI-Powered Analysis** - Groq-hosted Llama API for market forecasting and strategy optimization
- **Multiple Trading Strategies**:
  - Trend Following
  - Grid Trading
  - Dollar Cost Averaging (DCA)
  - Scalping
  - Mean Reversion
- **Profit Reserve System** - Automated profit allocation and reinvestment
- **Real-time Data** - Live price feeds from CoinGecko and news sentiment analysis

## 🏗️ Architecture

```
/
├── frontend/          # React TypeScript application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React context for state management
│   │   └── services/      # API service layer
├── backend/           # Python FastAPI server
│   ├── main.py           # FastAPI application entry point
│   ├── trading_engine.py # Core trading logic and strategies
│   ├── groq_client.py    # AI analysis integration
│   ├── market_data.py    # Market data providers
│   └── profit_reserve.py # Profit management system
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- API Keys (stored in environment variables):
  - `GROQ_API_KEY` - For AI analysis
  - `KRAKEN_API_KEY` & `KRAKEN_SECRET` - For Kraken exchange
  - `KUCOIN_API_KEY` & `KUCOIN_SECRET` - For KuCoin exchange
  - `COINGECKO_API_KEY` - For market data
  - `NEWS_API_KEY` - For news sentiment analysis

### Frontend Setup
```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start FastAPI server
python main.py
```

## 🔧 Configuration

### Trading Strategies
Configure your preferred trading strategy in the Settings panel:
- **Trend Following**: Follows market momentum and trends
- **Grid Trading**: Places orders at regular price intervals
- **DCA**: Regular purchases regardless of price movements
- **Scalping**: Quick trades for small, frequent profits
- **Mean Reversion**: Trades based on price returning to average

### Risk Management
- **Stop Loss**: Automatic loss limitation (default: 5%)
- **Take Profit**: Automatic profit taking (default: 10%)
- **Max Trade Amount**: Maximum amount per trade
- **Reserve Percentage**: Profit allocation to reserves (default: 10%)

### Profit Reserve System
- Automatically allocates a percentage of profits to reserves
- Reserves are reinvested into trading balance every 24 hours
- Configurable reserve percentage (0-50%)
- Provides additional capital for compound growth

## 📊 AI Integration

The platform uses Groq's Llama API for:
- **Market Sentiment Analysis** - News and social media sentiment scoring
- **Price Prediction** - Technical analysis and trend forecasting
- **Strategy Optimization** - Dynamic strategy selection based on market conditions
- **Risk Assessment** - Real-time risk evaluation and position sizing

## 🔒 Security Features

- **API Key Encryption** - All credentials stored securely
- **Rate Limiting** - Protection against API abuse
- **Trade Logging** - Comprehensive audit trail
- **Error Handling** - Robust error recovery and logging
- **HTTPS Support** - Secure communication protocols

## 📈 Performance Monitoring

- **Real-time P&L** - Live profit and loss tracking
- **Trade History** - Detailed transaction records
- **Performance Charts** - Visual performance analytics
- **Win Rate Statistics** - Success rate monitoring
- **Risk Metrics** - Drawdown and volatility analysis

## 🚀 Deployment

### Development
```bash
# Frontend
npm run dev

# Backend
cd backend && python main.py
```

### Production
```bash
# Build frontend
npm run build

# Deploy backend with production ASGI server
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 📝 API Documentation

Once the backend is running, visit `http://localhost:8000/docs` for interactive API documentation.

## ⚠️ Disclaimer

This trading bot is for educational and research purposes. Cryptocurrency trading involves significant risk of loss. Always:
- Start with small amounts
- Test strategies thoroughly
- Never invest more than you can afford to lose
- Monitor bot performance regularly
- Understand the risks involved

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the API docs at `/docs`

---

**Powered by Websparks AI** - Advanced AI-driven trading solutions
