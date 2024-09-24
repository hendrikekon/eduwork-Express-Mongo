const mongoose = require('mongoose');

mongoose.connect('mongodb://hendrik%20rw-coba:121212-rw-coba@localhost:27017/eduwork-mongoose?authSource=admin')

const db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('Server database terhubung'));