# SentinelFlow: Agentic Data Observability Platform

## Description
SentinelFlow is an agentic data observability platform designed to monitor ETL pipelines in real-time and provide autonomous self-healing for schema and data quality errors. It helps data engineers reduce downtime by automatically patching common SQL inconsistencies.

## Demo Video
[Insert your YouTube link here]

## Key Features
- **Real-time Monitoring**: Tracks pipeline execution states via FastAPI.
- **Agentic Self-Healing**: Automatically detects `OperationalError` events and executes targeted SQL patches.
- **Glassmorphic UI**: Built with Next.js 14 and Tailwind CSS for a modern, high-contrast dashboard experience.
- **Observability Engine**: Provides deep visibility into data asset health.

## Technologies Used
- **Backend**: FastAPI (Python)
- **Frontend**: Next.js 14, Tailwind CSS
- **Database**: SQLite (SQL-based error injection & recovery)
- **Deployment**: Arch Linux environment

## How to Run
1. Clone the repository.
2. Setup the virtual environment: `python -m venv venv && source venv/bin/activate`
3. Install dependencies: `pip install -r requirements.txt`
4. Launch the API: `python -m uvicorn main:app --reload`
5. Access the dashboard to monitor live events.

## Design Philosophy
SentinelFlow utilizes an agent-based approach to data observability, moving beyond simple alerting to automated remediation. The architecture emphasizes high-performance data processing with a minimalist information hierarchy.