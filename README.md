# SentinelFlow: Agentic Data Observability 🛰️

SentinelFlow is a proactive data engineering dashboard that doesn't just monitor pipelines—it fixes them. Using a "Human-in-the-Loop" AI Agent, it detects data quality failures in real-time and proposes SQL/ETL hotfixes.

## 🚀 The Architecture
- **Data Engineering:** Python-based stream simulation with SQLite (simulating an Iceberg/Lakehouse layer).
- **AI Agent:** Built with a custom Logic Engine (LangChain ready) to diagnose pipeline logs.
- **Web Interface:** Next.js 15 dashboard with real-time polling and one-click remediation.

## 🛠️ Tech Stack
- **Frontend:** Next.js, Tailwind CSS, Lucide Icons
- **Backend:** FastAPI, Pydantic
- **Data:** Python, SQLite
- **Environment:** Arch Linux

## 🏁 Quick Start
1. **Start the Pipeline:** `python data_layer/scripts/stream_processor.py`
2. **Launch the API:** `uvicorn backend.api.main:app --reload`
3. **Run the Dashboard:** `cd frontend && npm run dev`