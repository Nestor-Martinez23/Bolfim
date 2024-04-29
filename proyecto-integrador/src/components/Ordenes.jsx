import '../styles/Ordenes.css';

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
      
    return (
        <>
            <section className='contendor-products' >
                <div className='product'>
                    <div>{orders[0].id}</div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className='product'>
                </div>
                <div className='product'>
                </div>
                <div className='product'>
                </div>
            </section>

            <div className='scroll-bar'>

            </div>

        </>

    )
}

export default Ordenes;