
function Almacen() {
    const materiaPrima = [
        {
          id: '1',
          name: 'Materia Prima 1',
          date: '2022-01-01',
          weight: 10,
        },
        {
          id: '2',
          name: 'Materia Prima 2',
          date: '2022-01-02',
         weight: 15,
        },
        {
          id: '3',
          name: 'Materia Prima 3',
          date: '2022-01-03',
          weight: 20,
        },
        {
          id: '4',
          name: 'Materia Prima 4',
          date: '2022-01-04',
          weight: 25,
        },
      ];

    return (
        <>
            <section className='contenedor-products'>
                {materiaPrima.map((materia) => (
                    <div className='product' key={materia.id}>
                        <div>{materia.id}</div>
                        <div>{materia.name}</div>
                        <div>{materia.date}</div>
                        <div >{materia.weight}</div>
                    </div>
                ))}
            </section>
            <div className='scroll-bar'>

            </div>
        </>
    ) 

}
function NavAlmacen(){
  return (
    <nav>
      <a  href=""> <span></span>Volver</a>
      <a href="">Materia Prima</a>
      <a href="">Materia Prima en</a>
      <a href="">Productos Terminados</a>
    </nav>
  )
}

export {Almacen, NavAlmacen};
