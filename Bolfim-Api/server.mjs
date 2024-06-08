// server.mjs
import express from 'express';
import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';

import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json()); // Middleware para analizar el cuerpo de la solicitud como JSON

async function connectToDatabase() {
    try {
        await client.connect();
        return client.db('Bolfim');
    } catch (error) {
        console.error('Error al conectarse a la Base de Datos:', error);
    }
}

//Validar usuario
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');
        const user = await collection.findOne({ user_email: email, user_password: password });
        if (!user) {
            res.status(401).json({ message: 'Credenciales inválidas' });
            return;
        }
        // Si se encontró el usuario, enviar su nombre de usuario y rol en la respuesta
        res.status(200).json({ 
            message: 'Inicio de sesión exitoso', 
            userName: user.user_name, 
            userRole: user.user_rol,
            userId: user._id
        });
        const accesDate = new Date().toISOString();
        console.log('Conectado a la Base de Datos Bolfim');
        console.log("Inicio de Sesion como: ",user.user_name, " Fecha: ",accesDate)
    } catch (error) {
        console.error('Error de autenticación:', error);
        
        res.status(500).json({ message: 'Error de autenticación' });
    }
});

// CRUD para productos
app.get('/GetProducts', async (req,res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('orders');
        const products = await collection.find({}).toArray();
        
        // Si se encuentran productos, envíalos en la respuesta
        res.status(200).json({ 
            products
        });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
});

app.get('/GetProduct/:id', async (req, res) => {
    const ordenId = new ObjectId(req.params.id);
    try {
        const db = await connectToDatabase();
        const collection = db.collection('orders');
        const orden = await collection.findOne({ _id: ordenId });
        
        if (orden) {
            res.status(200).json(orden);
        } else {
            res.status(404).json({ message: 'Orden no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener la Orden:', error);
        res.status(500).json({ message: 'Error al obtener la orden' });
    }
});

// Endpoint para manejar las solicitudes de creación de nuevos productos
app.post('/CreateProducts', async (req, res) => {
    const newProduct = req.body;
    
    try {
        const db = await connectToDatabase();
        const collection = db.collection('orders');
        await collection.insertOne(newProduct);
        
        res.status(201).json({ message: 'Producto creado exitosamente' });
        console.log('Producto creado exitosamente:', newProduct);
    } catch (error) {
        console.error('Error al crear un nuevo producto:', error);
        res.status(500).json({ message: 'Error al crear un nuevo producto' });
    }
});

// Endpoint para manejar las solicitudes de actualización de productos
app.put('/UpdateProduct/:id', async (req, res) => {
    const productId = new ObjectId(req.params.id);
    console.log(productId);
    const updatedProduct = req.body;
    
    try {
        const db = await connectToDatabase();
        const collection = db.collection('orders');
        
        // Verificar si el producto existe
        const product = await collection.findOne({ _id: productId });
        if (!product) {
            res.status(404).json({ message: 'El producto no existe' });
            return;
        }

        // Actualizar el producto
        await collection.updateOne({ _id: productId }, { $set: updatedProduct });
        
        res.status(200).json({ message: 'Producto actualizado exitosamente' });
        console.log(`Producto con ID ${productId} actualizado exitosamente`);
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ message: 'Error al actualizar el producto con ID:', productId });
    }
});

// Endpoint para manejar las solicitudes de eliminación de productos
app.delete('/DeleteProducts/:id', async (req, res) => {
    const productId = new ObjectId(req.params.id);
    
    try {
        const db = await connectToDatabase();
        const collection = db.collection('orders');
        
        // Verificar si el producto existe
        const product = await collection.findOne({ _id: productId });
        if (!product) {
            res.status(404).json({ message: 'El producto no existe' });
            return;
        }

        // Si el producto existe, eliminarlo
        await collection.deleteOne({ _id: productId });
        
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
        console.log(`Producto con ID ${productId} eliminado exitosamente`);
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ message: 'Error al eliminar el producto con ID:', productId });
    }
});


// CRUD para usuarios
app.get('/GetUsers', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');
        const users = await collection.find({}).toArray();
        
        // Si se encuentran usuarios, envíalos en la respuesta
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
});

app.post('/CreateUsers', async (req, res) => {
    const newUser = req.body;
    
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');
        await collection.insertOne(newUser);
        
        res.status(201).json({ message: 'Usuario creado exitosamente' });
        console.log('Usuario creado exitosamente:', newUser);
    } catch (error) {
        console.error('Error al crear un nuevo usuario:', error);
        res.status(500).json({ message: 'Error al crear un nuevo usuario' });
    }
});

app.put('/UpdateUsers/:id', async (req, res) => {
    const userId = new ObjectId(req.params.id);
    console.log(userId);
    const updatedUser = req.body;
    
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');
        
        // Verificar si el usuario existe
        const user = await collection.findOne({ _id: userId });
        if (!user) {
            res.status(404).json({ message: 'El usuario no existe' });
            return;
        }

        // Actualizar el usuario
        await collection.updateOne({ _id: userId }, { $set: updatedUser });
        
        res.status(200).json({ message: 'Usuario actualizado exitosamente' });
        console.log(`Usuario con ID ${userId} actualizado exitosamente`);
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ message: 'Error al actualizar el usuario con ID:', userId });
    }
});

app.delete('/DeleteUsers/:id', async (req, res) => {
    const userId = new ObjectId(req.params.id);
    
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');
        
        // Verificar si el usuario existe
        const user = await collection.findOne({ _id: userId });
        if (!user) {
            res.status(404).json({ message: 'El usuario no existe' });
            return;
        }

        // Si el usuario existe, eliminarlo
        await collection.deleteOne({ _id: userId });
        
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
        console.log(`Usuario con ID ${userId} eliminado exitosamente`);
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ message: 'Error al eliminar el usuario con ID:', userId });
    }
});


app.get('/GetAlmacen', async (req,res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('materiaPrima');
        const materias = await collection.find({}).toArray();
        
        // Si se encuentran productos, envíalos en la respuesta
        res.status(200).json({ 
            materias
        });
    } catch (error) {
        console.error('Error al obtener la Materia Prima:', error);
        res.status(500).json({ message: 'Error al obtener la Materia Prima' });
    }
});

// Endpoint para manejar las solicitudes de creación de nuevas materias primas
app.post('/CreateAlmacen', async (req, res) => {
    const newMateria = req.body;
    
    try {
        const db = await connectToDatabase();
        const collection = db.collection('materiaPrima');
        await collection.insertOne(newMateria);
        
        res.status(201).json({ message: 'Materia creada exitosamente' });
        console.log('Materia creada exitosamente:', newMateria);
    } catch (error) {
        console.error('Error al crear una nueva materia:', error);
        res.status(500).json({ message: 'Error al crear una nueva materia' });
    }
});

// Endpoint para manejar las solicitudes de actualización de materias primas
// Endpoint para manejar las solicitudes de actualización de materias primas
app.put('/UpdateAlmacen/:id', async (req, res) => {
    const materiaId = new ObjectId(req.params.id);
    console.log(materiaId);
    const updatedMateria = req.body;
    
    try {
        const db = await connectToDatabase();
        const collection = db.collection('materiaPrima');
        
        // Verificar si el producto existe
        const materia = await collection.findOne({ _id: materiaId });
        if (!materia) {
            res.status(404).json({ message: 'La materia no existe' });
            return;
        }

        // Actualizar el producto
        await collection.updateOne({ _id: materiaId }, { $set: updatedMateria });
        
        res.status(200).json({ message: 'Materia actualizada exitosamente' });
        console.log(`Materia con ID ${materiaId} actualizada exitosamente`);
    } catch (error) {
        console.error('Error al actualizar materia:', error);
        res.status(500).json({ message: 'Error al actualizar el producto con ID:', materiaId });
    }
});
// Endpoint para manejar las solicitudes de eliminación de productos
app.delete('/DeleteAlmacen/:id', async (req, res) => {
    const materiaId = new ObjectId(req.params.id);
    
    try {
        const db = await connectToDatabase();
        const collection = db.collection('materiaPrima');
        
        // Verificar si el producto existe
        const materia = await collection.findOne({ _id: materiaId });
        if (!materia) {
            res.status(404).json({ message: 'El producto no existe' });
            return;
        }

        // Si la materia existe, eliminarlo
        await collection.deleteOne({ _id: materiaId });
        
        res.status(200).json({ message: 'Materia prima eliminada exitosamente' });
        console.log(`Materia con ID ${materiaId} eliminada exitosamente`);
    } catch (error) {
        console.error('Error al eliminar la materia:', error);
        res.status(500).json({ message: 'Error al eliminar la materia con ID:', materiaId });
    }
});

app.post('/CreateCompra', async (req, res) => {
    const newCompra = req.body;
    try {
        const db = await connectToDatabase();
        const collection = db.collection('compras');
        await collection.insertOne(newCompra);
        
        // Si la compra se creó correctamente, envía la compra en la respuesta
        res.status(200).json({ message: "Compra registrada correctamente" });
        console.log('Compra registrada correctamente:', newCompra);
    } catch (error) {
        console.error('Error al registrar la compra:', error);
        res.status(500).json({ message: 'Error al registrar la compra' });
    }
});

app.get('/GetCompras', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('compras');
        const compras = await collection.find({}).toArray();
        
        // Si se encuentran compras, envíalas en la respuesta
        res.status(200).json({ compras });
    } catch (error) {
        console.error('Error al obtener las compras:', error);
        res.status(500).json({ message: 'Error al obtener las compras' });
    }
});
app.get('/GetCompra/:id', async (req, res) => {
    const compraId = new ObjectId(req.params.id);
    try {
        const db = await connectToDatabase();
        const collection = db.collection('compras');
        const compra = await collection.findOne({ _id: compraId });
        
        if (compra) {
            res.status(200).json(compra);
        } else {
            res.status(404).json({ message: 'Compra no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener la compra:', error);
        res.status(500).json({ message: 'Error al obtener la compra' });
    }
});

async function startServer() {
    try {
        await connectToDatabase();
        app.listen(PORT, () => {
            console.log(`Servidor de API escuchando en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
}

startServer()

