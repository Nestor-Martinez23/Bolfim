export const checkUser = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log("recibido:", email, password);

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (response.ok) {
            // Autenticación exitosa
            const data = await response.json();
            console.log(data.message);
            const { userName, userRole } = data;
            // Obtener el nombre de usuario y rol de la respuesta
            console.log("confirmado:", userName, userRole);
            // Guardar los datos en localStorage
            localStorage.setItem('userData', JSON.stringify(data));
            localStorage.setItem('isLoggedIn', 'true');
            window.location.reload();
        } else {
            // Autenticación fallida
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    } catch (error) {
        console.error('Error de autenticación:', error.message);
        // Puedes mostrar un mensaje de error al usuario aquí si lo deseas
    }

    // Imprimir los datos almacenados en localStorage
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    console.log('Datos almacenados en localStorage:', storedUserData);
};

export default checkUser;