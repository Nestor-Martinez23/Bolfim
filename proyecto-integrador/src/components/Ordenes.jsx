import IconDel from '../assets/IconDel.svg'
import IconEdit from '../assets/IconEdit.svg'
import '../styles/Modales.css';
import {getProducts,deleteProduct }  from '../services/crudProducts.js';
import OrdersForm from '../hooks/Formulario.jsx';
import { useState , useEffect} from 'react';

function Ordenes() {
    
    const [orders, setOrders] = useState([]);

    const handleDelete = (e) => {
        const orderId = e.target.closest('.product').getAttribute('data-id');
        if (window.confirm(`        
                ¿Estás seguro de que deseas eliminar este producto?
                            ID: ${orderId}
        `
        )) {
            deleteProduct(orderId);
            window.location.reload();
        }
    }

    useEffect(() => {
        async function fetchData() {
            try{
                const products = await getProducts();
                setOrders(products);
            }
            catch(error){
                console.error('Error al obtener los productos:', error);
            }
        }
       fetchData();
    },[]);

    function Porcentaje (porcent){
        if(porcent >= 90) return "#70d611"
        else if(porcent >= 70) return "#0497c4";
        else if(porcent >= 40) return "#f07509";
        else  return "#f6290c";
    }

    return (
        <>
            <section className='contenedor-products'>
                {orders.map((order) => (
                    <div className='product' key={order._id} data-id={order._id}>
                        <div>{order._id}</div>
                        <div>{order.info}</div>
                        <div>{order.fecha}</div>
                        <div className='progress-bar' style={{ width: order.progress - 7 + "%", backgroundColor: Porcentaje(order.progress) }}>{order.progress + "%" }</div>
                        <div> <a  className="delete-Products"href="#">
                            <img src={IconEdit} alt="icon_editar" /> 
                            <img src={IconDel} alt="icon_eliminar" onClick={handleDelete}  />
                            </a>
                        </div>
                    </div>
                ))}
            </section>
            <div className='scroll-bar'>

            </div>
        </>
    ) 

}
function NavOrdenes(){
    const [mostrarForm, setMostrarForm] = useState(false);
  return (
    <nav>
      <a  href=""> <span></span>Volver</a>
      <a href="">En espera</a>
      <a href="">Archivados</a>
      <a href="#" >Filtrar</a>
      <a href="#" onClick={() => setMostrarForm(true)}>Añadir</a>
      {/* Agregamos el formulario solo si mostrarForm es true */}
      {mostrarForm && <OrdersForm isOpen={mostrarForm} onRequestClose={() => setMostrarForm(false)} />}
    </nav>
  )
}

export {Ordenes, NavOrdenes};
