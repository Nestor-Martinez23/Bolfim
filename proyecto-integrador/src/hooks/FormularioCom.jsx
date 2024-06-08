import Modal from 'react-modal';
import { updateAlmacen} from '../services/crudAlmacen.js';
import { getAlmacen } from '../services/crudAlmacen.js';
import { useEffect, useState } from "react";
import '../styles/Modales.css';
import { createCompra, getCompraById } from '../services/crudCompras.js';
Modal.setAppElement('#root');


function CompraForm({ isOpen, onRequestClose }) {
    const [materias, setMaterias] = useState([]);
    const [cantidad, setCantidad] = useState("Cantidad");
    const [costoUnidad, setCostoUnidad] = useState("Costo x Unidad");
    const [costoTotal, setCostoTotal] = useState("Costo Total");
    const userData = localStorage.getItem('userData');
    const { userName, userId } = JSON.parse(userData);

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

    const handleCantidadChange = (e) => {
        const value = parseFloat(e.target.value);
        setCantidad(value);
        setCostoTotal(value * costoUnidad);
    };

    const handleCostoUnidadChange = (e) => {
        const value = parseFloat(e.target.value);
        setCostoUnidad(value);
        setCostoTotal(cantidad * value);
    };

    const handleForm = async (e) => {
        e.preventDefault();
        const form = e.target;
        const [materiaId, materiaName] = form.materia.value.split('|');
        const cantidadComprada = Number(form.cantidad.value); // Asumiendo que tienes un input con name="cantidad"
        const costoUnidad = Number(form.costoUnidad.value); // Asumiendo que tienes un input con name="costoUnidad"
        const costoTotal = cantidadComprada * costoUnidad;
    
        const newCompra = {
            materiaPrima_name: materiaName,
            materiaPrima_id: materiaId,
            user_name: userName,
            user_id: userId, 
            fecha_compra: form.date.value, 
            cantidad_comprada: cantidadComprada,
            costoTotal: costoTotal,
            costoUnidad: costoUnidad
        };
    
        try {
            // Crear la compra
            await createCompra(newCompra);
    
            // Obtener la materia prima actual para actualizar el stock
            const materia = materias.find(m => m._id === materiaId);
    
            if (materia) {
                const newStock = materia.stock + cantidadComprada;
                const toMateria = {
                    stock: newStock,
                    costoCliente: costoUnidad + 500 // O cualquier otro valor que necesites actualizar
                };
                await updateAlmacen(materiaId, toMateria);
            }
    
            form.reset();
            onRequestClose();
        } catch (error) {
            console.error('Error al crear la compra o actualizar el stock:', error);
        }
    };

    return (
        <Modal 
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel='Añadir Materia Prima'
            className='ModalForm'
        >
            <div className='OrdenesForm'>
                <form id="OrdenesForm_contenedor" onSubmit={handleForm}>
                <button className="close-button" onClick={onRequestClose}>×</button>
                    <h2>Registrar Compra de Materia Prima</h2>
                    <select name="materia" required>
                        <option value="">Seleccionar Materia Prima</option>
                        {materias.map((materia) => (
                            <option key={materia._id} value={`${materia._id}|${materia.name}`} >{materia.name}</option>
                        ))}
                    </select>
                    <input type="number" name='cantidad' placeholder="Cantidad" value={cantidad} onChange={handleCantidadChange} required />
                    <input type="number" name="costoUnidad" placeholder="Costo x Unidad" step="0.01" value={costoUnidad} onChange={handleCostoUnidadChange} required />
                    <input type="number" name="costoTotal" placeholder="Costo Total" value={costoTotal} readOnly />
                    <input type="date" name="date" required />
                    <button type="submit">Registrar Compra</button>
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
            weight: form.weight.value,
            date: form.date.value

        }
        updateAlmacen(idToUpdate, toUpdate);
        form.reset();
        onRequestClose();
    }
    return (
        <Modal 
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel='Registrar Compra'
            className='ModalForm2'
        >
        <div className='OrdenesForm2'>
            <form id="OrdenesForm_contenedor2"  onSubmit={handleForm2}>
                <h2>Actualizar: {nameToUpdate}</h2>
                <input type="number" name='weight' placeholder="Cantidad"/>
                <input type="date" name="date"></input>
           
                <button type="submit">Actualizar Materia</button>
            </form>
        </div>
            
        </Modal>
        

    );
    
}


function MostrarCompra({ isOpen, onRequestClose, idToShow }) {
    const [compra, setCompra] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedCompra = await getCompraById(idToShow);
                setCompra(fetchedCompra);
            } catch (error) {
                console.error('Error al obtener el Registro de Compra:', error);
            }
        }
        fetchData();
    }, [isOpen, idToShow]);
    if (!compra) {
        return null; // Puedes mostrar un spinner o algún indicador de carga aquí
    }
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel='Detalles de la Compra'
            className='ModalForm'
        >
            <div className='OrdenesForm'>

                <div className="registro_contenedor">
                    <button className="close-button" onClick={onRequestClose}>×</button>
                    <div className="encabezado-registro">
                        <div className='logo-fecha'>
                        <h2>DETALLES DE COMPRA</h2>

                        </div>
                    </div>
                    <div className="datos-responsable">
                        <div>
                            <p><strong>Responsable:</strong> </p>
                            <p>{compra.user_name}</p>
                            <p>{compra.user_id}</p>
                        </div>
                        <div>
                            <div className="fecha-id">
                                <p><strong>Fecha:</strong> {compra.fecha_compra}</p>
                                <p><strong>Id Registro:</strong> {compra._id}</p>
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
                            <tr>
                                <td>{compra.materiaPrima_name} <br />
                                    ({compra.materiaPrima_id})
                                </td>
                                <td>{compra.cantidad_comprada} rollos</td>
                                <td>${compra.costoUnidad}</td>
                                <td>${compra.costoTotal}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div></div>


            </div>
        </Modal>
    );
}

export {CompraForm, UpdateForm , MostrarCompra}