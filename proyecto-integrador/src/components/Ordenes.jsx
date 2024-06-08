import IconDel from '../assets/icons/IconDel.svg'
import IconEdit from '../assets/icons/IconEdit.svg'
import dotsvertical from '../assets/icons/dots-vertical.svg'

import { getProducts, deleteProduct } from '../services/crudProducts.js';
import { OrdersForm, UpdateForm, MostrarOrden} from '../hooks/Formulario.jsx';
import { useState, useEffect } from 'react';


function Ordenes() {
    const [orders, setOrders] = useState([]);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [idToUpdate, setIdToUpdate] = useState('');
    const [nameOrder, setNameOrder] = useState('');
    const [idToShow, setIdToShow] = useState('');

    const handleDelete = (e) => {
        const orderId = e.target.closest('.product').getAttribute('data-id');
        if (window.confirm(`        
                ¿Estás seguro de que deseas eliminar este producto?
                            ID: ${orderId}
        `)) {
            deleteProduct(orderId);
        }
    };

    const handleUpdate = (e) => {
        setMostrarForm(true);
        const orderId = e.target.closest('.product').getAttribute('data-id');
        setIdToUpdate(orderId);
        const orderName = e.target.closest('.product').querySelector('div:nth-child(2)').textContent;
        setNameOrder(orderName);
    };

    const handleShow = (e) => {
        setMostrarForm(true);
        const ordenId = e.target.closest('.product').getAttribute('data-id');
        setIdToShow(ordenId);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const products = await getProducts();
                setOrders(products);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        }
        fetchData();
    }, []);

    function Porcentaje(porcent) {
        if (porcent >= 90) return "#70d611";
        else if (porcent >= 70) return "#0497c4";
        else if (porcent >= 40) return "#f07509";
        else return "#f6290c";
    }

    function mapProgresoToPercentage(progreso) {
        switch (progreso) {
            case 1: return 25;
            case 2: return 50;
            case 3: return 75;
            case 4: return 100;
            default: return 0;
        }
    }

    return (
        <>
            <div className="materia-encabezado">
                <div>No.Orden</div>
                <div>Cliente</div>
                <div>Fecha</div>
                <div>Progreso de Orden</div>
                <div></div>
            </div>
            <section className='contenedor-products'>
            {orders && orders.length > 0 ? (
                orders.map((order) => {
                    const porcentajeProgreso = mapProgresoToPercentage(order.progreso);
                    return (
                        <div className='product' key={order._id} data-id={order._id}>
                            <div>{order._id}</div>
                            <div>{order.cliente}</div>
                            <div>{order.fecha_venta}</div>
                            <div className='progress-bar' style={{ width: (porcentajeProgreso -10) + "%", backgroundColor: Porcentaje(porcentajeProgreso) }}>
                                {porcentajeProgreso + "%"}
                            </div>
                            <div>
                                <a className="delete-Products" href="#">
                                    <img src={dotsvertical} onClick={handleShow} alt="icono de puntos" />
                                    {mostrarForm && <MostrarOrden isOpen={mostrarForm} onRequestClose={() => setMostrarForm(false)} idToShow={idToShow} />}
                                </a>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>No hay Ordenes registradas</p>
            )}
            </section>
        </>
    );
}
function NavOrdenes() {
    const [mostrarForm, setMostrarForm] = useState(false);
    return (
        <nav>
             <div></div>
             <div></div>
             
            <a href="#" onClick={() => setMostrarForm(true)}>Añadir</a>
           
            {mostrarForm && <OrdersForm isOpen={mostrarForm} onRequestClose={() => setMostrarForm(false)} />}
            <a  href=""> <span></span>Volver</a> 
        </nav>
    )
}

/*
            <a href="">En espera</a>
            <a href="">Archivados</a>
            <a href="#" >Filtrar</a>
*/

export { Ordenes, NavOrdenes };
