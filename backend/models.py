# models.py
import os
from datetime import datetime
from dotenv import load_dotenv

from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, Float
from sqlalchemy.orm import sessionmaker, declarative_base

# baca .env di root project (atau folder backend jika .env disitu)
load_dotenv()

# Ambil DATABASE_URL dari environment (atau .env setelah load_dotenv)
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError(
        "DATABASE_URL tidak ditemukan. "
        "Buat file .env di folder project atau set environment variable DATABASE_URL."
    )

# Gunakan driver psycopg (psycopg3) bila belum dispesifikasikan
if DATABASE_URL.startswith("postgresql://") and "+psycopg" not in DATABASE_URL and "+psycopg2" not in DATABASE_URL:
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg://", 1)

# Jika sqlite, tambahkan connect_args
connect_args = {}
if DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

# Buat SQLAlchemy engine
engine = create_engine(DATABASE_URL, connect_args=connect_args)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base declarative
Base = declarative_base()

class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    review_text = Column(Text, nullable=False)
    sentiment = Column(String(20), nullable=False)
    sentiment_score = Column(Float, nullable=False)
    key_points = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "review_text": self.review_text,
            "sentiment": self.sentiment,
            "sentiment_score": self.sentiment_score,
            "key_points": self.key_points,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }

# Buat tabel hanya jika models.py dijalankan langsung
if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    print("Tabel dibuat/cek berhasil.")
