import Modal from 'react-modal';
import { createProduct, updateProduct } from '../services/crudProducts.js';
Modal.setAppElement('#root');

function OrdersForm({isOpen, onRequestClose}) {
    
    
    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;
        console.log(form);  
        const newProduct = {
            info: form.nombre.value,
            progress: form.cantidad.value,
            fecha: form.fecha.value

        }
        console.log(newProduct);
        createProduct(newProduct);
        form.reset();
        onRequestClose();
        window.location.reload();

    }
    return (
        <Modal 
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel='Añadir Producto'
            className='ModalForm'
        >
        <div className='OrdenesForm'>
            <form id="OrdenesForm_contenedor"  onSubmit={handleForm}>
                <h2>Añadir Producto</h2>
                <input type="text" name="nombre" placeholder="Nombre del producto" />
                <input type="number" name='cantidad' placeholder="Cantidad"/>
                <input type="date" name="fecha"></input>
           
                <button type="submit">Añadir Producto</button>
            </form>
        </div>
            
        </Modal>
        

    );
    
}

function UpdateForm({isOpen, onRequestClose, idToUpdate, nameToUpdate}) {
    console.log(idToUpdate, nameToUpdate)
    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;
        console.log(form);  
        const toUpdate = {
            progress: form.cantidad.value,
            fecha: form.fecha.value

        }
        updateProduct(idToUpdate, toUpdate);
        form.reset();
        onRequestClose();
        window.location.reload();

    }
    return (
        <Modal 
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel='Actualizar Producto'
            className='ModalFormUpdate'
        >
        <div className='OrdenesFormUpdate'>
            <form id="OrdenesForm_contenedor"  onSubmit={handleForm}>
                <h2>Actualizar: {nameToUpdate}</h2>
                <input type="number" name='cantidad' placeholder="Cantidad"/>
                <input type="date" name="fecha"></input>
           
                <button type="submit">Añadir Producto</button>
            </form>
        </div>
            
        </Modal>
        

    );
    
}

export {OrdersForm, UpdateForm}