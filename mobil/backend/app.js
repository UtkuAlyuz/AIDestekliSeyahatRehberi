const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const mapRoutes = require('./routes/mapRoutes');
const placeRoutes = require('./routes/placeRoutes'); // 👈 EKLENDİ
const geminiRoutes = require('./routes/geminiRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/map', mapRoutes);
app.use('/api/places', placeRoutes); // 👈 EKLENDİ
app.use('/api/gemini', geminiRoutes);


app.get('/', (req, res) => {
  res.send('Backend Server Çalışıyor');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});
