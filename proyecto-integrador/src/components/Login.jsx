import '../styles/Login.css';
import bolfimLogo from '../assets/img/bolfim.png';
import checkUser from '../services/CheckUser';

function Login() {
    return (
        <div className="contenedor-login">
            <main>
                <div className="left-section-login">
                    <header>
                        <h2>BOLFIM</h2>
                    </header>
                    <img src={bolfimLogo} alt="BOLFIM Logo" />
                </div>
                <div className="right-section-login">
                    <h1 className='h1-login'>Login</h1>
                    <form onSubmit={checkUser}>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div>
                            <label htmlFor="password">Contraseña:</label>
                            <input type="password" id="password" name="password" required />
                        </div>
                        <button className='button-login' type="submit">Iniciar sesión</button>
                    </form>
                    <p>Para soporte técnico, por favor contacta a: soporte@bolfim.com</p>
                </div>
            </main>
            <footer className="footer">
                <p>BOLFIM S.A de C.V.</p>
            </footer>
        </div>
    );
}

export default Login;