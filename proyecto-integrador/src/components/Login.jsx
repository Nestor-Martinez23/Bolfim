import '../styles/Login.css';
import bolfimLogo from '../assets/bolfim.png';

function Login() {
    return (
        <div className="contenedor">
            
            <main>
                <div className="left-section">
                    <header>
                        <h2>BOLFIM</h2>
                    </header>
                    <img src={bolfimLogo} alt="BOLFIM Logo" />
                    {/* Aquí puedes agregar el código para la imagen de la empresa */}
                </div>
                <div className="right-section">
                    <h1>Login</h1>
                    <form>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" required />
                        </div>

                        <div>
                            <label htmlFor="password">Contraseña:</label>
                            <input type="password" id="password" name="password" required />
                        </div>
                        <button type="submit">Iniciar sesión</button>
                    </form>
                    <p>Para soporte técnico, por favor contacta a: soporte@bolfim.com</p>
                </div>
            </main>
            <footer className="footer">
                <p>BOLFIM S.A de C.V.</p>
            </footer>
        </div>
    )
}

export default Login;