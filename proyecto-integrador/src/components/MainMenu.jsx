import '../styles/MainMenu.css';
import ContenedorSer from './ContenedorSer.jsx';
import logout from '../assets/logout.svg';
import help from '../assets/help.svg';
import userImage from '../assets/userImage.png';
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
                    <div className='user_info'>
                        <img className='user-image' src={userImage} alt="Imagen de usuario" />
                        <div className='User-tag'>Nombre de usuario</div>

                    </div>
                    <nav>

                    </nav>
                </aside>

                <div className="right-section">
                    <h1 className='h1-Menu'>Ordenes</h1>
                    <div className='contendor' >
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