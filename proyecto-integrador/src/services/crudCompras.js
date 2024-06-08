const URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/';

async function createCompra(newCompra) {
    try {
        const response = await fetch(`${URL}CreateCompra`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCompra)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al registrar:', error);
        throw error;
    }
}
async function getCompras() {
    try {
        const response = await fetch(`${URL}GetCompras`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        const compras = data.compras;
        return compras;
    } catch (error) {
        console.error('Error al obtener las compras:', error);
        throw error;
    }
}

async function getCompraById(id) {
    try {
        const response = await fetch(`${URL}GetCompra/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Error al obtener la compra');
        }
        const compra = await response.json();
        return compra;
    } catch (error) {
        console.error('Error al obtener la compra:', error);
        throw error;
    }
}
export { createCompra, getCompras, getCompraById };