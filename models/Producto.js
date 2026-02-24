const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    marca: { type: String, required: true }
});

module.exports = mongoose.model('Producto', ProductoSchema);