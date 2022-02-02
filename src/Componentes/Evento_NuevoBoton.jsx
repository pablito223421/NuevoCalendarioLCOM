import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {cambiarEventoField, borrarEventoField, agregarFechaEvento, toggleEventosSidebarObj, toggleNuevoEventoSidebarObj, toggleDetalleSidebarObj } from "../Acciones/CrearAccionesObjetos";


const Evento_NuevoBoton = ({ date }) => {

  const calendarContext = useSelector(state => state.calendarState);
  const dispatch = useDispatch();

  const {
    newEventSidebarToggled,
    eventDate,
    days
  } = calendarContext;

  const dispatchEditEventDate = () => {
    dispatch(agregarFechaEvento(date))
    dispatch(cambiarEventoField('date', days[eventDate].date))
  }

  return (
    <nav className="navbar">
      <div className="button-group">
        <button
          className="new-event-btn"
          onClick={() => {
            dispatch(toggleNuevoEventoSidebarObj(!newEventSidebarToggled));
            dispatch(toggleEventosSidebarObj(false));
            dispatch(toggleDetalleSidebarObj (false))
            dispatch(borrarEventoField())
            date ? dispatchEditEventDate() : dispatch(agregarFechaEvento(null))
          }}
        >
          <i className="fas fa-plus"></i> Nuevo Evento
        </button>
      </div>
    </nav>
  );
};

export default Evento_NuevoBoton;