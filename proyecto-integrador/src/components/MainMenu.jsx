import '../styles/MainMenu.css';
import '../styles/PanelControl.css'
import logoutIcon from '../assets/logout.svg';
import help from '../assets/help.svg';
import IconConfig from '../assets/IconConfig.svg';
import userImage from '../assets/userImage.png';
import {ChangePage, ChangeNav} from '../services/ChangePage.js';
import { useState } from 'react';
import useAuth from '../hooks/UseAuth.jsx';

function MainMenu() {
    const [page, setPage] = useState('Ventas');
    const { logout } = useAuth();
    const userData = localStorage.getItem('userData');
    const { userName, userRole } = JSON.parse(userData);
    
   

    const handleLogout = () => {
        // Llama a la función de cierre de sesión proporcionada como prop
        logout();
    };

  
    return (
        <div className="contenedor">
            <header>
                <div>
                    <h2>BOLFIM</h2>
                    <div></div>
                </div>
                <div className='iconos-superiores'>
                    <a href="#"><img src={logoutIcon} alt="" onClick={handleLogout} /></a>
                    <a href="#"><img src={help} alt="" /></a>

                </div>


            </header>

            <main>

                <aside className="left-section">
                    <div className='user-contenedor'>
                        <div className='user-info'>
                            <img className='user-image' src={userImage} alt="Imagen de usuario" />
                            <span className='user-tag'>{userName}</span>
                        </div>


                    </div>
                    <div className='left-nav'>
                        <div></div>
                        <div className='user-rol'>
                            {userRole}
                        </div>
                        <nav>
                            <button className='button-menu' onClick={() => setPage('Panel')}>Panel</button>
                            <button className='button-menu' onClick={() => setPage('Ventas')}>Ventas</button>
                            <button className='button-menu' onClick={() => setPage('Almacen')}>Almacen</button>
                            <button className='button-Config' onClick={() => setPage('Config')}>   <a href=""><img src={IconConfig} alt="" /></a> </button>
                        </nav>
                    </div>

                </aside>

                <div className="right-section">
                    <div className='contenedor-nav-h1'>
                        <h1 className='h1-menu'>{page}</h1>
                        {ChangeNav(page)}
                    </div>

                    <div className='contenedor-servicio' >
                         {ChangePage(page)}

                    </div>


                </div>
            </main>
            <footer className="footer">
                <p>BOLFIM S.A de C.V.</p>
            </footer>
        </div>
    )
}

export default MainMenu;