import { useState, useEffect } from 'react';
import padlock from '../assets/icons/panel-padlock.svg';
import paneluser from '../assets/icons/panel-user.svg';
import delUser from '../assets/iconsUser/delUser.svg';
import editUser from '../assets/iconsUser/editUser.svg';
import { getUsers, deleteUsers } from '../services/crudUsers.js';
import { UpdateForm } from '../hooks/Formulario.jsx';

function PanelControl() {
    const [panel, setPanel] = useState(0);
    const [users, setUsers] = useState([]);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [idToUpdate, setIdToUpdate] = useState('');
    const [nameOrder, setNameOrder] = useState('');

    const handleDelete = async (e) => {
        const userId = e.target.closest('.user').getAttribute('data-id');
        if (window.confirm(`¿Estás seguro de que deseas eliminar este usuario?\nID: ${userId}`)) {
            try {
                await deleteUsers(userId);
                setUsers(users.filter(user => user._id !== userId));
            } catch (error) {
                console.error('Error al eliminar el usuario:', error);
            }
        }
    };

    const handleUpdate = (e) => {
        setMostrarForm(true);
        const userId = e.target.closest('.user').getAttribute('data-id');
        setIdToUpdate(userId);
        const userName = e.target.closest('.user').querySelector('div:nth-child(2)').textContent;
        setNameOrder(userName);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const usersData = await getUsers();
                setUsers(usersData);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        }
        fetchData();
    }, []);

    console.log("y los domis?",users)

    if (panel === 0) {
        return (
            <>
                <section className='contenedor-paneles-menu'>
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
                <div className='scroll-bar-panel'></div>
            </>
        );
    } else if (panel === 1) {
        return (
            <>
                <section className='contenedor_paneles-users'>
                    <nav>
                        <h2>Menu Usuarios</h2>
                        <a className="boton_back" href="#" onClick={() => setPanel(0)}>Volver</a>
                    </nav>
                    <section className='contenedor_users'>
                        {users && users.length > 0 ? (
                            users.map((user) => (
                                <div className='user' key={user._id} data-id={user._id}>
                                    <div>imagen</div>
                                    <div>{user.name}</div>
                                    <div>{user.rol}</div>
                                    <div>{user.email}</div>
                                    <div>
                                        <a className="delete-Products" href="#">
                                            <img src={editUser} onClick={handleUpdate} alt="icon_editar" />
                                            {mostrarForm && <UpdateForm isOpen={mostrarForm} onRequestClose={() => setMostrarForm(false)} idToUpdate={idToUpdate} nameToUpdate={nameOrder} />}
                                            <img src={delUser} alt="icon_eliminar" onClick={handleDelete} />
                                        </a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No hay usuarios disponibles.</p>
                        )}
                    </section>
                </section>
                <div className='scroll-bar-panel'></div>
            </>
        );
    } else if (panel === 2) {
        return (
            <>
                <section className='contenedor-paneles'>
                    <h2>Menu Roles</h2>
                    <div className='panel-rol'></div>
                    <a className="boton_back" href="#" onClick={() => setPanel(0)}>Volver</a>
                </section>
                <div className='scroll-bar-panel'></div>
            </>
        );
    }
}

export { PanelControl };