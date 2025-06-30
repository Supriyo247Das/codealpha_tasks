"""
Main Stock Portfolio Tracker Application
Key Concepts: dictionary, input/output, basic arithmetic, file handling
"""

from stock_data import get_stock_price, get_available_stocks
from portfolio_calculator import calculate_investment_value, calculate_total_portfolio_value, format_currency
from file_handler import save_to_txt, save_to_csv

def display_available_stocks():
    """Display available stocks using dictionary"""
    print("\nAvailable Stocks:")
    print("-" * 30)
    stocks = get_available_stocks()
    for i, symbol in enumerate(stocks, 1):
        price = get_stock_price(symbol)
        print(f"{i:2d}. {symbol} - ${price:.2f}")
    print("-" * 30)

def get_user_input():
    """Handle user input for stock selection and quantity"""
    portfolio = []
    
    print("STOCK PORTFOLIO TRACKER")
    print("=" * 40)
    
    while True:
        display_available_stocks()
        
        # Input: Stock symbol
        stock_symbol = input("\nEnter stock symbol (or 'done' to finish): ").strip().upper()
        
        if stock_symbol.lower() == 'done':
            break
        
        # Input validation using dictionary lookup
        stock_price = get_stock_price(stock_symbol)
        if stock_price is None:
            print(f"Error: '{stock_symbol}' not found in our stock database!")
            continue
        
        # Input: Quantity
        try:
            quantity = int(input(f"Enter quantity for {stock_symbol}: "))
            if quantity <= 0:
                print("Error: Quantity must be greater than 0!")
                continue
        except ValueError:
            print("Error: Please enter a valid number for quantity!")
            continue
        
        # Basic arithmetic: Calculate investment value
        total_value = calculate_investment_value(stock_symbol, quantity, stock_price)
        
        # Store in portfolio list
        portfolio.append({
            'symbol': stock_symbol,
            'quantity': quantity,
            'price': stock_price,
            'total_value': total_value
        })
        
        print(f"Added: {quantity} shares of {stock_symbol} = {format_currency(total_value)}")
    
    return portfolio

def display_portfolio_summary(portfolio):
    """Display portfolio summary using basic arithmetic"""
    if not portfolio:
        print("No stocks in portfolio!")
        return 0
    
    print("\nPORTFOLIO SUMMARY")
    print("=" * 50)
    
    for stock in portfolio:
        print(f"{stock['symbol']:>6} | {stock['quantity']:>8} shares | "
              f"${stock['price']:>8.2f} | {format_currency(stock['total_value']):>12}")
    
    print("-" * 50)
    
    # Basic arithmetic: Calculate total portfolio value
    total_value = calculate_total_portfolio_value(portfolio)
    print(f"{'TOTAL PORTFOLIO VALUE':>35} | {format_currency(total_value):>12}")
    print("=" * 50)
    
    return total_value

def save_results(portfolio, total_value):
    """File handling: Save results to .txt or .csv"""
    if not portfolio:
        return
    
    print("\nSAVE RESULTS")
    print("-" * 20)
    print("1. Save to .txt file")
    print("2. Save to .csv file")
    print("3. Save to both formats")
    print("4. Don't save")
    
    try:
        choice = int(input("Choose option (1-4): "))
        
        if choice == 1:
            filename = save_to_txt(portfolio, total_value)
            print(f"Results saved to: {filename}")
        elif choice == 2:
            filename = save_to_csv(portfolio, total_value)
            print(f"Results saved to: {filename}")
        elif choice == 3:
            txt_file = save_to_txt(portfolio, total_value)
            csv_file = save_to_csv(portfolio, total_value)
            print(f"Results saved to: {txt_file}")
            print(f"Results saved to: {csv_file}")
        elif choice == 4:
            print("Results not saved.")
        else:
            print("Invalid choice. Results not saved.")
    
    except ValueError:
        print("Invalid input. Results not saved.")

def main():
    """Main application function"""
    print("Welcome to Stock Portfolio Tracker!")
    print("This app uses:")
    print("- Dictionary: Hardcoded stock prices")
    print("- Input/Output: User interaction")
    print("- Basic Arithmetic: Investment calculations")
    print("- File Handling: Save results to .txt/.csv")
    
    # Input/Output: Get user portfolio
    portfolio = get_user_input()
    
    if portfolio:
        # Basic arithmetic & Output: Display summary
        total_value = display_portfolio_summary(portfolio)
        
        # File handling: Save results
        save_results(portfolio, total_value)
    else:
        print("No portfolio created. Goodbye!")

if __name__ == "__main__":
    main()
