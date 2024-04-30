import Icon from '../assets/dots-vertical.svg'

function Ordenes() {
    const orders = [
        {
          id: '1',
          info: 'Información de la orden 1',
          progress: 25, // Progreso de la orden en porcentaje
        },
        {
          id: '2',
          info: 'Información de la orden 2',
          progress: 50,
        },
        {
          id: '3',
          info: 'Información de la orden 3',
          progress: 75,
        },
        {
          id: '4',
          info: 'Información de la orden 4',
          progress: 100,
        },
      ];
    function Porcentaje (porcent){
        if(porcent >= 90) return "#70d611"
        else if(porcent >= 70) return "#0497c4";
        else if(porcent >= 40) return "#f07509";
        else  return "#f6290c";
    }

    return (
        <>
            <section className='contendor-products'>
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

export default Ordenes;