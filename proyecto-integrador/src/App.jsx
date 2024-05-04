import { useState, useEffect } from 'react';
import Login from './components/Login.jsx';
import MainMenu from './components/MainMenu.jsx';

function App() {
    // Estado para controlar si se ha iniciado sesión o no
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null); // Inicializa userData como null

    // Verificar el estado de autenticación al cargar la aplicación
    useEffect(() => {
        const storedAuthState = localStorage.getItem('isLoggedIn');
        if (storedAuthState === 'true') {
            setIsLoggedIn(true);
            // Si el usuario está autenticado, obtener y establecer los datos del usuario desde localStorage
            const storedUserData = JSON.parse(localStorage.getItem('userData'));
            setUserData(storedUserData);
        }
    }, []);

    // Función para manejar la autenticación exitosa
    function onLoginSuccess(userName, userRole) {
        // Cambiar el estado para indicar que se ha iniciado sesión
        setIsLoggedIn(true);
        // Guardar el estado de autenticación en localStorage
        localStorage.setItem('isLoggedIn', 'true');
        // Guardar los datos del usuario en localStorage
        const userData = { userName, userRole };
        localStorage.setItem('userData', JSON.stringify(userData));
        // Establecer los datos del usuario en el estado
        setUserData(userData);
    }

    // Función para cerrar sesión
    function logout() {
        // Cambiar el estado para indicar que no se ha iniciado sesión
        setIsLoggedIn(false);
        // Eliminar el estado de autenticación de localStorage
        localStorage.removeItem('isLoggedIn');
        // Eliminar los datos del usuario de localStorage
        localStorage.removeItem('userData');
        // Establecer userData como null al cerrar sesión
        setUserData(null);
    }

    // Renderizar el componente correspondiente según el estado de inicio de sesión
    return isLoggedIn ? <MainMenu logout={logout} userName={userData?.userName} userRole={userData?.userRole} /> : <Login onLoginSuccess={onLoginSuccess} />;
}

export default App;