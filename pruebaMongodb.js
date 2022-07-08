const mongoose = require('mongoose');
const Product = require('./models/product.model');

mongoose.connect('mongodb://127.0.0.1:27017/tienda_online');

(async () => {
    // Crear productos
    const product = await Product.create({
        name: 'Macbook Pro',
        description: 'Solo lo compran manzaneros que están a dieta.',
        price: 6400,
        stock: 10,
        department: 'tecnología',
        available: true
    });

    // Recuperar prductos
    const products = await Product.find({
        department: 'Tecnología' || 'tecnología',
        price: { $gt: 500 }
    });
    await mongoose.disconnect();
})();
