"""
File handling operations for saving results
Key Concept: File handling for .txt and .csv output
"""
import csv
import os
from datetime import datetime

def ensure_output_directory():
    """Create output directory if it doesn't exist"""
    if not os.path.exists('output'):
        os.makedirs('output')

def save_to_txt(portfolio_data, total_value):
    """Save portfolio results to .txt file"""
    ensure_output_directory()
    
    filename = f"output/portfolio_results_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
    
    with open(filename, 'w') as file:
        file.write("STOCK PORTFOLIO TRACKER RESULTS\n")
        file.write("=" * 40 + "\n")
        file.write(f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        
        file.write("PORTFOLIO DETAILS:\n")
        file.write("-" * 20 + "\n")
        
        for stock in portfolio_data:
            file.write(f"Stock: {stock['symbol']}\n")
            file.write(f"Quantity: {stock['quantity']}\n")
            file.write(f"Price per share: ${stock['price']:.2f}\n")
            file.write(f"Total value: ${stock['total_value']:.2f}\n")
            file.write("-" * 20 + "\n")
        
        file.write(f"\nTOTAL PORTFOLIO VALUE: ${total_value:.2f}\n")
    
    return filename

def save_to_csv(portfolio_data, total_value):
    """Save portfolio results to .csv file"""
    ensure_output_directory()
    
    filename = f"output/portfolio_results_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
    
    with open(filename, 'w', newline='') as file:
        writer = csv.writer(file)
        
        # Write headers
        writer.writerow(['Stock Symbol', 'Quantity', 'Price per Share', 'Total Value'])
        
        # Write portfolio data
        for stock in portfolio_data:
            writer.writerow([
                stock['symbol'],
                stock['quantity'],
                f"{stock['price']:.2f}",
                f"{stock['total_value']:.2f}"
            ])
        
        # Write total
        writer.writerow(['', '', 'TOTAL PORTFOLIO VALUE:', f"{total_value:.2f}"])
    
    return filename
