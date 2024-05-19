import { useState, useEffect } from 'react';
import padlock from '../assets/icons/panel-padlock.svg';
import paneluser from '../assets/icons/panel-user.svg';
import delUser from '../assets/iconsUser/delUser.svg';
import editUser from '../assets/iconsUser/editUser.svg';
import imgUser from '../assets/iconsUser/imgUser.svg';
import { getUsers, deleteUsers } from '../services/crudUsers.js';
import { UpdateForm , UsersForm } from '../hooks/FormularioUser.jsx';

function PanelControl() {
    const [panel, setPanel] = useState(0);
    const [users, setUsers] = useState([]);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [mostrarFormUp, setMostrarFormUp] = useState(false);
    const [idToUpdate, setIdToUpdate] = useState('');
    const [nameUser, setNameUser] = useState('');

    const handleDelete = async (e) => {
        const userId = e.target.closest('.user').getAttribute('data-id');
        const userName = e.target.closest('.user').getAttribute('data-name')
        if (window.confirm(`¿Estás seguro de que deseas eliminar a ${userName}?\nID: ${userId}`)) {
            try {
                await deleteUsers(userId);
                setUsers(users.filter(user => user._id !== userId));
            } catch (error) {
                console.error('Error al eliminar el usuario:', error);
            }
        }
    };

    const handleUpdate = (e) => {
        setMostrarFormUp(true);
        const userId = e.target.closest('.user').getAttribute('data-id');
        setIdToUpdate(userId);
        const userName = e.target.closest('.user').querySelector('div:nth-child(2)').textContent;
        setNameUser(userName);
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

    return (
        <>
            {panel === 0 ? (
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
            ) : panel === 1 ? (
                <section className='contenedor_paneles-users'>
                    <nav>
                        <h2>Menu Usuarios</h2>
                        <div>
                        <a className='boton_back' href="#" onClick={() => setMostrarForm(true)}>Añadir</a>
                           {mostrarForm && <UsersForm isOpen={mostrarForm} onRequestClose={() => setMostrarForm(false)} />}
                        <a className="boton_back" href="#" onClick={() => setPanel(0)}>Volver</a>

                        </div>

                    </nav>
                    <section className='contenedor_users'>
                        {users && users.length > 0 ? (
                            users.map((user) => (
                                <div className='user' key={user._id} data-id={user._id} data-name={user.name}>
                                    <div> <img src={imgUser} alt="imagen de usuario" /></div>
                                    <div>{user.name}</div>
                                    <div>{user.rol}</div>
                                    <div>{user.email}</div>
                                    <div>
                                        <a className="delete-Products" href="#">
                                            <img src={editUser} onClick={handleUpdate} alt="icon_editar" />
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
            ) : (
                <section className='contenedor_paneles-users'>
                    <nav>
                        <h2>Menu Roles</h2>
                        <a className="boton_back" href="#" onClick={() => setPanel(0)}>Volver</a>
                    </nav>
                    <section className='contenedor_users-rols'>
                        {users && users.length > 0 ? (
                            users.map((user) => (
                                <div className='user-rols' key={user._id} data-id={user._id} data-name={user.name}>
                                    <div> <img src={imgUser} alt="imagen de usuario" /></div>
                                    <div>{user.name}</div>
                                    <div>{user.rol}</div>
                                </div>
                            ))
                        ) : (
                            <p>No hay usuarios disponibles.</p>
                        )}
                    </section>
                </section>
            )}
            <div className='scroll-bar-panel'></div>
            {mostrarFormUp && (
                <UpdateForm
                    isOpen={mostrarFormUp}
                    onRequestClose={() => setMostrarFormUp(false)}
                    idToUpdate={idToUpdate}
                    nameToUpdate={nameUser}
                />
            )}
        </>
    );
}

export { PanelControl };