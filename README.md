# Product Review Analyzer 

**Tugas Individu 3 - PAW**

**Nama**: Elfa Noviana Sari 

**NIM**: 123140066 

**Kelas**: RB

Aplikasi web untuk ini untuk menganalisis ulasan produk menggunakan teknologi AI. Backend dibangun menggunakan **Flask** dan **PostgreSQL**, terintegrasi dengan **Hugging Face Transformers** untuk analisis sentimen dan **Google Gemini AI** untuk ekstraksi poin penting.

---

## Fitur Utama

- **Sentiment Analysis**: Mengklasifikasikan ulasan (Positive/Negative/Neutral) menggunakan model `distilbert-base-uncased-finetuned-sst-2-english`
- **Key Point Extraction**: Menggunakan Google Gemini (`gemini-1.5-flash`) untuk merangkum poin-poin penting dari ulasan
- **Filtering Logic**: Logika kustom untuk menentukan sentimen netral berdasarkan confidence score (< 0.70)
- **Database Storage**: Menyimpan hasil analisis secara permanen di PostgreSQL
- **RESTful API**: Menyediakan endpoint untuk analisis dan pengambilan riwayat data

---

## Tech Stack

### Backend
- **Python 3.x**
- **Flask**: Web Framework
- **SQLAlchemy**: ORM untuk interaksi database
- **PostgreSQL**: Database utama (menggunakan driver `psycopg`)

### AI & Machine Learning
- **Hugging Face Transformers**: Pipeline lokal untuk analisis sentimen
- **Google Generative AI SDK**: Interface ke Gemini API

### Frontend
- **React.js**: Antarmuka pengguna modern dan responsif

---

## Prasyarat

Pastikan sudah terinstall:
- Python 3.8 atau lebih baru
- PostgreSQL (versi 12+)
- Node.js (versi 14+)
- pip (Python package manager)

---

## Cara Menjalankan Aplikasi

### 1. Setup Backend

Masuk ke folder backend/root project:

```bash
# Buat virtual environment
python -m venv venv

# Aktifkan virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate
```

Install dependencies:

```bash
pip install flask flask-cors sqlalchemy psycopg google-generativeai transformers torch python-dotenv
```

Atau jika tersedia `requirements.txt`:

```bash
pip install -r requirements.txt
```

### 2. Konfigurasi Environment Variables

Buat file `.env` di folder yang sama dengan `app.py`, lalu isi konfigurasi berikut:

```env
# Database Configuration
DATABASE_URL=postgresql://postgres:password@localhost:5432/product_review_db

# Google Gemini API
GEMINI_API_KEY=XXXX
GEMINI_MODEL_NAME=models/gemini-1.5-flash-latest

# Huggingface API
HUGGINGFACE_API_KEY=XXXXX
```

**Catatan**: 
- Ganti `password` dengan password PostgreSQL Anda
- Dapatkan API Key Gemini dari [Google AI Studio](https://makersuite.google.com/app/apikey)
- Pastikan database `product_review_db` sudah dibuat di PostgreSQL

### 3. Setup Database

Buat database di PostgreSQL:

```sql
CREATE DATABASE product_review_db;
```

Jalankan `models.py` untuk membuat tabel:

```bash
python models.py
```

Output sukses: "Tabel dibuat/cek berhasil."

### 4. Jalankan Server Backend

```bash
python app.py
```

Server akan berjalan di `http://localhost:5000`

### 5. Setup Frontend (React)

Buka terminal baru, masuk ke folder frontend:

```bash
cd frontend
npm install
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`

---

## Dokumentasi API

### 1. Analyze Review

Menganalisis teks ulasan baru.

- **URL**: `/api/analyze-review`
- **Method**: `POST`
- **Validasi**: Teks minimal 10 karakter

**Request Body**:
```json
{
  "review_text": "The product design is amazing, but the battery life is terrible."
}
```

**Response**:
```json
{
  "id": 1,
  "review_text": "The product design is amazing, but the battery life is terrible.",
  "sentiment": "negative",
  "sentiment_score": 0.98,
  "key_points": "- Amazing design\n- Terrible battery life",
  "created_at": "2025-12-11T10:00:00"
}
```

### 2. Get All Reviews

Mengambil riwayat ulasan dengan opsi filter.

- **URL**: `/api/reviews`
- **Method**: `GET`

**Query Parameters**:
- `sentiment` (optional): Filter berdasarkan `positive`, `negative`, atau `neutral`
- `limit` (optional): Batasi jumlah data yang dikembalikan

**Contoh**:
```
GET /api/reviews?sentiment=negative&limit=5
```

**Response**:
```json
[
  {
    "id": 1,
    "review_text": "...",
    "sentiment": "negative",
    "sentiment_score": 0.98,
    "key_points": "...",
    "created_at": "2025-12-11T10:00:00"
  }
]
```

---

## Struktur Project

```
/project-root
├── backend/
│   ├── app.py              # Entry point & API Routes
│   ├── models.py           # Database models & SQLAlchemy config
│   ├── analyzer.py         # AI logic (Hugging Face & Gemini)
│   ├── .env                # Environment variables (jangan commit!)
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

---

## Testing

Untuk testing API menggunakan curl :

```bash
# Test analyze review
curl -X POST http://localhost:5000/api/analyze-review \
  -H "Content-Type: application/json" \
  -d '{"review_text": "This product exceeded my expectations!"}'

# Test get reviews
curl http://localhost:5000/api/reviews?limit=10
```

---

## Troubleshooting

### Error: ModuleNotFoundError
Pastikan virtual environment sudah diaktifkan dan semua dependencies terinstall.

### Error: Database connection failed
- Pastikan PostgreSQL service sedang berjalan
- Cek kredensial di file `.env`
- Pastikan database sudah dibuat

### Error: Gemini API Key invalid
- Verifikasi API key di [Google AI Studio](https://makersuite.google.com/app/apikey)
- Pastikan tidak ada spasi atau karakter tambahan di `.env`

---

## Dokumentasi Hasil
1. inputan untuk melakukan pengecekan product review analyzer
![Gambar WhatsApp 2025-12-11 pukul 17 32 09_d23327f7](https://github.com/user-attachments/assets/0ca32f01-5543-477b-b740-9bca1fe82477)
2. Hasil inputan untuk kategori positive
![Gambar WhatsApp 2025-12-11 pukul 17 32 35_33717b8d](https://github.com/user-attachments/assets/58df515e-0c74-4329-a472-ff6fc4e429a0)
3. inputan untuk melakukan pengecekan product review analyzer
![Gambar WhatsApp 2025-12-11 pukul 17 30 55_4366e14f](https://github.com/user-attachments/assets/33ec2e63-1cce-4fc0-aded-3af470c8e97b)
4. Hasil inputan untuk kategori negative
![Gambar WhatsApp 2025-12-11 pukul 17 31 26_51f503f6](https://github.com/user-attachments/assets/40f8cb86-9452-47cf-bb83-05fca095b41e)
5. inputan untuk melakukan pengecekan product review analyzer
![Gambar WhatsApp 2025-12-11 pukul 17 29 00_d63e17aa](https://github.com/user-attachments/assets/0ecbed04-975c-4cc8-8f46-458bb6de794a)
6. Hasil inputan untuk kategori neutral
![Gambar WhatsApp 2025-12-11 pukul 17 29 13_199930bb](https://github.com/user-attachments/assets/212dd086-0e30-4b52-acbc-21d7452c5736)
7. Recent Reviews
![Gambar WhatsApp 2025-12-11 pukul 17 32 47_0af19612](https://github.com/user-attachments/assets/ce25fa18-b0f2-4dc3-9493-fc83d5cdde41)
9. Database product review analyzer pada postgre
![Gambar WhatsApp 2025-12-11 pukul 18 28 07_c316cfe6](https://github.com/user-attachments/assets/8f1e6800-5f0b-4956-bab0-1eaa676f3da3)

   
---
