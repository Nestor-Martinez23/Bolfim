
import '../styles/ContenedorSer.css';
import {Ordenes} from '../components/Ordenes.jsx';
import { Almacen } from '../components/Almacen.jsx';
import {NavOrdenes} from '../components/Ordenes.jsx';
import {NavAlmacen} from '../components/Almacen.jsx';

export function ChangePage(page) {
    switch(page){
        case "Ventas":
            return Ordenes()
        case "Almacen":
            return Almacen()
        default:
            return Ordenes()
    }
    
    }
export function ChangeNav(page){
    switch(page){
        case "Ventas":
            return NavOrdenes()
        case "Almacen":
            return NavAlmacen()
        case "Config":
            return NavOrdenes()
        default:
            return 
    }
}


