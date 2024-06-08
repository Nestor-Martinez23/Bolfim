import padlock from '../assets/panel-padlock.svg';
import paneluser from '../assets/panel-user.svg';

function PanelMenu({setPanel}) {
    return (
        <>
            <section className='contenedor-paneles'>
                <h2>Menu control</h2>
                <div className='panel-rol'>
                    <h3>Permisos/Roles</h3>
                    <a href="#" onClick={() => setPanel(2)}>
                        <img src={padlock} alt="padlock" />
                    </a>
                </div>
                <div className="panel-user">
                    <h3>Usuarios</h3>
                    <a href="#" onClick={() => setPanel(1)}>
                        <img src={paneluser} alt="imagen de usuario" />
                    </a>
                </div>
            </section>
            
        </>
    );
}

function PanelUsers({setPanel}) {
    return (
        <>
            <section className='contenedor-paneles'>
                <h2>Menu Usuarios</h2>
                <div className="panel-user"></div>
                <a className="boton_back" href="#" onClick={() => setPanel(0)}>Volver</a>
            </section>
            
        </>
    );
}

function PanelRol({setPanel}) {
    return (
        <>
            <section className='contenedor-paneles'>
                <h2>Menu Roles</h2>
                <div className='panel-rol'></div>
                <a className="boton_back" href="#" onClick={() => setPanel(0)}>Volver</a>
            </section>
            
        </>
    );
}

export { PanelMenu, PanelUsers, PanelRol };