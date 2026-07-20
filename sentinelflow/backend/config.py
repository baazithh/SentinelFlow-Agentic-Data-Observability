import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    DATABASE_PATH = "your_database_file.db"
    PORT = 8000