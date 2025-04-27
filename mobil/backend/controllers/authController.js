const pool = require('../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const register = async (req, res) => {
  const { isim, soyisim, memleket, favoriSehir, telefon, sifre } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(sifre, 10);

    const newUser = await pool.query(
      'INSERT INTO users (isim, soyisim, memleket, favorisehir, telefon, sifre) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [isim, soyisim, memleket, favoriSehir, telefon, hashedPassword]
    );
    

    res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu', user: newUser.rows[0] });
  } catch (err) {
    console.error("Hata detayları:", err);
    res.status(500).json({ error: 'Kullanıcı oluşturulamadı' });
  }
};

const login = async (req, res) => {
  const { telefon, sifre } = req.body;

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE telefon = $1', [telefon]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: 'Telefon numarası bulunamadı' });
    }

    const user = userResult.rows[0];

    const isPasswordValid = await bcrypt.compare(sifre, user.sifre);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Şifre yanlış' });
    }

    res.status(200).json({ message: 'Giriş başarılı', userId: user.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Giriş işlemi sırasında bir hata oluştu' });
  }
};

module.exports = { register, login };

