
import  Login from './components/Login.jsx'
import MainMenu from './components/MainMenu.jsx'

function App() {
  let boton = "on";
  if (boton === "on") {
    return MainMenu()
  }
    return Login()
  
}

export default App
