// server.mjs
import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

const uri = 'mongodb://127.0.0.1:27017';
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

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');
        const user = await collection.findOne({ User_Email: email, User_Password: password });
        if (!user) {
            res.status(401).json({ message: 'Credenciales inválidas' });
            return;
        }
        
        // Si se encontró el usuario, enviar su nombre de usuario y rol en la respuesta
        res.status(200).json({ 
            message: 'Inicio de sesión exitoso', 
            userName: user.User_Name, 
            userRole: user.User_Rol 
        });
        console.log('Conectado a la Base de Datos Bolfim');
    } catch (error) {
        console.error('Error de autenticación:', error);
        res.status(500).json({ message: 'Error de autenticación' });
    }
});

app.get('/GetProducts', async (req,res) => {
    try {
        console.log('Obteniendo productos...');
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

