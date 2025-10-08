const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB bağlantısı başarılı!');
    } catch (err) {
        console.error('Mongodb bağlantı hatası: ', err);
        process.exit(1);
    }
}

module.exports = connectDb;