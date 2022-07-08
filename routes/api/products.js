const router = require('express').Router();
const Product = require('../../models/product.model');

router.get('/', (req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.json({ error: err.message }));
});

router.get('/:price', (req, res) => {
    const { price } = req.params;
    Product.find({ price: { $gt: price } })
        .then(products => res.json(products))
        .catch(err => res.json({ error: err.message }));
});

router.post('/', (req, res) => {

    Product.create(req.body)
        .then(product => res.status(201).json(product))
        .catch(err => res.status(500).json({ error: err.message }));
});
router.put('/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        // const product = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        const product = await Product.findOneAndUpdate(productId, req.body);
        res.json(product);
    } catch (err) {
        res.json({ error: err.message });
    }

});

module.exports = router;