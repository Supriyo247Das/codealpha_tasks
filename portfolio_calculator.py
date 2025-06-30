"""
Basic arithmetic calculations for portfolio
Key Concept: Basic arithmetic operations for investment calculations
"""

def calculate_investment_value(stock_symbol, quantity, stock_price):
    """Calculate investment value using basic arithmetic"""
    return quantity * stock_price

def calculate_total_portfolio_value(portfolio):
    """Calculate total portfolio value"""
    total = 0
    for stock_data in portfolio:
        total += stock_data['total_value']
    return total

def format_currency(amount):
    """Format amount as currency"""
    return f"${amount:,.2f}"
