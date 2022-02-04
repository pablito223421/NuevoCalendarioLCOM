import moment from 'moment';
import { Reducer } from 'redux';
import {Historia_Equipo, TipoEquipo, EQUIPOS_INITIAL_STATE } from './tipo';

type Equipo_Reductor = {
  type: string;
  payload?: any;
};

const appointmentReducer: Reducer<Historia_Equipo> = (
  state:Historia_Equipo = EQUIPOS_INITIAL_STATE,
  action: Equipo_Reductor,
) => {
  switch (action.type) {
    case TipoEquipo.INIT:
      return {
        ...state,
        appointments: action.payload,
      };
    case TipoEquipo.UPDATE:
      //in the future needs to filter by mentor and then update the calendar
      const updated = state.appointments.map((i) => {
        return {
          mentor: i.mentor,
          calendar: [...i.calendar, action.payload],
        };
      });

      return {
        ...state,
        appointments: updated,
      };
    case TipoEquipo.NEW_DATE:
      return {
        ...state,
        currentDate: moment(action.payload).format('YYYY-MM-DD'),
      };
    default:
      return { ...state };
  }
};

export default appointmentReducer;