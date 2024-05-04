const { MongoClient } = import('mongodb');

export async function connectToDatabase() {
    const uri = 'mongodb://127.0.0.1:27017';
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        console.log('Connected to the database');

        return client.db('Bolfim'); // Cambia 'Bolfim' por el nombre de tu base de datos
    } catch (e) {
        console.error('Error connecting to the database:', e);
    }
}


