import padlock from '../assets/panel-padlock.svg';
import paneluser from '../assets/panel-user.svg';

export function PanelControl() {
    return (
        <>
            <section className='contenedor-paneles'>
                <div className='panel-rol'>
                    <h3>Permisos/Roles</h3>
                    <a href="" ><img src={padlock} alt="" /></a>
                    

                </div>
                <div className="panel-user" >
                    <h3>Usuarios</h3>
                    <a href=""><img src={paneluser} alt="" /></a>
                </div>
            </section>
            <div className='scroll-bar'>

            </div>
        </>

    )
}