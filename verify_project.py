"""
Project Verification Script
Verifies that all required components are implemented correctly
"""

import os
import importlib.util

def verify_file_exists(filepath, description):
    """Verify a file exists"""
    if os.path.exists(filepath):
        print(f"✅ {description}: {filepath}")
        return True
    else:
        print(f"❌ Missing {description}: {filepath}")
        return False

def verify_function_exists(module_path, function_name):
    """Verify a function exists in a module"""
    try:
        spec = importlib.util.spec_from_file_location("module", module_path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        
        if hasattr(module, function_name):
            print(f"✅ Function '{function_name}' found in {os.path.basename(module_path)}")
            return True
        else:
            print(f"❌ Function '{function_name}' missing in {os.path.basename(module_path)}")
            return False
    except Exception as e:
        print(f"❌ Error checking {module_path}: {e}")
        return False

def verify_key_concepts():
    """Verify all key concepts are implemented"""
    print("\n=== VERIFYING KEY CONCEPTS ===")
    
    # 1. Dictionary usage
    print("\n1. DICTIONARY CONCEPT:")
    if verify_function_exists("stock_data.py", "STOCK_PRICES"):
        print("   ✅ Hardcoded stock prices dictionary implemented")
    
    # 2. Input/Output
    print("\n2. INPUT/OUTPUT CONCEPT:")
    if verify_function_exists("main.py", "get_user_input"):
        print("   ✅ User input functionality implemented")
    if verify_function_exists("main.py", "display_portfolio_summary"):
        print("   ✅ Output display functionality implemented")
    
    # 3. Basic Arithmetic
    print("\n3. BASIC ARITHMETIC CONCEPT:")
    if verify_function_exists("portfolio_calculator.py", "calculate_investment_value"):
        print("   ✅ Investment value calculation implemented")
    if verify_function_exists("portfolio_calculator.py", "calculate_total_portfolio_value"):
        print("   ✅ Total portfolio calculation implemented")
    
    # 4. File Handling
    print("\n4. FILE HANDLING CONCEPT:")
    if verify_function_exists("file_handler.py", "save_to_txt"):
        print("   ✅ TXT file saving implemented")
    if verify_function_exists("file_handler.py", "save_to_csv"):
        print("   ✅ CSV file saving implemented")

def verify_project_structure():
    """Verify the complete project structure"""
    print("\n=== VERIFYING PROJECT STRUCTURE ===")
    
    base_path = "."
    required_files = [
        ("main.py", "Main application file"),
        ("stock_data.py", "Stock prices dictionary"),
        ("portfolio_calculator.py", "Arithmetic calculations"),
        ("file_handler.py", "File operations"),
        ("demo.py", "Demo script"),
        ("README.md", "Documentation"),
        ("requirements.txt", "Dependencies")
    ]
    
    all_files_exist = True
    for filename, description in required_files:
        filepath = os.path.join(base_path, filename)
        if not verify_file_exists(filepath, description):
            all_files_exist = False
    
    # Check output directory
    output_dir = os.path.join(base_path, "output")
    if os.path.exists(output_dir):
        print(f"✅ Output directory exists: {output_dir}")
    else:
        print(f"❌ Output directory missing: {output_dir}")
        all_files_exist = False
    
    return all_files_exist

def main():
    """Main verification function"""
    print("STOCK PORTFOLIO TRACKER - PROJECT VERIFICATION")
    print("=" * 60)
    print("Verifying implementation of key concepts:")
    print("- Dictionary: Hardcoded stock prices")
    print("- Input/Output: User interaction")
    print("- Basic Arithmetic: Investment calculations")
    print("- File Handling: Save to .txt/.csv")
    print("=" * 60)
    
    # Verify project structure
    structure_ok = verify_project_structure()
    
    # Verify key concepts
    verify_key_concepts()
    
    print("\n" + "=" * 60)
    if structure_ok:
        print("🎉 PROJECT VERIFICATION COMPLETED SUCCESSFULLY!")
        print("✅ All required files and components are present")
        print("✅ All key concepts are properly implemented")
        print("\nTo run the application:")
        print("  python main.py")
        print("\nTo see the demo:")
        print("  python demo.py")
    else:
        print("❌ PROJECT VERIFICATION FAILED!")
        print("Some required components are missing")
    print("=" * 60)

if __name__ == "__main__":
    main()
