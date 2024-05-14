import Icon from '../assets/dots-vertical.svg'
import '../styles/Modales.css';
import {getProducts}  from '../services/crudProducts.js';
import OrdersForm from './Formulario.jsx';
import { useState , useEffect} from 'react';


function Ordenes() {

    const [orders, setOrders] = useState([]);

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
                    <div className='product' key={order._id}>
                        <div>{order._id}</div>
                        <div>{order.info}</div>
                        <div>{order.progress}</div>
                        <div className='progress-bar' style={{ width: order.progress - 7 + "%", backgroundColor: Porcentaje(order.progress) }}>{order.progress + "%" }</div>
                        <div> <a  href="#"><img src={Icon} alt=""  /></a></div>
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
      <OrdersForm isOpen={mostrarForm} onRequestClose={() => setMostrarForm(false)} />
    </nav>
  )
}

export {Ordenes, NavOrdenes};
