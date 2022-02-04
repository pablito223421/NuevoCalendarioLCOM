import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentTooltip,
  ConfirmationDialog,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import { ChangeSet, EditingState, IntegratedEditing, ViewState } from "@devexpress/dx-react-scheduler";
import { Cita_Calendario  } from '../../Interfaces/Cita_Calendario';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '../../Historias/historias';
import { updateAppointmentsList } from '../../Historias/equipo/accion';
import { Dialog, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

const DiaCalendario = () => {
  const state = useSelector((state: GlobalState) => state.appointmentsState);
  const [appointments, setAppointments] = useState<Cita_Calendario[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (state.appointments.length > 0) {
      setAppointments(state.appointments[0].calendar);
    }
  }, [state.appointments]);

  const updateAppointments = (e: ChangeSet) => {
    let overlaps = false;

    if (appointments.length !== 0) {
      overlaps = appointments.some(
        (i: Cita_Calendario ) =>
          (e.added as Cita_Calendario ).startDate <= i.endDate &&
          (e.added as Cita_Calendario ).endDate >= i.startDate,
      );
    }

    if (overlaps) {
      setOpen(true);
    } else {
      setOpen(false);

      setAppointments([...appointments, e.added as Cita_Calendario ]);
      dispatch(updateAppointmentsList(e.added as Cita_Calendario ));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Paper>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Time slot already allocated. Choose another one. Thank you.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Okay
            </Button>
          </DialogActions>
        </Dialog>

        <Scheduler data={appointments}>
          <ViewState currentDate={state.currentDate} />
          <EditingState onCommitChanges={(e:any) => updateAppointments(e)} editingAppointment={undefined} />
          <IntegratedEditing />
          <DayView startDayHour={0} endDayHour={24} cellDuration={60} />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip />
          <AppointmentForm />
        </Scheduler>
      </Paper>
    </>
  );
};

export default DiaCalendario;