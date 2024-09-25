require('./config/mongoose');
const express = require('express');
const path = require('path');
const app = express();
const log = require('./middlewares/logger');
const productRouter1 = require('./app/productv1/routes');
const productRouter2 = require('./app/productv2/routers');
const cors = require('cors');



app.use(cors());
app.use(log);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '../uploads')));

app.use('/api/v1', productRouter1);
app.use('/api/v2', productRouter2);

app.use((req, res, next) => {
    res.status(404)
    res.send({ 
        status: 'Failed',
        message: 'Not Found' });
  });

app.listen(3000, () => {
  console.log(`Server: http://localhost:3000`);
});
module.exports = app;