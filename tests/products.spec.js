const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');
const Product = require('../models/product.model');

describe('Products tests', () => {

    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/tienda_online');
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('GET api/products', () => {
        let response;
        beforeEach(async () => {
            response = await request(app).get('/api/products').send();
        });

        it('debería devolver una respuesta correcta', () => {
            expect(response.statusCode).toBe(200);
        });
        it('debería devolver un objeto en formato json', () => {
            expect(response.headers['content-type']).toContain('application/json');
        });
        it('debería devolver un array', () => {
            expect(response.body).toBeInstanceOf(Array);
        });
    });

    describe('POST api/products', () => {
        const newProduct = {
            name: 'Camiseta',
            description: 'Camiseta de manga corta perfecta para momentos de calor.',
            price: 9,
            stock: 1000,
            department: 'test',
            available: true
        };
        let response;
        beforeEach(async () => {
            response = await request(app).post('/api/products').send(newProduct);
        });

        afterAll(async () => {
            await Product.deleteMany({ department: 'test' });
        });

        it('Producto creado correctamente', () => {
            expect(response.statusCode).toBe(201);
        });
        it('debería devolver un objeto en formato json', () => {
            expect(response.headers['content-type']).toContain('application/json');
        });
        it('debería devolver un true', () => {
            expect(response.body).toHaveProperty('_id');
        });
        it('debería devolver el nombre del producto correcto', () => {
            expect(response.body.name).toEqual(newProduct.name);
        });
    });

    describe('PUT api/products/:productId', () => {

        let response;
        let productToEdit;
        beforeEach(async () => {
            productToEdit = await Product.create({ name: 'Camiseta', description: 'Camiseta de manga corta perfecta para momentos de calor.', price: 9, stock: 1000, department: 'test', available: true });

            response = await request(app).put(`/api/products/${productToEdit._id}`).send({ price: 45, stock: 200 });
        });

        afterEach(async () => {
            await Product.findByIdAndDelete(productToEdit._id);
        });

        it('Producto creado correctamente', () => {
            expect(response.statusCode).toBe(200);
        });
        it('debería devolver un objeto en formato json', () => {
            expect(response.headers['content-type']).toContain('application/json');
        });
        it('debería devolver el nombre del producto correcto', () => {
            expect(response.body.price).toBe(45);
            expect(response.body.stock).toBe(200);
        });
    });
});