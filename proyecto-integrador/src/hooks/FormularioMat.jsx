import Modal from 'react-modal';
import { createAlmacen, updateAlmacen} from '../services/crudAlmacen.js';
import '../styles/Modales.css';
Modal.setAppElement('#root');


function MateriaForm({isOpen, onRequestClose}) {
    
    
    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const newMateria = {
            name: form.name.value,
            date: form.date.value,
            stock:0,
            costoCliente:0,

        }
        console.log(newMateria);
        createAlmacen(newMateria);
        form.reset();
        onRequestClose();

    }
    return (
        <Modal 
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel='Añadir Materia Prima'
            className='ModalForm'
        >
        <div className='OrdenesForm'>
            <form id="OrdenesForm_contenedor"  onSubmit={handleForm}>
            <button className="close-button" onClick={onRequestClose}>×</button>
                <h2>Añadir Materia Prima</h2>
                <input type="text" name="name" placeholder="Nombre de la materia prima" />
                <input type="date" name="date"></input>
           
                <button type="submit">Añadir Materia</button>
            </form>
        </div>
            
        </Modal>
        

    );
    
}

function UpdateForm({isOpen, onRequestClose, idToUpdate, nameToUpdate}) {
    const handleForm2 = (e) => {
        e.preventDefault();
        const form = e.target;
        const toUpdate = {
            stock:parseFloat(form.cantidad.value) ,
            date: form.date.value

        }
        updateAlmacen(idToUpdate, toUpdate);
        form.reset();
        onRequestClose();
    }
    return (
        <Modal 
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel='Actualizar Materia prima'
            className='ModalForm2'
        >
        <div className='OrdenesForm2'>
            <form id="OrdenesForm_contenedor2"  onSubmit={handleForm2}>
                <h2>Actualizar: {nameToUpdate}</h2>
                <input type="number" name='cantidad' placeholder="Cantidad"/>
                <input type="date" name="date"></input>
           
                <button type="submit">Actualizar Materia</button>
            </form>
        </div>
            
        </Modal>
        

    );
    
}

export {MateriaForm, UpdateForm}