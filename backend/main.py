#!/usr/bin/env python3
"""
CryptoBot AI - Autonomous Trading Platform Backend
FastAPI server with AI-powered trading strategies
"""

import os
import asyncio
import logging
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import uvicorn
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import sqlite3
import json

# Import our custom modules
from trading_engine import TradingEngine
from groq_client import GroqAIClient
from market_data import MarketDataProvider
from profit_reserve import ProfitReserveManager

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="CryptoBot AI API",
    description="Autonomous cryptocurrency trading platform with AI integration",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global instances
trading_engine: Optional[TradingEngine] = None
ai_client: Optional[GroqAIClient] = None
market_data: Optional[MarketDataProvider] = None
profit_manager: Optional[ProfitReserveManager] = None
bot_running = False

# Database initialization
def init_database():
    """Initialize SQLite database for trade logging"""
    conn = sqlite3.connect('trading_bot.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS trades (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            pair TEXT NOT NULL,
            side TEXT NOT NULL,
            amount REAL NOT NULL,
            price REAL NOT NULL,
            profit REAL DEFAULT 0,
            strategy TEXT,
            ai_confidence REAL,
            status TEXT DEFAULT 'completed'
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS bot_status (
            id INTEGER PRIMARY KEY,
            is_running BOOLEAN DEFAULT FALSE,
            balance REAL DEFAULT 10000,
            total_profit REAL DEFAULT 0,
            active_trades INTEGER DEFAULT 0,
            selected_strategy TEXT DEFAULT 'Trend Following',
            reserve_percentage INTEGER DEFAULT 10,
            reserve_balance REAL DEFAULT 0,
            last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Insert default status if not exists
    cursor.execute('INSERT OR IGNORE INTO bot_status (id) VALUES (1)')
    
    conn.commit()
    conn.close()

@app.on_event("startup")
async def startup_event():
    """Initialize all components on startup"""
    global trading_engine, ai_client, market_data, profit_manager
    
    logger.info("Starting CryptoBot AI Backend...")
    
    # Initialize database
    init_database()
    
    # Initialize components
    try:
        ai_client = GroqAIClient()
        market_data = MarketDataProvider()
        profit_manager = ProfitReserveManager()
        trading_engine = TradingEngine(ai_client, market_data, profit_manager)
        
        logger.info("All components initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize components: {e}")

@app.get("/api/bot/status")
async def get_bot_status():
    """Get current bot status and performance metrics"""
    try:
        conn = sqlite3.connect('trading_bot.db')
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM bot_status WHERE id = 1')
        status = cursor.fetchone()
        
        # Get recent trades
        cursor.execute('''
            SELECT pair, side, amount, price, profit, timestamp 
            FROM trades 
            ORDER BY timestamp DESC 
            LIMIT 10
        ''')
        recent_trades = cursor.fetchall()
        
        # Get performance data (mock data for demo)
        performance = [
            {"time": "00:00", "profit": 0},
            {"time": "04:00", "profit": 150},
            {"time": "08:00", "profit": 280},
            {"time": "12:00", "profit": 420},
            {"time": "16:00", "profit": 380},
            {"time": "20:00", "profit": 650},
            {"time": "24:00", "profit": 820}
        ]
        
        conn.close()
        
        if status:
            return {
                "isRunning": bool(status[1]),
                "balance": status[2],
                "totalProfit": status[3],
                "activeTrades": status[4],
                "selectedStrategy": status[5],
                "reservePercentage": status[6],
                "reserveBalance": status[7],
                "performance": performance,
                "recentTrades": [
                    {
                        "pair": trade[0],
                        "type": trade[1],
                        "amount": str(trade[2]),
                        "price": f"${trade[3]:,.2f}",
                        "profit": f"+${trade[4]:.2f}" if trade[4] > 0 else f"${trade[4]:.2f}",
                        "time": trade[5]
                    } for trade in recent_trades
                ]
            }
        else:
            return {"error": "Status not found"}
            
    except Exception as e:
        logger.error(f"Error getting bot status: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/bot/start")
async def start_bot(background_tasks: BackgroundTasks):
    """Start the trading bot"""
    global bot_running
    
    try:
        if bot_running:
            return {"message": "Bot is already running"}
        
        bot_running = True
        
        # Update database
        conn = sqlite3.connect('trading_bot.db')
        cursor = conn.cursor()
        cursor.execute('UPDATE bot_status SET is_running = TRUE WHERE id = 1')
        conn.commit()
        conn.close()
        
        # Start trading loop in background
        background_tasks.add_task(trading_loop)
        
        logger.info("Trading bot started")
        return {"message": "Trading bot started successfully"}
        
    except Exception as e:
        logger.error(f"Error starting bot: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/bot/stop")
async def stop_bot():
    """Stop the trading bot"""
    global bot_running
    
    try:
        bot_running = False
        
        # Update database
        conn = sqlite3.connect('trading_bot.db')
        cursor = conn.cursor()
        cursor.execute('UPDATE bot_status SET is_running = FALSE WHERE id = 1')
        conn.commit()
        conn.close()
        
        logger.info("Trading bot stopped")
        return {"message": "Trading bot stopped successfully"}
        
    except Exception as e:
        logger.error(f"Error stopping bot: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/bot/settings")
async def update_settings(settings: dict):
    """Update bot settings"""
    try:
        conn = sqlite3.connect('trading_bot.db')
        cursor = conn.cursor()
        
        # Update settings in database
        cursor.execute('''
            UPDATE bot_status 
            SET selected_strategy = ?, reserve_percentage = ?, last_updated = CURRENT_TIMESTAMP
            WHERE id = 1
        ''', (settings.get('selectedStrategy'), settings.get('reservePercentage')))
        
        conn.commit()
        conn.close()
        
        logger.info(f"Settings updated: {settings}")
        return {"message": "Settings updated successfully"}
        
    except Exception as e:
        logger.error(f"Error updating settings: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/market/data")
async def get_market_data():
    """Get current market data"""
    try:
        if market_data:
            data = await market_data.get_market_overview()
            return data
        else:
            # Return mock data if market_data not initialized
            return [
                {"pair": "BTC/USDT", "price": 42150.00, "change": 2.45, "volume": "1.2B"},
                {"pair": "ETH/USDT", "price": 2580.50, "change": 1.85, "volume": "890M"},
                {"pair": "ADA/USDT", "price": 0.4520, "change": 3.12, "volume": "245M"}
            ]
    except Exception as e:
        logger.error(f"Error getting market data: {e}")
        return []

@app.get("/api/trades")
async def get_trades():
    """Get trading history"""
    try:
        conn = sqlite3.connect('trading_bot.db')
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT pair, side, amount, price, profit, timestamp, strategy
            FROM trades 
            ORDER BY timestamp DESC 
            LIMIT 50
        ''')
        trades = cursor.fetchall()
        conn.close()
        
        return [
            {
                "pair": trade[0],
                "side": trade[1],
                "amount": trade[2],
                "price": trade[3],
                "profit": trade[4],
                "timestamp": trade[5],
                "strategy": trade[6]
            } for trade in trades
        ]
        
    except Exception as e:
        logger.error(f"Error getting trades: {e}")
        return []

async def trading_loop():
    """Main trading loop that runs in the background"""
    global bot_running, trading_engine
    
    logger.info("Starting trading loop...")
    
    while bot_running:
        try:
            if trading_engine:
                # Execute trading cycle
                await trading_engine.execute_trading_cycle()
            
            # Wait before next cycle (configurable)
            await asyncio.sleep(30)  # 30 seconds between cycles
            
        except Exception as e:
            logger.error(f"Error in trading loop: {e}")
            await asyncio.sleep(60)  # Wait longer on error

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "CryptoBot AI Backend is running", "status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
