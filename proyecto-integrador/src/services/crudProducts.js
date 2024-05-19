
const URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function getProducts() {
    try {
        const response = await fetch(`${URL}GetProducts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        
        });
        const data = await response.json();
        const orders = data.products;
        return orders;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        throw error;
    }
    
}

async function createProduct(newProduct) {
    console.log(newProduct);
    try {
        const response = await fetch(`${URL}CreateProducts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        }) 
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al crear un nuevo producto:', error);
        throw error;
        
    }
}

// Función para actualizar un producto
async function updateProduct(id_Product, productUpdated) {
    console.log("a actualizar:",id_Product, productUpdated);
    try {
        const response = await fetch(`${URL}UpdateProduct/${id_Product}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productUpdated)
        });
        const data = await response.json();
        // Manejar la respuesta
        return data;
    } catch (error) {
        // Manejar errores de la solicitud
        console.error('Error al actualizar el producto:', error);
        throw error;
    }
}

// Función para eliminar un producto
async function deleteProduct(id_Product) {
    console.log(id_Product);
    try {
        const response = await fetch(`${URL}DeleteProducts/${id_Product}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        // Manejar la respuesta
        return data;
    } catch (error) {
        // Manejar errores de la solicitud
        console.error('Error al eliminar el producto:',error.status);
        throw error;
    }
}

export { getProducts, createProduct, updateProduct, deleteProduct };