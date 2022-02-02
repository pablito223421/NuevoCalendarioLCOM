import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Dia from "./Dia";
import DetalleDia from "./DetalleDia";
import Nuevo_EventoSidebar from "./Nuevo_EventoSidebar";
import Botones from "./Botones";
import {getObtenerFechaActual,getFormularioEventosLS}from "../Acciones/CreacionAcciones";
import moment from 'moment';

const Calendario = () => {
    const body = document.getElementsByTagName("body");
    const dispatch = useDispatch();
    const calendarContext = useSelector(state => state.calendarState);
  
    const {
      mesActual,
      anioActual,
      dias,
      detalleSidebarToggled,
      eventosSidebarToggled,
      nuevoEventoSidebarToggled,
      editarEventoSidebarToggled,
    } = calendarContext;
  
  
  
    useEffect(() => {
      dispatch(getObtenerFechaActual(moment().year(), moment().month() + 1, moment().date()));
      dispatch(getFormularioEventosLS());
    }, [dispatch]);
  
    if (
      detalleSidebarToggled ||
      eventosSidebarToggled ||
      nuevoEventoSidebarToggled ||
      editarEventoSidebarToggled
    ) {
      body[0].style.overflowY = "hidden";
    } else {
      body[0].style.overflowY = "visible";
    }
  
    return (
      <div className="calendar">
        <div className="title">
          {moment.months(mesActual - 1)} {anioActual}{" "}
          <Botones />
        </div>
        <div className="calendar-table">
          <div className="thead">
            <div>Lunes</div>
            <div>Martes</div>
            <div>Miercoles</div>
            <div>Jueves</div>
            <div>Viernes</div>
            <div>Sabado</div>
            <div>Domingo</div>
          </div>
          <div className="thead-sm">
            <div>Lun</div>
            <div>Mar</div>
            <div>Mier</div>
            <div>Jue</div>
            <div>Vie</div>
            <div>Sab</div>
            <div>Dom</div>
          </div>
          <div className="tbody">
            {dias.map((day, index) => (
              <Dia key={index} day={day} />
            ))}
          </div>
        </div>
        <DetalleDia />
        <Nuevo_EventoSidebar />
      </div>
    );
  };
  
  export default Calendario;