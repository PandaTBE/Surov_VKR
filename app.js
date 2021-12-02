const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true }));

app.use('/api', require('./routes/getUserData.routes'));

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        });
        app.listen(PORT, () => console.log(`Приложение запущено на порте ${PORT}...`));
    } catch (error) {
        console.log('Ошибка сервера', error.message);
        process.exit(1);
    }
}
start();
