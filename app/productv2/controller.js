const Product = require('./model');
const multer = require('multer');
const path = require('path');
const fs = require('fs');



const index = (req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(error => res.status(500).send(error));
}

const indexbyId = (req, res) => {
    const productId = req.params.id;
    Product.findById(productId)
        .then(product => {
            if (product) {
                res.json(product);
            } else {
                res.status(404).send('Product not found');
            }
        })
        .catch(error => res.status(500).send(error));
}



const store = (req, res) => {
    const { name, price, stock, status } = req.body;
    const image = req.file;
    if(image){
        const target = path.join(__dirname, '../../uploads', image.originalname)
        fs.rename(image.path, target, (err) => {
            if (err) {
                return res.send(err);
            }
            Product.create({ name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}`})
                .then(result => res.send(result))
                .catch(error => res.send(error));
        });
    }
}

const update = (req, res) => {
    const { id } = req.params;
    const { name, price, stock, status } = req.body;
    const image = req.file;
    const updateData = { name, price, stock, status };
    console.log('ID:', id);

    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        updateData.image_url = `http://localhost:3000/public/${image.originalname}`;
    }

    Product.findByIdAndUpdate(id, updateData, { new: true })
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        })
        .catch(error => res.status(500).json(error));
}

const destroy = (req, res) => {
    const { id } = req.params;
    console.log(`Product with id ${id} is being deleted.`);
    Product.findByIdAndDelete(id)
    .then((product) => {
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    });

}

module.exports = {
    index,
    indexbyId,
    store,
    update,
    destroy
}