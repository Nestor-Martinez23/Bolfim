const URL = 'http://localhost:3000/';

async function getAlmacen() {
    try {
        const response = await fetch(`${URL}GetAlmacen`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        
        });
        const data = await response.json();
        const materiasPri = data.materias;
        return materiasPri;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        throw error;
    }
    
}

export { getAlmacen };