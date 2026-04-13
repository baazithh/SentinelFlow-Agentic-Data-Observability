from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

app = FastAPI()

# Enable CORS for Next.js frontend
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.get("/alerts")
def get_alerts():
    conn = sqlite3.connect('sentinel_data.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM error_logs WHERE status = "pending" ORDER BY timestamp DESC LIMIT 1')
    alert = cursor.fetchone()
    conn.close()
    
    if alert:
        return {
            "timestamp": alert[0],
            "error": alert[1],
            # Simulated AI Response (Integrating LangGraph here later)
            "ai_suggestion": "Apply default weight (0.0) for NULL values in ETL script."
        }
    return {"message": "All systems nominal"}

@app.post("/fix")
def apply_fix():
    conn = sqlite3.connect('sentinel_data.db')
    cursor = conn.cursor()
    cursor.execute('UPDATE error_logs SET status = "resolved"')
    db.commit()
    return {"status": "Patch Applied"}