import sqlite3
import json
import time
import random

# Initialize local DB
db = sqlite3.connect('sentinel_data.db')
cursor = db.cursor()
cursor.execute('CREATE TABLE IF NOT EXISTS inventory (id INTEGER, status TEXT, weight REAL)')
cursor.execute('CREATE TABLE IF NOT EXISTS error_logs (timestamp TEXT, log_text TEXT, status TEXT)')
db.commit()

def run_pipeline():
    print("🚀 Pipeline Started Locally...")
    while True:
        order_id = random.randint(1000, 9999)
        # Randomly inject a 'None' (null) to simulate a data quality failure
        weight = random.choice([random.uniform(1.0, 50.0), None])
        
        try:
            if weight is None:
                raise ValueError(f"Data Quality Alert: Order {order_id} has NULL weight.")
            
            cursor.execute('INSERT INTO inventory VALUES (?, ?, ?)', (order_id, 'processed', weight))
            db.commit()
        except Exception as e:
            cursor.execute('INSERT INTO error_logs VALUES (datetime("now"), ?, "pending")', (str(e),))
            db.commit()
            print(f"❌ Error logged: {e}")
            
        time.sleep(3)

if __name__ == "__main__":
    run_pipeline()