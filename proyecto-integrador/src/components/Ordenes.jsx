import Icon from '../assets/dots-vertical.svg'
import orders from '../mocks/ordenes.js'

function Ordenes() {

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
                    <div className='product' key={order.id}>
                        <div>{order.id}</div>
                        <div>{order.info}</div>
                        <div>{order.progress}</div>
                        <div className='progress-bar' style={{ width: order.progress - 7 + "%", backgroundColor: Porcentaje(order.progress) }}>{order.progress + "%" }</div>
                        <div> <a  href=""><img src={Icon} alt="" /></a></div>
                    </div>
                ))}
            </section>
            <div className='scroll-bar'>

            </div>
        </>
    ) 

}
function NavOrdenes(){
  return (
    <nav>
      <a  href=""> <span></span>Volver</a>
      <a href="">En espera</a>
      <a href="">Archivados</a>
      <a href="">Filtrar</a>
      <a href="">Añadir</a>
    </nav>
  )
}

export {Ordenes, NavOrdenes};
