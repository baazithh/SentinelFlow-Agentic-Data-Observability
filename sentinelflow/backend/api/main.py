from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import os

app = FastAPI()

# Enhanced CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows your Next.js frontend to connect
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper to ensure we connect to the right DB file path
DB_PATH = os.path.join(os.getcwd(), 'sentinel_data.db')

@app.get("/alerts")
def get_alerts():
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        # Fetch the most recent pending error
        cursor.execute('SELECT timestamp, log_text FROM error_logs WHERE status = "pending" ORDER BY timestamp DESC LIMIT 1')
        alert = cursor.fetchone()
        conn.close()
        
        if alert:
            return {
                "timestamp": alert[0],
                "error": alert[1],
                "ai_suggestion": "Apply default weight (0.0) for NULL values in ETL script."
            }
        return {"message": "All systems nominal"}
    except Exception as e:
        return {"error": str(e)}

@app.post("/fix")
def apply_fix():
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        # Resolve all pending logs
        cursor.execute('UPDATE error_logs SET status = "resolved" WHERE status = "pending"')
        conn.commit()  # FIXED: Changed from db.commit() to conn.commit()
        conn.close()
        return {"status": "success", "message": "Patch Applied"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)