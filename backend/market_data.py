"""
Market Data Provider - Fetches data from various sources
"""

import os
import logging
import asyncio
import random
from typing import Dict, List, Any
import json
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)

class MarketDataProvider:
    def __init__(self):
        self.coingecko_api_key = os.getenv('COINGECKO_API_KEY', 'demo_key')
        self.news_api_key = os.getenv('NEWS_API_KEY', 'demo_key')
        
    async def get_current_prices(self) -> Dict[str, Dict]:
        """Get current cryptocurrency prices"""
        try:
            # Simulate real-time price data
            pairs = ['BTC/USDT', 'ETH/USDT', 'ADA/USDT', 'SOL/USDT', 'DOT/USDT']
            prices = {}
            
            base_prices = {
                'BTC/USDT': 42150.00,
                'ETH/USDT': 2580.50,
                'ADA/USDT': 0.4520,
                'SOL/USDT': 98.50,
                'DOT/USDT': 7.25
            }
            
            for pair in pairs:
                base_price = base_prices.get(pair, 100.0)
                # Add some random price movement
                price_change = random.uniform(-0.05, 0.05)  # ±5% change
                current_price = base_price * (1 + price_change)
                
                prices[pair] = {
                    'price': current_price,
                    'change_24h': price_change * 100,
                    'volume_24h': random.uniform(1000000, 10000000),
                    'high_24h': current_price * 1.05,
                    'low_24h': current_price * 0.95,
                    'timestamp': datetime.now().isoformat()
                }
            
            return prices
            
        except Exception as e:
            logger.error(f"Error fetching current prices: {e}")
            return {}
    
    async def get_historical_data(self, pair: str, timeframe: str = '1h', limit: int = 100) -> List[Dict]:
        """Get historical price data"""
        try:
            # Simulate historical data
            data = []
            base_price = 42000.0 if 'BTC' in pair else 2500.0 if 'ETH' in pair else 100.0
            
            for i in range(limit):
                timestamp = datetime.now() - timedelta(hours=limit-i)
                price_change = random.uniform(-0.02, 0.02)
                price = base_price * (1 + price_change)
                
                data.append({
                    'timestamp': timestamp.isoformat(),
                    'open': price * 0.999,
                    'high': price * 1.001,
                    'low': price * 0.998,
                    'close': price,
                    'volume': random.uniform(100, 1000)
                })
                
                base_price = price  # Use current price as base for next
            
            return data
            
        except Exception as e:
            logger.error(f"Error fetching historical data: {e}")
            return []
    
    async def get_market_overview(self) -> List[Dict]:
        """Get market overview data"""
        try:
            markets = [
                {
                    'pair': 'BTC/USDT',
                    'price': 42150.00 + random.uniform(-1000, 1000),
                    'change': random.uniform(-5, 5),
                    'volume': f"${random.uniform(1, 2):.1f}B",
                    'market_cap': f"${random.uniform(800, 900)}B"
                },
                {
                    'pair': 'ETH/USDT',
                    'price': 2580.50 + random.uniform(-100, 100),
                    'change': random.uniform(-5, 5),
                    'volume': f"${random.uniform(500, 900)}M",
                    'market_cap': f"${random.uniform(300, 400)}B"
                },
                {
                    'pair': 'ADA/USDT',
                    'price': 0.4520 + random.uniform(-0.05, 0.05),
                    'change': random.uniform(-5, 5),
                    'volume': f"${random.uniform(200, 300)}M",
                    'market_cap': f"${random.uniform(15, 25)}B"
                }
            ]
            
            return markets
            
        except Exception as e:
            logger.error(f"Error fetching market overview: {e}")
            return []
    
    async def get_news_data(self) -> List[Dict]:
        """Get cryptocurrency news for sentiment analysis"""
        try:
            # Simulate news data
            news_items = [
                {
                    'title': 'Bitcoin Reaches New Monthly High Amid Institutional Interest',
                    'content': 'Bitcoin has surged to new monthly highs as institutional investors continue to show strong interest...',
                    'source': 'CryptoNews',
                    'timestamp': datetime.now().isoformat(),
                    'sentiment': 'positive'
                },
                {
                    'title': 'Ethereum Network Upgrade Shows Promising Results',
                    'content': 'The latest Ethereum network upgrade has shown significant improvements in transaction speed...',
                    'source': 'BlockchainDaily',
                    'timestamp': (datetime.now() - timedelta(hours=2)).isoformat(),
                    'sentiment': 'positive'
                },
                {
                    'title': 'Regulatory Concerns Impact Crypto Market Sentiment',
                    'content': 'Recent regulatory discussions have created some uncertainty in the cryptocurrency market...',
                    'source': 'FinanceToday',
                    'timestamp': (datetime.now() - timedelta(hours=4)).isoformat(),
                    'sentiment': 'negative'
                }
            ]
            
            return news_items
            
        except Exception as e:
            logger.error(f"Error fetching news data: {e}")
            return []
    
    async def get_order_book(self, pair: str) -> Dict:
        """Get order book data for a trading pair"""
        try:
            base_price = 42150.0 if 'BTC' in pair else 2580.0 if 'ETH' in pair else 100.0
            
            # Generate realistic order book
            bids = []
            asks = []
            
            for i in range(10):
                bid_price = base_price - (i + 1) * base_price * 0.0001
                ask_price = base_price + (i + 1) * base_price * 0.0001
                
                bids.append({
                    'price': bid_price,
                    'amount': random.uniform(0.1, 2.0),
                    'total': bid_price * random.uniform(0.1, 2.0)
                })
                
                asks.append({
                    'price': ask_price,
                    'amount': random.uniform(0.1, 2.0),
                    'total': ask_price * random.uniform(0.1, 2.0)
                })
            
            return {
                'pair': pair,
                'bids': bids,
                'asks': asks,
                'timestamp': datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error fetching order book: {e}")
            return {'pair': pair, 'bids': [], 'asks': [], 'timestamp': datetime.now().isoformat()}
