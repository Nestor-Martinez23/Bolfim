import Modal from 'react-modal';
import { createUsers, updateUsers } from '../services/crudUsers.js';
import '../styles/Modales.css';
Modal.setAppElement('#root');

function UsersForm({ isOpen, onRequestClose }) {
    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const newUser = {
            user_name: form.name.value,
            user_email: form.email.value,
            user_password: form.password.value,
            user_rol: form.rol.value,
        };
        console.log(newUser);
        createUsers(newUser);
        form.reset();
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel='Crear Usuario'
            className='ModalForm'
        >
            <div className='OrdenesForm'>
            
                <form id="OrdenesForm_contenedor" onSubmit={handleForm}>
                <button className="close-button" onClick={onRequestClose}>×</button>
                    <h2>Añadir Usuario</h2>
                    <input type="text" name="name" placeholder="Nombre y Apellido" />
                    <input type="email" name='email' placeholder="usuario@gmail.com" />
                    <input type="password" name="password" placeholder="Contraseña" />
                    <select name="rol" required>
                            <option value="">Seleccionar Rol</option>
                            <option value="Administrador">Administrador</option>
                            <option value="Ventas">Ventas</option>
                            <option value="Almacen">Almacen</option>
                            <option value="Compras">Compras</option>
                    </select>
                    <button type="submit">Crear Usuario</button>
                </form>
            </div>
        </Modal>
    );
}

function UpdateForm({ isOpen, onRequestClose, idToUpdate, nameToUpdate }) {
    const handleForm2 = (e) => {
        e.preventDefault();
        const form = e.target;
        const toUpdate = {
            user_email: form.email.value,
            user_password: form.password.value,
            user_rol: form.rol.value,
        };
        updateUsers(idToUpdate, toUpdate);
        form.reset();
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel='Actualizar Usuario'
            className='ModalForm2'
        >
            <div className='OrdenesForm2'>
                <form id="UsuariosForm_contenedor2" onSubmit={handleForm2}>
                    <h2>Actualizar: {nameToUpdate}</h2>
                    <input type="email" name='email' placeholder='Email' />
                    <input type="password" name="password" placeholder='Contraseña' />
                    <input type="text" name="rol" placeholder='Rol de Usuario' />
                    <button type="submit">Actualizar Usuario</button>
                </form>
            </div>
        </Modal>
    );
}

export { UsersForm, UpdateForm };