import React, { useState } from 'react';
import Modal from 'react-modal';
import { createProduct, updateProduct } from '../services/crudProducts.js';
import '../styles/Modales.css';
Modal.setAppElement('#root');

function OrdersForm({isOpen, onRequestClose}) {
    const [productos, setProductos] = useState([]);
    const userData = localStorage.getItem('userData');
    const { userName } = JSON.parse(userData);

    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const newOrder = {
            cliente: form.cliente.value,
            email: form.email.value,
            numeroContacto: form.numeroContacto.value,
            costoTotal: form.costoTotal.value,
            productos
        };
        console.log(newOrder);
        createProduct(newOrder);
        form.reset();
        onRequestClose();
    };

    const handleAddProduct = () => {
        const producto = document.querySelector('select[name="producto"]').value;
        const cantidad = document.querySelector('input[name="cantidad"]').value;

        if (producto && cantidad) {
            setProductos([...productos, { producto, cantidad }]);
        }
    };

    return (
        <Modal 
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel='Añadir Orden'
            className='ModalForm'
        >
            <div className='OrdenesForm'>
                <form id="OrdenesForm_contenedor" onSubmit={handleForm}>
                    <h2>Nueva Orden</h2>
                    <h3>Responsable de orden: {userName}</h3>

                    <div className='datos-cliente'>
                        <div className='nombre-cel'>
                        <input type="text" name="cliente" placeholder="Nombre del cliente" required />                        
                        <input type="tel" name="numeroContacto" placeholder="Número de contacto" required />
                        </div>

                        <input type="email" name="email" placeholder="Correo electrónico" required />

                    </div>

                    <div className="producto-cantidad">
                        <select name="producto" required>
                            <option value="">Seleccionar producto</option>
                            <option value="Producto1">Producto 1</option>
                            <option value="Producto2">Producto 2</option>
                            <option value="Producto3">Producto 3</option>
                        </select>
                        <input type="number" name="cantidad" placeholder="Cantidad" required />
                        <button type="button" onClick={handleAddProduct}>Agregar</button>
                    </div>
                   <h4>Productos agregados:</h4>
                    <div className="productos-agregados">
                        
                        <ul>
                            {productos.map((item, index) => (
                                <li key={index}>{item.producto} - Cantidad: {item.cantidad}</li>
                            ))}
                        </ul>
                    </div>
                    <input type="number" name="costoTotal" placeholder="Costo total" step="0.01" required />


                    <button type="submit">Confirmar</button>
                </form>
            </div>
        </Modal>
    );
}
function UpdateForm({isOpen, onRequestClose, idToUpdate, nameToUpdate}) {
    const handleForm2 = (e) => {
        e.preventDefault();
        const form = e.target;
        const toUpdate = {
            progress: form.cantidad.value,
            fecha: form.fecha.value

        }
        updateProduct(idToUpdate, toUpdate);
        form.reset();
        onRequestClose();
    }
    return (
        <Modal 
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel='Actualizar Producto'
            className='ModalForm2'
        >
        <div className='OrdenesForm2'>
            <form id="OrdenesForm_contenedor2"  onSubmit={handleForm2}>
                <h2>Actualizar: {nameToUpdate}</h2>
                <input type="number" name='cantidad' placeholder="Cantidad"/>
                <input type="date" name="fecha"></input>
           
                <button type="submit">Actualizar Producto</button>
            </form>
        </div>
            
        </Modal>
        

    );
    
}

export {OrdersForm, UpdateForm}