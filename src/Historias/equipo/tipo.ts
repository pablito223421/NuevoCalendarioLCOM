import moment from 'moment';
import {Cita_Calendario  } from '../../Interfaces/Cita_Calendario';
import { Info_Mentor  } from '../../Interfaces/Info_Mentor';

export const TipoEquipo = {
  INIT: '@@APPOINTMENTS/INIT',
  UPDATE: '@@APPOINTMENTS/UDPATE',
  NEW_DATE: '@@APPOINTMENTS/NEW_DATE',
};

export type Historia_Equipo = {
  currentDate: string;
  appointments: { mentor: Info_Mentor ; calendar: Cita_Calendario [] }[];
};

export const EQUIPOS_INITIAL_STATE: Historia_Equipo = {
  currentDate: moment(new Date()).format('YYYY-MM-DD'),
  appointments: [],
};