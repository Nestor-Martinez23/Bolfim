import '../styles/MainMenu.css';
import Ordenes from './Ordenes.jsx';
function MainMenu() {
    return (
        <div className="contenedor">
            <header>
                <div>
                    <h2>BOLFIM</h2>
                    <div></div>
                </div>
                <div>
                    <a href="#">Enlace</a>
                    <a href="#">Enlace 2</a>
                </div>


            </header>

            <main>

                <aside className="left-section">
                    <div className='user_info'>
                        <img src="#" alt="Imagen de usuario" />

                    </div>
                    <nav>

                    </nav>
                </aside>

                <div className="right-section">
                    <h1 className='h1-Menu'>Ordenes</h1>
                    <div className='contendor' >
                        <Ordenes />
                        
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