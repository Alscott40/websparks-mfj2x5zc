"""
Trading Engine - Core trading logic with multiple strategies
"""

import asyncio
import logging
from datetime import datetime
from typing import Dict, List, Optional
import random
import sqlite3

logger = logging.getLogger(__name__)

class TradingEngine:
    def __init__(self, ai_client, market_data, profit_manager):
        self.ai_client = ai_client
        self.market_data = market_data
        self.profit_manager = profit_manager
        self.active_positions = {}
        self.strategies = {
            'Trend Following': self.trend_following_strategy,
            'Grid Trading': self.grid_trading_strategy,
            'DCA': self.dca_strategy,
            'Scalping': self.scalping_strategy,
            'Mean Reversion': self.mean_reversion_strategy
        }
        
    async def execute_trading_cycle(self):
        """Execute one complete trading cycle"""
        try:
            logger.info("Executing trading cycle...")
            
            # Get current market data
            market_data = await self.market_data.get_current_prices()
            
            # Get AI analysis
            ai_analysis = await self.ai_client.analyze_market(market_data)
            
            # Get current strategy from database
            strategy = self.get_current_strategy()
            
            # Execute strategy
            if strategy in self.strategies:
                await self.strategies[strategy](market_data, ai_analysis)
            
            # Update profit reserves
            await self.profit_manager.update_reserves()
            
            logger.info("Trading cycle completed")
            
        except Exception as e:
            logger.error(f"Error in trading cycle: {e}")
    
    def get_current_strategy(self) -> str:
        """Get current trading strategy from database"""
        try:
            conn = sqlite3.connect('trading_bot.db')
            cursor = conn.cursor()
            cursor.execute('SELECT selected_strategy FROM bot_status WHERE id = 1')
            result = cursor.fetchone()
            conn.close()
            return result[0] if result else 'Trend Following'
        except Exception as e:
            logger.error(f"<think>
I need to continue from where I left off in the trading_engine.py file. I was in the middle of the get_current_strategy method and need to complete that file, then continue with the remaining backend files and complete the artifact.
</think>

Error getting current strategy: {e}")
            return 'Trend Following'
    
    async def trend_following_strategy(self, market_data: Dict, ai_analysis: Dict):
        """Trend following strategy implementation"""
        try:
            for pair, data in market_data.items():
                if ai_analysis.get('trend_strength', 0) > 0.7:
                    if ai_analysis.get('direction') == 'bullish':
                        await self.execute_buy_order(pair, data['price'], 'trend_following')
                    elif ai_analysis.get('direction') == 'bearish':
                        await self.execute_sell_order(pair, data['price'], 'trend_following')
        except Exception as e:
            logger.error(f"Error in trend following strategy: {e}")
    
    async def grid_trading_strategy(self, market_data: Dict, ai_analysis: Dict):
        """Grid trading strategy implementation"""
        try:
            for pair, data in market_data.items():
                current_price = data['price']
                # Simulate grid levels
                grid_size = current_price * 0.02  # 2% grid
                
                if random.random() > 0.7:  # 30% chance to trade
                    if random.choice([True, False]):
                        await self.execute_buy_order(pair, current_price - grid_size, 'grid_trading')
                    else:
                        await self.execute_sell_order(pair, current_price + grid_size, 'grid_trading')
        except Exception as e:
            logger.error(f"Error in grid trading strategy: {e}")
    
    async def dca_strategy(self, market_data: Dict, ai_analysis: Dict):
        """Dollar Cost Averaging strategy implementation"""
        try:
            # DCA buys at regular intervals regardless of price
            for pair, data in market_data.items():
                if random.random() > 0.8:  # 20% chance to DCA buy
                    await self.execute_buy_order(pair, data['price'], 'dca')
        except Exception as e:
            logger.error(f"Error in DCA strategy: {e}")
    
    async def scalping_strategy(self, market_data: Dict, ai_analysis: Dict):
        """Scalping strategy for quick profits"""
        try:
            for pair, data in market_data.items():
                if ai_analysis.get('volatility', 0) > 0.5:
                    if random.random() > 0.6:  # 40% chance to scalp
                        side = random.choice(['buy', 'sell'])
                        if side == 'buy':
                            await self.execute_buy_order(pair, data['price'], 'scalping')
                        else:
                            await self.execute_sell_order(pair, data['price'], 'scalping')
        except Exception as e:
            logger.error(f"Error in scalping strategy: {e}")
    
    async def mean_reversion_strategy(self, market_data: Dict, ai_analysis: Dict):
        """Mean reversion strategy implementation"""
        try:
            for pair, data in market_data.items():
                if ai_analysis.get('deviation_from_mean', 0) > 0.8:
                    if ai_analysis.get('price_position') == 'oversold':
                        await self.execute_buy_order(pair, data['price'], 'mean_reversion')
                    elif ai_analysis.get('price_position') == 'overbought':
                        await self.execute_sell_order(pair, data['price'], 'mean_reversion')
        except Exception as e:
            logger.error(f"Error in mean reversion strategy: {e}")
    
    async def execute_buy_order(self, pair: str, price: float, strategy: str):
        """Execute a buy order"""
        try:
            amount = random.uniform(0.01, 0.1)  # Random amount for demo
            profit = random.uniform(5, 50)  # Simulated profit
            
            # Log trade to database
            conn = sqlite3.connect('trading_bot.db')
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO trades (pair, side, amount, price, profit, strategy, ai_confidence)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (pair, 'BUY', amount, price, profit, strategy, random.uniform(0.7, 0.95)))
            
            # Update bot status
            cursor.execute('''
                UPDATE bot_status 
                SET total_profit = total_profit + ?, active_trades = active_trades + 1
                WHERE id = 1
            ''', (profit,))
            
            conn.commit()
            conn.close()
            
            logger.info(f"Executed BUY order: {pair} @ ${price:.2f}")
            
        except Exception as e:
            logger.error(f"Error executing buy order: {e}")
    
    async def execute_sell_order(self, pair: str, price: float, strategy: str):
        """Execute a sell order"""
        try:
            amount = random.uniform(0.01, 0.1)  # Random amount for demo
            profit = random.uniform(5, 50)  # Simulated profit
            
            # Log trade to database
            conn = sqlite3.connect('trading_bot.db')
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO trades (pair, side, amount, price, profit, strategy, ai_confidence)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (pair, 'SELL', amount, price, profit, strategy, random.uniform(0.7, 0.95)))
            
            # Update bot status
            cursor.execute('''
                UPDATE bot_status 
                SET total_profit = total_profit + ?, active_trades = active_trades - 1
                WHERE id = 1
            ''', (profit,))
            
            conn.commit()
            conn.close()
            
            logger.info(f"Executed SELL order: {pair} @ ${price:.2f}")
            
        except Exception as e:
            logger.error(f"Error executing sell order: {e}")
