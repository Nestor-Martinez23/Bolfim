
import IconRegis from "../assets/icons/IconRegis.svg";
import dotsvertical from "../assets/icons/dots-vertical.svg";
import { useState, useEffect } from "react";
import { deleteAlmacen } from "../services/crudAlmacen.js";
import { getCompras } from "../services/crudCompras.js";
import { CompraForm, MostrarCompra } from '../hooks/FormularioCom.jsx';
function Compras() {
  const [compraRe, setCompra] = useState([]);

  useEffect(() => {
    async function fetchData() {
        try {
            const compras = await getCompras();
            setCompra(compras);
        }
        catch (error) {
            console.error('Error al obtener las materias primas:', error);
        }
    }
    fetchData();
}, []);

const handleDelete = (e) => {
  const materiaId = e.target.closest('.materia').getAttribute('data-id');
  if (window.confirm(`        
          ¿Estás seguro de que deseas eliminar este producto?
                      ID: ${materiaId}
  `
  )) {
      deleteAlmacen(materiaId);
  }
}

const [mostrarForm, setMostrarForm] = useState(false);
const [idToShow, setIdToShow] = useState('');

const handleShow = (e) => {
  setMostrarForm(true)
  const materiaId = e.target.closest('.compra').getAttribute('data-id');
  setIdToShow(materiaId);

}
    
    return (
        <>
                  <div className="compras-encabezado">
                  <div></div>
                  <div>Nombre</div>
                  <div>Fecha</div>
                  <div>Cantidad</div>
                  <div>Costo/Unidad</div>
                  <div>Costo Total</div>
                  <div></div>
                </div>
            <section className='contenedor-products'>

                {compraRe && compraRe.length > 0 ? (
                compraRe.map((compra) => (
                    <div className='compra' key={compra._id} data-id={compra._id}>
                        <div> <img src={IconRegis} alt="icono de case" /></div>
                        <div>{compra.materiaPrima_name}</div>
                        <div>{compra.fecha_compra}</div>
                        <div > + {compra.cantidad_comprada} rollos</div>
                        <div>$ {compra.costoUnidad}</div>
                        <div>$ {compra.costoTotal}  </div>

                        <div> <a className="compra-mostrar" href="#">
                            <img src={dotsvertical} onClick={handleShow} alt="icono de puntos" />
                            {mostrarForm && <MostrarCompra isOpen={mostrarForm} onRequestClose={() => setMostrarForm(false)} idToShow={idToShow}  />}
                        </a>
                        </div>
                        
                    </div>
                ))
                ) : (
                    <p>No hay compras registradas</p>
                )}
            </section>
        </>
    ) 

}
function NavCompras(){
  const [mostrarForm, setMostrarForm] = useState(false);
  return (
      <nav>
           <div></div>
           <div></div>
           
          <a href="#" onClick={() => setMostrarForm(true)}>Registrar Compra</a>
         
          {mostrarForm && <CompraForm isOpen={mostrarForm} onRequestClose={() => setMostrarForm(false)} />}
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

export {Compras, NavCompras};
