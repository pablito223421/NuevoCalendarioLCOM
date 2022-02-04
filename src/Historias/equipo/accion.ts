import moment from 'moment';
import { action, PayloadAction } from 'typesafe-actions';
import { Citas } from '../../Interfaces/Citas';
import { Cita_Calendario  } from '../../Interfaces/Cita_Calendario';
import { Info_Mentor } from '../../Interfaces/Info_Mentor';
import { TipoEquipo } from './tipo';

export const initAppointmentsList = (
  appointments: Citas ,
): PayloadAction<string, { mentor: Info_Mentor; calendar: Cita_Calendario[] }[]> => {
  const mappedData = {
    mentor: appointments.mentor,
    calendar: appointments.calendar.map((i) => {
      return {
        endDate: moment(i.date_time).add(1, 'hours'),
        startDate: moment(i.date_time),
        title: 'Booked',
      };
    }) as unknown as Cita_Calendario[],
  };

  return action(TipoEquipo.INIT, [mappedData]);
};

export const updateAppointmentsList = (appointment: Cita_Calendario): PayloadAction<string, Cita_Calendario> =>
  action(TipoEquipo.UPDATE, appointment);

export const updateCurrentDate = (date: Date): PayloadAction<string, Date> => action(TipoEquipo.NEW_DATE, date);