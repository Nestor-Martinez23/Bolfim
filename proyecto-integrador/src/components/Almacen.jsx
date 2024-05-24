
import IconEdit from "../assets/icons/IconEdit.svg";
import IconDel from "../assets/icons/IconDel.svg";
import IconCase from "../assets/icons/briefcase.svg";
import { useState, useEffect } from "react";
import { deleteAlmacen, getAlmacen } from "../services/crudAlmacen.js";
import { MateriaForm, UpdateForm } from '../hooks/FormularioMat.jsx';
function Almacen() {
  const [materiaPrima, setMateria] = useState([]);

  useEffect(() => {
    async function fetchData() {
        try {
            const materias = await getAlmacen();
            setMateria(materias);
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
const [idToUpdate, setIdToUpdate] = useState('');
const [nameMateria, setNameMateria] = useState('');

const handleUpdate = (e) => {
  setMostrarForm(true)
  const materiaId = e.target.closest('.materia').getAttribute('data-id');
  setIdToUpdate(materiaId);
  const materiaName = e.target.closest('.materia').querySelector('div:nth-child(2)').textContent;
  setNameMateria(materiaName);

}
    
    return (
        <>
            <section className='contenedor-products'>
                {materiaPrima.map((materia) => (
                    <div className='materia' key={materia._id} data-id={materia._id}>
                        <div> <img src={IconCase} alt="icono de case" /></div>
                        <div>{materia.name}</div>
                        <div>{materia.date}</div>
                        <div >{materia.weight} Kg</div>

                        <div> <a className="delete-Products" href="#">
                            <img src={IconEdit} onClick={handleUpdate} alt="icon_editar" />
                            {mostrarForm && <UpdateForm isOpen={mostrarForm} onRequestClose={() => setMostrarForm(false)} idToUpdate={idToUpdate} nameToUpdate={nameMateria} />}
                            <img src={IconDel} alt="icon_eliminar" onClick={handleDelete} />
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
function NavAlmacen(){
  const [mostrarForm, setMostrarForm] = useState(false);
  return (
      <nav>
           <div></div>
           <div></div>
           
          <a href="#" onClick={() => setMostrarForm(true)}>Añadir</a>
         
          {mostrarForm && <MateriaForm isOpen={mostrarForm} onRequestClose={() => setMostrarForm(false)} />}
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
