"""
Profit Reserve Manager - Handles profit allocation and reserve management
"""

import logging
import sqlite3
from datetime import datetime, timedelta
from typing import Dict, Any

logger = logging.getLogger(__name__)

class ProfitReserveManager:
    def __init__(self):
        self.last_reserve_update = datetime.now()
        
    async def update_reserves(self):
        """Update profit reserves based on recent trades"""
        try:
            conn = sqlite3.connect('trading_bot.db')
            cursor = conn.cursor()
            
            # Get current settings
            cursor.execute('SELECT reserve_percentage, reserve_balance FROM bot_status WHERE id = 1')
            result = cursor.fetchone()
            
            if not result:
                conn.close()
                return
                
            reserve_percentage, current_reserve = result
            
            # Get recent profitable trades
            cursor.execute('''
                SELECT SUM(profit) FROM trades 
                WHERE profit > 0 AND timestamp > datetime('now', '-1 hour')
            ''')
            recent_profits = cursor.fetchone()[0] or 0
            
            # Calculate reserve allocation
            if recent_profits > 0:
                reserve_amount = recent_profits * (reserve_percentage / 100)
                new_reserve_balance = current_reserve + reserve_amount
                
                # Update reserve balance
                cursor.execute('''
                    UPDATE bot_status 
                    SET reserve_balance = ?
                    WHERE id = 1
                ''', (new_reserve_balance,))
                
                logger.info(f"Added ${reserve_amount:.2f} to reserves. Total reserve: ${new_reserve_balance:.2f}")
            
            conn.commit()
            conn.close()
            
        except Exception as e:
            logger.error(f"Error updating reserves: {e}")
    
    async def check_daily_reserve_transfer(self):
        """Check if it's time for daily reserve transfer back to trading balance"""
        try:
            now = datetime.now()
            
            # Check if 24 hours have passed since last update
            if (now - self.last_reserve_update).total_seconds() >= 86400:  # 24 hours
                await self.transfer_reserves_to_balance()
                self.last_reserve_update = now
                
        except Exception as e:
            logger.error(f"Error checking daily reserve transfer: {e}")
    
    async def transfer_reserves_to_balance(self):
        """Transfer reserve balance back to main trading balance"""
        try:
            conn = sqlite3.connect('trading_bot.db')
            cursor = conn.cursor()
            
            # Get current balances
            cursor.execute('SELECT balance, reserve_balance FROM bot_status WHERE id = 1')
            result = cursor.fetchone()
            
            if not result:
                conn.close()
                return
                
            current_balance, reserve_balance = result
            
            if reserve_balance > 0:
                # Transfer reserves back to main balance
                new_balance = current_balance + reserve_balance
                
                cursor.execute('''
                    UPDATE bot_status 
                    SET balance = ?, reserve_balance = 0
                    WHERE id = 1
                ''', (new_balance,))
                
                logger.info(f"Transferred ${reserve_balance:.2f} from reserves to trading balance")
                
                conn.commit()
            
            conn.close()
            
        except Exception as e:
            logger.error(f"Error transferring reserves: {e}")
    
    async def get_reserve_stats(self) -> Dict[str, Any]:
        """Get current reserve statistics"""
        try:
            conn = sqlite3.connect('trading_bot.db')
            cursor = conn.cursor()
            
            cursor.execute('''
                SELECT reserve_percentage, reserve_balance, 
                       (SELECT SUM(profit) FROM trades WHERE profit > 0) as total_profits
                FROM bot_status WHERE id = 1
            ''')
            result = cursor.fetchone()
            conn.close()
            
            if result:
                return {
                    'reserve_percentage': result[0],
                    'reserve_balance': result[1],
                    'total_profits': result[2] or 0,
                    'last_update': self.last_reserve_update.isoformat()
                }
            else:
                return {
                    'reserve_percentage': 10,
                    'reserve_balance': 0,
                    'total_profits': 0,
                    'last_update': datetime.now().isoformat()
                }
                
        except Exception as e:
            logger.error(f"Error getting reserve stats: {e}")
            return {
                'reserve_percentage': 10,
                'reserve_balance': 0,
                'total_profits': 0,
                'last_update': datetime.now().isoformat()
            }
