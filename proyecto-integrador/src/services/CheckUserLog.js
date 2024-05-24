const URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/';
const checkUser = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;


    try {
        const response = await fetch(`${URL}login`, {
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
        alert(`Error de autenticación: ${error.message}`);
        // Puedes mostrar un mensaje de error al usuario aquí si lo deseas
    }

};

export default checkUser;
