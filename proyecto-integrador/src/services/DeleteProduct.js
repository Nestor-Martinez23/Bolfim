const deleteProduct = (orderId) => {
    console.log('Eliminando producto con el ID:', orderId)
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto con el')) {
        // Lógica para eliminar el producto, por ejemplo, hacer una solicitud a la API
        // Una vez eliminado el producto, puedes actualizar la lista de productos
        // en el estado o realizar cualquier otra acción necesaria
    }
};

export default deleteProduct;