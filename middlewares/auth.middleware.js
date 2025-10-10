const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

exports.check = (req, res, next) => {
const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            req.user = decoded;
            return next();
        } catch (err) {
            return res.status(403).json({ message: 'Geçersiz token.' });
        }
    } else return res.status(401).json({ message: 'Token bulunamadı.' });
}