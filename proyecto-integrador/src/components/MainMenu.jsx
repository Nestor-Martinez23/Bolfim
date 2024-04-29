import '../styles/MainMenu.css';

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
                <div className="left-section">
                    <aside>
                        <div>

                        </div>
                        <nav>

                        </nav>
                    </aside>
                </div>
                <div className="right-section">
                    <h1>Login</h1>
                    <div>
                        
                    </div>
                    <p>Para soporte técnico, por favor contacta a: soporte@bolfim.com</p>
                </div>
            </main>
            <footer className="footer">
                <p>BOLFIM S.A de C.V.</p>
            </footer>
        </div>
    )
}

export default MainMenu;