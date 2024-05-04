import materiaPrima from "../mocks/almacen.js";
function Almacen() {
   
    
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
