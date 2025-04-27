const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/register', register);

router.post('/login', login);

router.get('/profile', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Profil bilgileri', user: req.user });
});

module.exports = router;
