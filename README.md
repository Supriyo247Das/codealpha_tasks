# Stock Portfolio Tracker

A simple stock portfolio tracker that calculates total investment value based on manually defined stock prices.

## Key Concepts Used
- **Dictionary**: Hardcoded stock prices (e.g., {"AAPL": 180, "TSLA": 250})
- **Input/Output**: User inputs stock names and quantities
- **Basic Arithmetic**: Calculate total investment values
- **File Handling**: Save results to .txt or .csv files

## Features
- Predefined stock prices in dictionary format
- User-friendly input for stock selection and quantities
- Real-time calculation of investment values
- Portfolio summary display
- Optional saving to .txt or .csv files

## How to Run
1. Open terminal in the project directory
2. Run: `python main.py`
3. Follow the prompts to build your portfolio
4. View results and optionally save to file

## Available Stocks
- AAPL: $180.50
- TSLA: $250.75
- GOOGL: $2800.25
- MSFT: $350.00
- AMZN: $3200.80
- META: $320.45
- NVDA: $450.60
- NFLX: $380.90
- AMD: $85.30
- INTC: $45.20

## Project Structure
```
Stock Portfolio Tracker/
├── main.py                 # Main application entry point
├── stock_data.py          # Hardcoded stock prices dictionary
├── portfolio_calculator.py # Basic arithmetic calculations
├── file_handler.py        # File operations (.txt/.csv)
├── output/                # Output directory for results
├── requirements.txt       # Dependencies (none required)
└── README.md             # This file
```

## Output Files
Results can be saved in the `output/` directory as:
- `.txt` files with formatted portfolio summary
- `.csv` files for spreadsheet compatibility

## Example Usage
```
Enter stock symbol (or 'done' to finish): AAPL
Enter quantity for AAPL: 10
Added: 10 shares of AAPL = $1,805.00

Enter stock symbol (or 'done' to finish): TSLA
Enter quantity for TSLA: 5
Added: 5 shares of TSLA = $1,253.75

Enter stock symbol (or 'done' to finish): done

PORTFOLIO SUMMARY
==================================================
  AAPL |       10 shares |  $180.50 |    $1,805.00
  TSLA |        5 shares |  $250.75 |    $1,253.75
--------------------------------------------------
                TOTAL PORTFOLIO VALUE |    $3,058.75
==================================================
```
