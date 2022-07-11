const router = require('express').Router();
const User = require('../../models/user.model');

router.get('/', async (req, res) => {
    try {
        const users = await User
            .find()
            .populate('products')
            .exec();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            message: 'El usuario fue creado correctamente.',
            user
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.put('/:userId/product/:productId', async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const user = await User.findById(userId);

        user.products.push(productId);
        await user.save();

        res.json({
            message: 'El usuario fue actualizado correctamente.',
            user
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;