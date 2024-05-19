const URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function getUsers() {
    try {
        const response = await fetch(`${URL}/GetUsers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        
        });
        const data = await response.json();
        const users = data.users;
        return users;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
    
}

async function createUsers(newUser) {
    try {
        const response = await fetch(`${URL}/CreateUsers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }) 
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al crear un nuevo usuario:', error);
        throw error;
        
    }
}

// Función para actualizar un producto
async function updateUsers(id_user, userUpdated) {
    try {
        const response = await fetch(`${URL}/UpdateUsers/${id_user}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userUpdated)
        });
        const data = await response.json();
        // Manejar la respuesta
        return data;
    } catch (error) {
        // Manejar errores de la solicitud
        console.error('Error al actualizar el usuario:', error);
        throw error;
    }
}

// Función para eliminar un producto
async function deleteUsers(id_user) {
    try {
        const response = await fetch(`${URL}/DeleteUsers/${id_user}`, {
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
        console.error('Error al eliminar el usuario:',error.status);
        throw error;
    }
}

export { getUsers, createUsers, updateUsers, deleteUsers };
