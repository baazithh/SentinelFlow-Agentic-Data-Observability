import sqlite3
import pandas as pd
import time
import os

def watch_tables():
    while True:
        os.system('clear')
        conn = sqlite3.connect('sentinel_data.db')
        print("--- LIVE INVENTORY TABLE ---")
        print(pd.read_sql_query("SELECT * FROM inventory ORDER BY rowid DESC LIMIT 5", conn))
        
        print("\n--- PENDING ERROR LOGS ---")
        print(pd.read_sql_query("SELECT * FROM error_logs WHERE status='pending'", conn))
        conn.close()
        time.sleep(2)

if __name__ == "__main__":
    # pip install pandas
    watch_tables()