Design: SentinelFlow – Agentic Data Observability
1. Overview
SentinelFlow is a specialized observability platform designed to minimize "mean time to recovery" (MTTR) for data engineering pipelines. Unlike passive monitoring tools that only alert developers, SentinelFlow implements an agentic loop that intercepts SQL execution errors and applies programmatic patches to restore pipeline health.

2. Architecture
The system follows a decoupled architecture to ensure low latency and high observability:

Observability Layer (Backend): Built with FastAPI. It acts as the orchestration point, executing ETL jobs and wrapping SQL transactions in an error-handling middleware.

Agentic Logic: Upon catching a database exception (e.g., sqlite3.OperationalError), the agent maps the error code to a library of "fix" patterns (SQL patches).

Presentation Layer (Frontend): Built with Next.js 14. It provides a high-contrast, "tech-noir" dashboard that consumes the FastAPI health endpoints, visualizing pipeline status and remediation events.

3. Data Flow & Remediation Loop
Ingestion: The FastAPI engine processes data batches.

Detection: If a data inconsistency (e.g., missing column or schema drift) occurs, the try-except block triggers an ObservabilityEvent.

Visualization: The error state is pushed to the Next.js frontend via an API response, highlighting the specific fault.

Remediation: The user triggers the "Fix" button, sending an asynchronous request to the backend. The agent then executes a DDL (Data Definition Language) patch to reconcile the database state.

4. Design Choices
Why FastAPI? Chosen for its asynchronous capabilities, which are essential for handling real-time observability telemetry without blocking the main data pipeline execution.

Why Next.js/Tailwind? Selected for a high-performance, responsive UI that maintains a minimalist information hierarchy, crucial for engineers monitoring complex systems.

Why SQLite? Used as the primary data store to demonstrate "local-first" development and to allow for rapid, repeatable error-injection and schema-patching demonstrations in a contained environment.

5. Challenges & Solutions
Challenge: Detecting the specific root cause of a SQL failure automatically.

Solution: Implemented a pattern-matching strategy in the error handler that extracts the error message, matches it against known schema-drift patterns, and selects the corresponding SQL patch.