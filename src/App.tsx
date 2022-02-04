import React, { useEffect } from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Calendario from './Componentes/Calendario/Calendario';

import { GlobalStyle } from './styles';
import DiaCalendario from './Componentes/DiaCalendario/DiaCalendario';
import { Citas } from './Interfaces/Citas';
import { handleRequest } from './utils/request';
import { initAppointmentsList } from './Historias/equipo/accion';
import { useDispatch } from 'react-redux';
import { useState } from 'react';



const App = () => {
  const classes = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);
  const dispatch = useDispatch();
  const [mentor, setMentor] = useState<string>('');

  useEffect(() => {
    initCalendar();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initCalendar = async (): Promise<void> => {
    try {
      return await fetch(`${process.env.REACT_APP_API}`, {
        method: 'GET',
      })
        .then((res) => handleRequest(res))
        .then((list: Citas) => {
          setMentor(list.mentor.name);
          dispatch(initAppointmentsList(list));
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={classes}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={2}>
          <Calendario mentor={mentor} />
        </Grid>
        <Grid item xs={12} md={10}>
          <DiaCalendario />
        </Grid>
      </Grid>

      <GlobalStyle />
    </div>
  );
};

export default App;