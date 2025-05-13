const express = require('express');
const router = express.Router();
const { runGeminiScript } = require('../controllers/geminiController');

router.post('/generate', runGeminiScript);

module.exports = router;
