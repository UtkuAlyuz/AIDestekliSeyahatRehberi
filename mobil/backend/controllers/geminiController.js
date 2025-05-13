const dotenv = require('dotenv');
dotenv.config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const pool = require('../db/db'); // senin mevcut db bağlantı dosyan

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const runGeminiScript = async (req, res) => {
  const { city } = req.body;

  if (!city) {
    return res.status(400).json({ error: 'Şehir adı eksik.' });
  }

  const prompt = `
${city} şehrinde gezilecek maksimum 10 yeri JSON formatında listele.

Her yer için:
- "isim": yerin adı (zorunlu),
- "ilce": bulunduğu ilçe (zorunlu),
- "turizm_turleri": ["Tarihi", "Doğa", "Kültürel", "Gece Hayatı", "Alışveriş"]

Sadece geçerli ve tek bir JSON dizisi döndür. Örnek:

[
  {
    "isim": "Galata Kulesi",
    "ilce": "Beyoğlu",
    "turizm_turleri": ["Tarihi"]
  }
]
`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    const jsonText = extractJsonArray(text);
    const places = JSON.parse(jsonText);

    // DB'ye kaydet
    for (const place of places) {
      const { isim, ilce, turizm_turleri } = place;

      if (!isim || !ilce || !Array.isArray(turizm_turleri)) continue;

      await pool.query(
        'INSERT INTO places (isim, ilce, turizm_turleri) VALUES ($1, $2, $3)',
        [isim, ilce, turizm_turleri]
      );
    }

    res.status(201).json({ message: 'Gemini API’den alınan veriler kaydedildi.', count: places.length });
  } catch (error) {
    console.error('❌ Gemini hatası:', error);
    res.status(500).json({ error: 'Gemini API hatası', detail: error.message });
  }
};

function extractJsonArray(text) {
  const match = text.match(/\[\s*{[\s\S]*}\s*]/);
  if (!match) {
    throw new Error('Gelen içerikte geçerli JSON dizisi bulunamadı.');
  }
  return match[0];
}

module.exports = { runGeminiScript };
