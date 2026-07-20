from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import os

app = FastAPI()

# Enhanced CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pointing to the database file that contains your 'error_logs' table
DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'your_database_file.db')

@app.get("/alerts")
def get_alerts():
    try:
        with sqlite3.connect(DB_PATH, timeout=20) as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT timestamp, message FROM error_logs WHERE status = "pending" ORDER BY timestamp DESC LIMIT 1')
            alert = cursor.fetchone()
            
            if alert:
                return {
                    "timestamp": alert[0],
                    "error": alert[1],
                    "ai_suggestion": "Apply default weight (0.0) for NULL values in ETL script."
                }
            return {"message": "All systems nominal"}
    except Exception as e:
        return {"error": str(e)}

@app.get("/history")
def get_history():
    try:
        with sqlite3.connect(DB_PATH, timeout=20) as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT COUNT(*) FROM error_logs WHERE status = "resolved"')
            count = cursor.fetchone()[0]
            return {"count": count}
    except Exception as e:
        return {"count": 0}

@app.post("/fix")
def apply_fix():
    try:
        with sqlite3.connect(DB_PATH, timeout=20) as conn:
            cursor = conn.cursor()
            cursor.execute('UPDATE error_logs SET status = "resolved" WHERE status = "pending"')
            conn.commit()
            return {"status": "success", "message": "Patch Applied"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)