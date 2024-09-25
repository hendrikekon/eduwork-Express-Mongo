const db = require('../../config/mongodb')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {ObjectId} = require('bson')



const index = (req, res) => {
    db.collection('product').find()
        .toArray()
        .then(result=> res.send(result))
        .catch(error => res.status(500).send(error));
}

const indexbyId = (req, res) => {
    const {id} = req.params;
    db.collection('product').findOne({_id: new ObjectId(id)})
        .then(result=> res.send(result))
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
            db.collection('product').insertOne({ name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}`})
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

    db.collection('product').updateOne({_id: new ObjectId(id)}, {$set: updateData})
        .then(result => {
            if (!result) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(result);
        })
        .catch(error => res.status(500).json(error));
}

const destroy = (req, res) => {
    const { id } = req.params;
    console.log(`Product with id ${id} is being deleted.`);
    db.collection('product').deleteOne({_id: new ObjectId(id)})
    .then((result) => {
        if (!result) {
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