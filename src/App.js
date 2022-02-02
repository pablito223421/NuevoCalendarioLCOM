import React from 'react';
import './App.css';
import Calendario from "./Componentes/Calendario";
import Evento_NuevoBoton from "./Componentes/Evento_NuevoBoton";

function App() {
  return (
    <>
      <div className="App">
        <Evento_NuevoBoton />
        <div className="container">
          <Calendario />
        </div>
      </div>
    </>
  );
}

export default App;
