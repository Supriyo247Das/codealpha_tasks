"""
Hardcoded stock prices dictionary
Key Concept: Dictionary data structure for storing stock prices
"""

STOCK_PRICES = {
    "AAPL": 180.50,
    "TSLA": 250.75,
    "GOOGL": 2800.25,
    "MSFT": 350.00,
    "AMZN": 3200.80,
    "META": 320.45,
    "NVDA": 450.60,
    "NFLX": 380.90,
    "AMD": 85.30,
    "INTC": 45.20
}

def get_stock_price(symbol):
    """Get stock price from dictionary"""
    return STOCK_PRICES.get(symbol.upper())

def get_available_stocks():
    """Get list of available stock symbols"""
    return list(STOCK_PRICES.keys())
