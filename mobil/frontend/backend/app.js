const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

app.use(cors());
app.use(express.json());

// PostgreSQL Bağlantısı
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'seyahatrehberi', // Veritabanı adın
  password: 'parolan', // PostgreSQL parolan
  port: 5432,
});

// Kullanıcı Kaydetme
app.post('/register', async (req, res) => {
  const { isim, soyisim, memleket, favoriSehir, telefon, sifre } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (isim, soyisim, memleket, favoriSehir, telefon, sifre) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [isim, soyisim, memleket, favoriSehir, telefon, sifre]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Kullanıcı Girişi
app.post('/login', async (req, res) => {
  const { telefon, sifre } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE telefon = $1 AND sifre = $2',
      [telefon, sifre]
    );
    if (result.rows.length > 0) {
      res.json({ message: 'Giriş başarılı!', user: result.rows[0] });
    } else {
      res.status(400).json({ message: 'Hatalı telefon numarası veya şifre!' });
    }
  } catch (err) {
    console.error(err.message);
  }
});

// Sunucuyu Başlatma
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
