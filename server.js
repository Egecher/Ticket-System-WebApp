const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

const userRouter = require('./routes/user.routes');

app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/new', (req, res) => {
    const { name, email, title, description } = req.body;
    res.status(201).send(`Ticket başarıyla oluşturuldu: ${title}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/`);
});