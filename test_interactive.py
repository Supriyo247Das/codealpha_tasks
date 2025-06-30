"""
Test script for Stock Portfolio Tracker
Simulates user input to test the interactive features
"""

import sys
from io import StringIO
from contextlib import redirect_stdout, redirect_stderr
import main

def test_portfolio_tracker():
    """Test the portfolio tracker with simulated input"""
    
    # Simulate user input
    test_inputs = [
        'AAPL',      # Stock symbol
        '10',        # Quantity
        'TSLA',      # Stock symbol
        '5',         # Quantity
        'GOOGL',     # Stock symbol
        '2',         # Quantity
        'done',      # Finish adding stocks
        '3'          # Save to both formats
    ]
    
    # Mock input function
    input_iter = iter(test_inputs)
    original_input = __builtins__['input']
    __builtins__['input'] = lambda prompt='': next(input_iter)
    
    try:
        # Capture output
        output_buffer = StringIO()
        with redirect_stdout(output_buffer):
            main.main()
        
        output = output_buffer.getvalue()
        print("=== TEST EXECUTION OUTPUT ===")
        print(output)
        
        # Verify key elements in output
        assert "AAPL" in output, "AAPL stock not found in output"
        assert "TSLA" in output, "TSLA stock not found in output"
        assert "GOOGL" in output, "GOOGL stock not found in output"
        assert "TOTAL PORTFOLIO VALUE" in output, "Total portfolio value not calculated"
        
        print("✅ All tests passed!")
        
    except Exception as e:
        print(f"❌ Test failed: {e}")
    
    finally:
        # Restore original input function
        __builtins__['input'] = original_input

if __name__ == "__main__":
    test_portfolio_tracker()
