const {MongoClient} = require('mongodb');

const url =  'mongodb://hendrik%20rw-coba:121212-rw-coba@localhost:27017/?authSource=admin';
const client = new MongoClient(
    url
);

(async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB Native');
    } catch (error) {
        console.error('Failed to connect to MongoDB Native', error);
    }
})();

const db = client.db('eduwork-native');

module.exports = db;