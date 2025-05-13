const express = require('express');
const router = express.Router();

router.get('/key', (req, res) => {
  res.json({ apiKey: process.env.MAP_API_KEY });
});

module.exports = router;
