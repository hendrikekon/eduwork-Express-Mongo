const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const productController1 = require('./controller');


router.get('/product', productController1.index);
router.get('/product/:id', productController1.indexbyId);
router.post('/product', upload.single('image'), productController1.store);
router.patch('/product/:id', upload.single('image'), productController1.update);
router.delete('/product/:id', productController1.destroy);

module.exports = router;