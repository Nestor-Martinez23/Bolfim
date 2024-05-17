
import '../styles/ContenedorSer.css';
import {Ordenes, NavOrdenes} from '../components/Ordenes.jsx';
import { Almacen, NavAlmacen } from '../components/Almacen.jsx';
import { PanelControl} from '../components/PanelControl.jsx'; 

export function ChangePage({page}) {
    switch(page){
        case "Ventas":
            return <Ordenes />
        case "Almacen":
            return <Almacen />
        case "Panel":
            return <PanelControl />
        default:
            return <Ordenes />
    }
    
    }
export function ChangeNav({page}){
    switch(page){
        case "Ventas":
            return <NavOrdenes />
        case "Almacen":
            return <NavAlmacen />
        case "Panel":
            return null
        default:
            return <NavOrdenes />
    }
}


