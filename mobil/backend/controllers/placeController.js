const pool = require('../db/db');

const insertPlaces = async (req, res) => {
  const places = req.body;

  if (!Array.isArray(places)) {
    return res.status(400).json({ error: 'Veri formatı geçersiz. Bir dizi bekleniyor.' });
  }

  try {
    for (const place of places) {
      const { isim, ilce, turizm_turleri } = place;

      if (!isim || !ilce || !Array.isArray(turizm_turleri)) continue;

      await pool.query(
        'INSERT INTO places (isim, ilce, turizm_turleri) VALUES ($1, $2, $3)',
        [isim, ilce, turizm_turleri]
      );
    }

    res.status(201).json({ message: 'Yerler başarıyla kaydedildi.' });
  } catch (err) {
    console.error('Veritabanı hatası:', err);
    res.status(500).json({ error: 'Kayıt sırasında bir hata oluştu.' });
  }
};

module.exports = { insertPlaces };
