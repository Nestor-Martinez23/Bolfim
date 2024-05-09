import { useState, useEffect } from 'react';

export default function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedAuthState = localStorage.getItem('isLoggedIn');
        if (storedAuthState === 'true') {
            setIsLoggedIn(true);
            const storedUserData = JSON.parse(localStorage.getItem('userData'));
            setUserData(storedUserData);
        }
    }, []);

    function onLoginSuccess(userName, userRole) {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        const userData = { userName, userRole };
        localStorage.setItem('userData', JSON.stringify(userData));
        setUserData(userData);
    }

    function logout() {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
        setUserData(null);
        window.location.reload();
    }

    return { isLoggedIn, userData, onLoginSuccess, logout };
}
