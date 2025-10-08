const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Email veya şifre hatalı.' });
        }
        const token = jwt.sign({ email: user.email, id: user._id }, 'gizliAnahtar', { expiresIn: '1h' });
        res.json({ message: 'Giriş başarılı.', token });
    } catch (err) {
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
};

exports.register = async (req, res) => {
    const { name, email, password, passwordAgain } = req.body;
    if (password !== passwordAgain) {
        return res.status(400).send("Şifreler eşleşmiyor!");
    }

    const exists = await User.findOne({ email });
    if (exists) {
        return res.status(400).send("Email sistemde kayıtlı!");
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "Kayıt başarılı!", user: { name, email } });
};