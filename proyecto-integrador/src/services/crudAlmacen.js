const URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/';

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

async function createAlmacen(newMateria) {
    console.log(newMateria);
    try {
        const response = await fetch(`${URL}CreateAlmacen`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMateria)
        }) 
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al crear un nuevo materia:', error);
        throw error;
        
    }
}

// Función para actualizar un materia
async function updateAlmacen(id_materia, materiaUpdated) {
    console.log("a actualizar:",id_materia, materiaUpdated);
    try {
        const response = await fetch(`${URL}UpdateAlmacen/${id_materia}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(materiaUpdated)
        });
        const data = await response.json();
        // Manejar la respuesta
        return data;
    } catch (error) {
        // Manejar errores de la solicitud
        console.error('Error al actualizar materia:', error);
        throw error;
    }
}

// Función para eliminar materia
async function deleteAlmacen(id_materia) {
    console.log(id_materia);
    try {
        const response = await fetch(`${URL}DeleteAlmacen/${id_materia}`, {
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
        console.error('Error al eliminar la materia:',error.status);
        throw error;
    }
}

export { getAlmacen, createAlmacen, updateAlmacen, deleteAlmacen};