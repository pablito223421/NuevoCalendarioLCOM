import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import  Evento_NuevoBoton from "./Evento_NuevoBoton";
import {eliminarEventoDispatch} from "../Acciones/CreacionAcciones";
import {editarEventoSidebarObj,setDetalleDiaObj,toggleDetalleSidebarObj,toggleNuevoEventoSidebarObj} from  "../Acciones/CrearAccionesObjetos";

const DetalleDia = () => {

    const calendarContext = useSelector(state => state.calendarState);
    const dispatch = useDispatch();
  
    const {
      detailSidebarToggled,
      dayDetail,
      currentMonth,
      currentYear,
    } = calendarContext;
  
    const fullEvent = (el) => {
      el.classList.toggle('active')
    }
  
    return (
      <div
        className={
          detailSidebarToggled
            ? "detail-sidebar toggled box-shadow"
            : "detail-sidebar"
        }
        style={{
          top: window.scrollY
        }}
      >
        <button
          className="sidebar__close-btn"
          onClick={() => {
            dispatch(toggleDetalleSidebarObj(false));
            dispatch(toggleNuevoEventoSidebarObj(false));
          }}
        >
          <i className="fas fa-times-circle"></i>
        </button>
        <p className="detail-sidebar__date">{`${moment.months(currentMonth - 1)} ${dayDetail.today}, ${currentYear}`}</p>
        <ul className="detail-sidebar__events">
          {dayDetail.events.map(event => (
            <li
              className="event-item"
              onClick={(e) => fullEvent(e.target)}
              key={event.id + event.name}>
              {event.eventName}
  
              <button
                className="delete-event-btn"
                onClick={() => {
                  dispatch(eliminarEventoDispatch(calendarContext, event.id));
                  dispatch(setDetalleDiaObj(
                    dayDetail.today,
                    dayDetail.events.filter(e => e.id !== event.id)
                  ));
                }}
              >
                <i className="fas fa-trash"></i>
              </button>
              <button
                className="edit-event-btn"
                onClick={() => {
                  dispatch(toggleNuevoEventoSidebarObj(true));
                  dispatch(toggleDetalleSidebarObj(false))
                  dispatch(editarEventoSidebarObj(event))
                }}
              >
                <i className="fas fa-edit"></i>
              </button>
              <p className="event-date"><span className="text-bold">Fecha: </span>{event.date}</p>
              <p className="event-time"><span className="text-bold">Tiempo: </span>{event.time}</p>
              <p className="event-eventName"><span className="text-bold">Nuevo Evento: </span> {event.eventName}</p>
              <p className="event-participants"><span className="text-bold">Participantes: </span>{event.participants}</p>
              <p className="event-description"><span className="text-bold">Descripcion: </span>{event.description}</p>
            </li>
          ))}
        </ul>
        <Evento_NuevoBoton date={dayDetail.today} />
      </div>
    );
  };
  
  export default DetalleDia;