import { useRef } from 'react';

export default function useUserAuth({ onLoginSuccess }) {
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        console.log(email, password);

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
                console.log(data.message)
                const { userName, userRole } = data;
             // Obtener el nombre de usuario y rol de la respuesta
                onLoginSuccess(userName, userRole); // Llama a la función onLoginSuccess con los datos del usuario
            } else {
                // Autenticación fallida
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        } catch (error) {
            console.error('Error de autenticación:', error.message);
            // Puedes mostrar un mensaje de error al usuario aquí si lo deseas
        }
    };

    return { emailRef, passwordRef, handleSubmit };
}