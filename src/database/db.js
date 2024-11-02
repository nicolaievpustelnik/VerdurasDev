const mongoose = require('mongoose');

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env;
const MONGODB_URL = `mongodb://${NOTES_APP_MONGODB_HOST}:27017/${NOTES_APP_MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database is connected'))
    .catch(err => {
        console.error('Database connection error:', err);
        process.exit(1); // Finaliza la aplicación si la conexión falla
    });

// Cerrar la conexión cuando la aplicación se detenga
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
});
