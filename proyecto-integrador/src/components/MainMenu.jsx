import '../styles/MainMenu.css';
import ContenedorSer from './ContenedorSer.jsx';
import logout from '../assets/logout.svg';
import help from '../assets/help.svg';
import userImage from '../assets/userImage.png';
import NavServicios from './NavServicios.jsx';
function MainMenu() {
    return (
        <div className="contenedor">
            <header>
                <div>
                    <h2>BOLFIM</h2>
                    <div></div>
                </div>
                <div className='iconos-superiores'>
                    <a href="#"><img src={logout} alt="" /></a>
                    <a href="#"><img src={help} alt="" /></a>
                    
                </div>


            </header>

            <main>

                <aside className="left-section">
                    <div className='user-contenedor'>
                        <div className='user-info'>
                        <img className='user-image' src={userImage} alt="Imagen de usuario" />
                        <span className='user-tag'>Nombre de usuario</span>
                        </div>


                    </div>
                    <div className='left-nav'>
                        <div></div>
                        <div>
                            Puesto
                        </div>
                        <nav>
                            <a href="">Panel</a>
                            <a href="">Ventas</a>
                            <a href="">Almacen</a>
                            <a href="">Config</a>
                        </nav>
                    </div>

                </aside>

                <div className="right-section">
                    <div className='contenedor-nav-h1'>
                      <h1 className='h1-menu'>Ordenes</h1>  
                      <NavServicios />
                    </div>
                    
                    <div className='contenedor-servicio' >
                        <ContenedorSer />
                        
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