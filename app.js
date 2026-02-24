const express = require('express');
const mongoose = require('mongoose');
const Producto = require('./models/Producto'); // Importamos el modelo
const app = express();


app.use(express.json()); // Permite que el servidor entienda formato JSON

// 1. CONEXIÓN A MONGODB COMPASS
mongoose.connect('mongodb://localhost:27017/GestionTienda')
    .then(() => console.log("✅ Conectado a la BD"))
    .catch(err => console.log("❌ Error:", err));

// --- MÓDULO CRUD ---

// C - CREATE (Crear un producto nuevo)
app.post('/api/crear', async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        res.status(201).send("Producto guardado con éxito");
    } catch (error) {
        res.status(400).send("Error al crear: " + error.message);
    }
});

// R - READ (Leer/Obtener todos los productos)
app.get('/api/leer', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).send("Error técnico: " + error.message);
    }
});

// U - UPDATE (Actualizar un producto por su ID)
app.put('/api/actualizar/:id', async (req, res) => {
    try {
        const actualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(actualizado);
    } catch (error) {
        res.status(400).send("Error al actualizar");
    }
});

// D - DELETE (Borrar un producto por su ID)
app.delete('/api/borrar/:id', async (req, res) => {
    try {
        await Producto.findByIdAndDelete(req.params.id);
        res.send("Producto eliminado correctamente");
    } catch (error) {
        res.status(500).send("Error al borrar");
    }
});

// --- CONSULTA SENCILLA ---
// Ejemplo: Buscar productos que tengan un stock menor a 10 unidades
app.get('/api/consulta/stock-critico', async (req, res) => {
    try {
        const bajos = await Producto.find({ stock: { $lt: 10 } });
        res.json(bajos);
    } catch (error) {
        res.status(500).send("Error en la consulta");
    }
});

app.listen(3000, () => console.log("🚀 Servidor corriendo en puerto 3000"));