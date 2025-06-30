"""
Demo script to test the Stock Portfolio Tracker
This script demonstrates all key concepts: dictionary, input/output, basic arithmetic, file handling
"""

from stock_data import get_stock_price, get_available_stocks, STOCK_PRICES
from portfolio_calculator import calculate_investment_value, calculate_total_portfolio_value, format_currency
from file_handler import save_to_txt, save_to_csv

def demo_dictionary_usage():
    """Demonstrate dictionary usage"""
    print("=== DICTIONARY USAGE DEMO ===")
    print("Hardcoded stock prices dictionary:")
    for symbol, price in STOCK_PRICES.items():
        print(f"{symbol}: ${price:.2f}")
    
    print(f"\nLooking up AAPL price: ${get_stock_price('AAPL'):.2f}")
    print(f"Looking up invalid stock: {get_stock_price('XYZ')}")
    print()

def demo_basic_arithmetic():
    """Demonstrate basic arithmetic calculations"""
    print("=== BASIC ARITHMETIC DEMO ===")
    
    # Sample calculations
    aapl_price = get_stock_price('AAPL')
    tsla_price = get_stock_price('TSLA')
    
    aapl_quantity = 10
    tsla_quantity = 5
    
    aapl_value = calculate_investment_value('AAPL', aapl_quantity, aapl_price)
    tsla_value = calculate_investment_value('TSLA', tsla_quantity, tsla_price)
    
    print(f"AAPL: {aapl_quantity} shares × ${aapl_price:.2f} = {format_currency(aapl_value)}")
    print(f"TSLA: {tsla_quantity} shares × ${tsla_price:.2f} = {format_currency(tsla_value)}")
    
    # Create sample portfolio
    portfolio = [
        {'symbol': 'AAPL', 'quantity': aapl_quantity, 'price': aapl_price, 'total_value': aapl_value},
        {'symbol': 'TSLA', 'quantity': tsla_quantity, 'price': tsla_price, 'total_value': tsla_value}
    ]
    
    total_value = calculate_total_portfolio_value(portfolio)
    print(f"Total Portfolio Value: {format_currency(total_value)}")
    print()
    
    return portfolio, total_value

def demo_file_handling(portfolio, total_value):
    """Demonstrate file handling"""
    print("=== FILE HANDLING DEMO ===")
    
    # Save to both formats
    txt_file = save_to_txt(portfolio, total_value)
    csv_file = save_to_csv(portfolio, total_value)
    
    print(f"Saved to TXT: {txt_file}")
    print(f"Saved to CSV: {csv_file}")
    
    # Read and display the TXT file content
    print("\n--- TXT File Content ---")
    with open(txt_file, 'r') as file:
        print(file.read())
    
    print("--- CSV File Content ---")
    with open(csv_file, 'r') as file:
        print(file.read())

def main():
    """Main demo function"""
    print("STOCK PORTFOLIO TRACKER - COMPLETE DEMO")
    print("=" * 50)
    print("This demo showcases all key concepts:")
    print("1. Dictionary - Hardcoded stock prices")
    print("2. Input/Output - Data processing")
    print("3. Basic Arithmetic - Investment calculations")
    print("4. File Handling - Save to .txt and .csv")
    print("=" * 50)
    print()
    
    # Demo each concept
    demo_dictionary_usage()
    portfolio, total_value = demo_basic_arithmetic()
    demo_file_handling(portfolio, total_value)
    
    print("=" * 50)
    print("DEMO COMPLETED SUCCESSFULLY!")
    print("All key concepts demonstrated:")
    print("✓ Dictionary usage")
    print("✓ Basic arithmetic calculations")
    print("✓ File handling (.txt and .csv)")
    print("=" * 50)

if __name__ == "__main__":
    main()
