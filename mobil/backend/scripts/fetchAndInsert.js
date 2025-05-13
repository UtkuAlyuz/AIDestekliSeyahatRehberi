const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const pool = require('../db/db'); // senin mevcut PostgreSQL bağlantın

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY bulunamadı. .env dosyasını kontrol edin.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function fetchPlacesFromGemini(cityName) {
  const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash' });

  const prompt = `
${cityName} şehrinde gezilecek maksimum 10 yeri JSON formatında listele.

Her yer için:
- "isim": yerin adı (zorunlu),
- "ilce": bulunduğu ilçe (zorunlu),
- "turizm_turleri": ["Tarihi", "Doğa", "Kültürel", "Gece Hayatı", "Alışveriş"]

Lütfen sadece geçerli ve tam bir JSON dizisi döndür. Örnek:

[
  {
    "isim": "Galata Kulesi",
    "ilce": "Beyoğlu",
    "turizm_turleri": ["Tarihi"]
  }
]

JSON dışında hiçbir açıklama yazma. Açıklama ekleme, fazla {} kullanma.
`;

  try {
    console.log(`📍 "${cityName}" için Gemini API çağrısı yapılıyor...\n`);

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      console.error('❌ JSON parse hatası. Gelen veri:\n', text);
      return;
    }

    console.log('✅ JSON ayrıştırması başarılı. Veritabanına ekleniyor...\n');

    for (const place of parsed) {
      const { isim, ilce, turizm_turleri } = place;
      if (!isim || !ilce || !Array.isArray(turizm_turleri)) continue;

      await pool.query(
        'INSERT INTO places (isim, ilce, turizm_turleri) VALUES ($1, $2, $3)',
        [isim, ilce, turizm_turleri]
      );
    }

    console.log('✅ Tüm veriler başarıyla kaydedildi.');
  } catch (err) {
    console.error('❌ Gemini API hatası:', err.message);
  }
}

const city = process.argv[2];
if (!city) {
  console.error('Lütfen bir şehir adı girin. Örn: node fetchAndInsert.js Istanbul');
  process.exit(1);
}

fetchPlacesFromGemini(city);
