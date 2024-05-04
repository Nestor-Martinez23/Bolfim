import '../styles/Login.css';
import bolfimLogo from '../assets/bolfim.png';
import useUserAuth from '../hooks/useUserAuth.jsx';

function Login({ onLoginSuccess }) {
    const { emailRef, passwordRef, handleSubmit } = useUserAuth({ onLoginSuccess });

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
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" ref={emailRef} required />
                        </div>
                        <div>
                            <label htmlFor="password">Contraseña:</label>
                            <input type="password" id="password" name="password" ref={passwordRef} required />
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