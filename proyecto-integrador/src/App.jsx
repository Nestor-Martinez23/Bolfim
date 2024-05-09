
import Login from './components/Login.jsx';
import MainMenu from './components/MainMenu.jsx';
import useAuth from './hooks/UseAuth.jsx';

function App() {
    // Estado para controlar si se ha iniciado sesión o no
    const { isLoggedIn, userData } = useAuth();
    console.log("1:",isLoggedIn,"2:",userData,"3:","4:")
    // Renderizar el componente correspondiente según el estado de inicio de sesión
    return isLoggedIn ? <MainMenu   /> : <Login  />;
}

export default App;