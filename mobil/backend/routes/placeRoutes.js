const express = require('express');
const router = express.Router();
const { insertPlaces } = require('../controllers/placeController');

router.post('/create', insertPlaces);

module.exports = router;

