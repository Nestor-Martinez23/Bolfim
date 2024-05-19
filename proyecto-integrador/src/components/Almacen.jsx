
import IconDats from "../assets/icons/dots-vertical.svg";
import IconCase from "../assets/icons/briefcase.svg";
import { useState, useEffect } from "react";
import { getAlmacen } from "../services/crudAlmacen.js";
function Almacen() {
  const [materiaPrima, setMateria] = useState([]);

  useEffect(() => {
    async function fetchData() {
        try {
            const products = await getAlmacen();
            setMateria(products);
        }
        catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    }
    fetchData();
}, []);
   
    
    return (
        <>
            <section className='contenedor-products'>
                {materiaPrima.map((materia) => (
                    <div className='product' key={materia._id}>
                        <div> <img src={IconCase} alt="icono de case" /></div>
                        <div>{materia.name}</div>
                        <div>{materia.date}</div>
                        <div >{materia.weight} Kg</div>
                        <div>      <img src={IconDats} alt="eliminar" /></div>
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
      <div></div>
      <div></div>
      <div></div>
      <a  href=""> <span></span>Volver</a> 
    </nav>
  )
}

/*function NavAlmacen(){
  return (
    <nav>
      <a  href=""> <span></span>Volver</a>
      <a href="">Materia Prima</a>
      <a href="">Materia Prima en</a>
      <a href="">Productos Terminados</a>
      
    </nav>
  )
}
*/

export {Almacen, NavAlmacen};
