const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/check', authMiddleware.check, (req, res) => {
    res.json({ message: 'Kullanıcı doğrulandı.', user: req.user });
});

module.exports = router;