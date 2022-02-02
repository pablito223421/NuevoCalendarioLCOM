import  React from "react";
import { useSelector,useDispatch } from "react-redux";
import {setDetalleDiaObj,agregarFechaEvento,toggleDetalleSidebarObj,
toggleEventosSidebarObj,toggleNuevoEventoSidebarObj} from "../Acciones/CrearAccionesObjetos";

const Dia = ({ day: { visible, diadelMes, fecha } }) => {

    const calendarContext = useSelector(state => state.calendarState);
    const dispatch = useDispatch();
  
    const {
      events,
    } = calendarContext;
  
    let diasdeEventos = [];
  
    events.forEach(event => {
      if (fecha === event.fecha) {
        diasdeEventos.push(event);
      }
    });
  
    const d = new Date();
    const today = d.getDate();
    let cn = "day";
  
    if (today === diadelMes) cn = "day current-day";
    if (!visible) cn = "day hidden";
  
    return (
      <button
        className={cn}
        onClick={() => {
          dispatch(setDetalleDiaObj(diadelMes, diasdeEventos))
          dispatch(toggleDetalleSidebarObj(true));
          dispatch(toggleEventosSidebarObj(false));
          dispatch(toggleNuevoEventoSidebarObj(false));
          dispatch(agregarFechaEvento(diadelMes))
        }}
      >
        {diadelMes}
        <div>
          {diasdeEventos.map((el, index) => (
            <span key={index} el={el}>
              {" "}
              <i className={`fas fa-star ${el.participants}`}></i>
            </span>
          ))}
        </div>
      </button>
    );
  };
  
  export default Dia;