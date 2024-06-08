import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { createProduct, updateProduct, getProductById } from '../services/crudProducts.js';
import { getAlmacen, updateAlmacen } from '../services/crudAlmacen.js';
import '../styles/Modales.css';
import '../styles/Others.css';
Modal.setAppElement('#root');

function OrdersForm({isOpen, onRequestClose}) {
    const [productos, setProductos] = useState([]);
    const userData = localStorage.getItem('userData');
    const { userName, userId } = JSON.parse(userData);
    const [materias, setMaterias] = useState([]);
    const [cantidad, setCantidad] = useState(1);
    const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);
    const [costoTotal, setCostoTotal] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedMaterias = await getAlmacen();
                setMaterias(fetchedMaterias);
            } catch (error) {
                console.error('Error al obtener las materias primas:', error);
            }
        }
        fetchData();
    }, []);

    const handleForm = async (e) => {
        e.preventDefault();
        const form = e.target;
        const newOrder = {
            cliente: form.cliente.value,
            email: form.email.value,
            numeroContacto: form.numeroContacto.value,
            user_name: userName,
            user_id: userId,
            costoTotal,
            fecha_venta: form.date.value,
            progreso: 1,
            productos
        };
        console.log(newOrder);
        try {
            // Crear la orden
            await createProduct(newOrder);

            // Actualizar el stock de cada materia prima
            for (const producto of productos) {
                const materiaId = producto.materiaPrima_id;
                const cantidadComprada = producto.cantidad;
                const materia = materias.find(m => m._id === materiaId);

                if (materia) {
                    const newStock = materia.stock - cantidadComprada;
                    const toMateria = {
                        stock: newStock,// O cualquier otro valor que necesites actualizar
                    };
                    await updateAlmacen(materiaId, toMateria);
                }
            }

            form.reset();
            onRequestClose();
        } catch (error) {
            console.error('Error al crear la orden o actualizar el stock:', error);
        }


    };

    const handleAddProduct = () => {
        if (materiaSeleccionada && cantidad) {
            const costoCliente = materiaSeleccionada.costoCliente;
            setProductos([...productos, { materiaPrima_name: materiaSeleccionada.name,materiaPrima_id: materiaSeleccionada._id, cantidad, costoCliente }]);
            setCostoTotal(costoTotal + (cantidad * costoCliente));
        }
    };

    const handleCantidadChange = (e) => {
        const valorIngresado = Number(e.target.value);
        if (valorIngresado <= 0 || valorIngresado > materiaSeleccionada.stock) {
            alert('El valor ingresado no puede ser menor o igual a 0 o mayor que el stock de la materia prima');
        } else {
            setCantidad(valorIngresado);
        }
    };

    const handleMateriaChange = (e) => {
        const materiaId = e.target.value;
        const materiaSeleccionada = materias.find(materia => materia._id === materiaId);
        setMateriaSeleccionada(materiaSeleccionada);
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
                <button className="close-button" onClick={onRequestClose}>×</button>
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
                    <select name="producto" required onChange={handleMateriaChange}>
                        <option value="">Seleccionar Materia Prima</option>
                        {materias.map((materia) => (
                            
                            <option 
                            key={materia._id} value={materia._id}>{materia.name}   (stock: {materia.stock})
                            </option>
                            
                        ))}
                    </select>
                        <input type="number" name="cantidad" placeholder="Cantidad" required value={cantidad} onChange={handleCantidadChange} />
                        <button type="button" onClick={handleAddProduct}>Agregar</button>
                    </div>
                   <h4>Productos agregados:</h4>
                    <div className="productos-agregados">
                        
                        <ul>
                            {productos.map((item, index) => (
                                <li key={index}>{item.materiaPrima_name}: {item.cantidad} x ${item.costoCliente}</li>
                            ))}
                        </ul>
                    </div>
                    <input type="date" name="date" required />
                    <div className="price-container">
                        <span className="price-symbol">$</span>
                        <input type="number" name="costoTotal" placeholder="Costo total" step="0.01" required value={costoTotal} readOnly />
                    </div>


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

const MostrarOrden = ({ isOpen, onRequestClose, idToShow }) => {
    const [orden, setOrder] = useState(null);
    const [ordenProgreso, setOrdenProgreso] = useState(1); // Estado inicial en 1

    const handleStepClick = (step) => {
        setOrdenProgreso(step);
        console.log('Paso:', step);
    };

    const handleConfirm = async () => {
        try {
            const updatedOrder = { progreso: ordenProgreso };
            await updateProduct(idToShow, updatedOrder);
            setOrder(updatedOrder); // Actualiza el estado local con la orden actualizada
            console.log('Orden actualizada:', updatedOrder);
            onRequestClose(); // Cierra el modal después de la actualización
        } catch (error) {
            console.error('Error al actualizar la Orden:', error);
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedOrder = await getProductById(idToShow);
                setOrder(fetchedOrder);
            } catch (error) {
                console.error('Error al obtener la Orden :', error);
            }
        }
        if (isOpen) {
            fetchData();
        }
    }, [isOpen, idToShow]);

    useEffect(() => {
        if (orden && orden.progreso) {
            console.log('Progreso:', orden.progreso);
            setOrdenProgreso(orden.progreso);
        }
    }, [orden]);

    if (!orden) {
        return null; // Puedes mostrar un spinner o algún indicador de carga aquí
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel='Orden de Venta'
            className='ModalForm'
        >
            <div className='OrdenesForm'>
                <div className="registro_contenedor">
                    <button className="close-button" onClick={onRequestClose}>×</button>
                    <div className="encabezado-registro">
                        <div className='logo-fecha'>
                            <h2>Orden #{orden._id}</h2>
                        </div>
                    </div>
                    <div className="datos-responsable">
                        <div>
                            <p><strong>Cliente:</strong> {orden.cliente}</p>
                            <p><strong>Teléfono:</strong> {orden.numeroContacto}</p>
                        </div>
                        <div>
                            <div className="fecha-id">
                                <p><strong>Responsable:</strong> {orden.user_name}</p>
                                <p><strong>Fecha:</strong> {orden.fecha_venta}</p>
                            </div>
                        </div>
                    </div>
                    <table className="datos-registro">
                        <thead>
                            <tr>
                                <th>Materia Prima</th>
                                <th>Cantidad</th>
                                <th>Costo x Unidad</th>
                                <th>Costo Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orden.productos.map((order) => (
                                <tr key={order.materiaPrima_id}>
                                    <td>{order.materiaPrima_name} <br />
                                        ({order.materiaPrima_id})
                                    </td>
                                    <td>{order.cantidad} rollos</td>
                                    <td>${order.costoCliente}</td>
                                    <td>${order.costoCliente * order.cantidad}</td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td></td>
                                <td>Total</td>
                                <td>${orden.costoTotal}</td>
                            </tr>
                        </tbody>
                    </table>
                    <section className="step-wizard">
                        <h3>Seguimiento del Proceso</h3>
                        <ul className="step-wizard-list">
                            {['Billing Info', 'Payment Method', 'Checkout', 'Success'].map((label, index) => {
                                const step = index + 1;
                                return (
                                    <li
                                        key={index}
                                        className={`step-wizard-item ${
                                            step < ordenProgreso ? 'completed-item' :
                                            step === ordenProgreso ? 'current-item' : ''
                                        }`}
                                        onClick={() => handleStepClick(step)}
                                    >
                                        <span className="progress-count"></span>
                                        <span className="progress-label">{label}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                    <div className='contenedor_confirmar-button'>
                    <button onClick={handleConfirm} className="confirm-button">Confirmar</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export {OrdersForm, UpdateForm, MostrarOrden}