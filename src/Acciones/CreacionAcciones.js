import { 
    getFechaActualObj,
    anteriorMeshObj,
    siguienteMesObj ,
    setDiasObj,
    borrarEventoObj,
    setEventosObj
  }from "./CrearAccionesObjetos";
  
  
  export const getObtenerFechaActual = (año,mes,fecha)=>(dispatch)=>{
      const obtenerDiadelMes=fecha;
      const obtenerMes=mes;
      const obtenerAnio=año;
  
      let inicio_dia= new fecha(obtenerAnio,obtenerMes-1,1).getDay();
      dispatch(getFechaActualObj(obtenerAnio,obtenerMes,obtenerDiadelMes));
      dispatch(setDiasActual(inicio_dia,obtenerMes,obtenerAnio));
  };
  
  export const setDiasActual =(sd,m,y)=>(dispatch)=>{
      let topDiasVacios = sd === 0 ? 6 : sd - 1;
      let fondoDiasVacios = 0;
      let totalDiasdelMes = 0;
    
      if ([1, 3, 5, 7, 8, 10, 12].includes(m)) {
        fondoDiasVacios = 7 - ((sd + 30) % 7);
        totalDiasdelMes = 31;
      } else if ([4, 6, 9, 11].includes(m)) {
        fondoDiasVacios = 7 - ((sd + 29) % 7);
        totalDiasdelMes = 30;
      } else {
        if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) {
          fondoDiasVacios = 7 - ((sd + 28) % 7);
          totalDiasdelMes = 29;
        } else {
          fondoDiasVacios = 7 - ((sd + 27) % 7);
          totalDiasdelMes = 28;
        }
      }
      let diasArr = [];
      let newM = "";
      let newI = "";
      for (let i = 0; i < topDiasVacios; i++) {
        let diaObj = {
          visible: false,
          diaDelMes: 0,
          fecha: m < 10 ? `${y}-0${m}-${i}` : `${y}-${m}-${i}`
        };
        diasArr.push(diaObj);
      }
      for (let i = 1; i <= totalDiasdelMes; i++) {
        if (m < 10) {
          newM = `0${m}`;
        } else {
          newM = m;
        }
    
        if (i < 10) {
          newI = `0${i}`;
        } else {
          newI = i;
        }
    
        let diaObj = {
          visible: true,
          diaDelMes: i,
          fecha: `${y}-${newM}-${newI}`
        };
        diasArr.push(diaObj);
      }
      for (let i = 0; i < fondoDiasVacios; i++) {
        let diaObj = {
          visible: false,
          diaDelMes: 0,
          fecha: m < 10 ? `${y}-0${m}-${i}` : `${y}-${m}-${i}`
        };
        diasArr.push(diaObj);
      }
    
      dispatch(setDiasObj(diasArr))
    };
  
  
    export const anteriorMesDispatch = (state) => (dispatch) => {
      if (state.currentMonth === 1) {
        dispatch(getObtenerFechaActual(state.currentYear - 1, 12, 1));
        dispatch(anteriorMeshObj(12, state.currentYear - 1))
    
      } else {
        dispatch(getObtenerFechaActual(state.currentYear, state.currentMonth - 1, 1));
        dispatch(anteriorMeshObj(state.currentMonth - 1, state.currentYear))
    
      }
    };
  
  
    export const siguienteMesDispatch = (state) => (dispatch) => {
      if (state.currentMonth === 12) {
        dispatch(getObtenerFechaActual(state.currentYear + 1, 1, 1));
        dispatch(siguienteMesObj (1, state.currentYear + 1))
      } else {
        dispatch(getObtenerFechaActual(state.currentYear, state.currentMonth + 1, 1));
    
        dispatch(siguienteMesObj (state.currentMonth + 1, state.currentYear))
    
      }
    };
  
  
  
  export const getFormularioEventosLS = () => (dispatch) => {
          const events = localStorage.getItem("events");
          if (events === null) {
            dispatch(setEventosObj([]));
          } else {
            dispatch(setEventosObj(JSON.parse(events)));
          }
        };
  
   export const agregarEventosToLS = events => {
      localStorage.setItem("events", JSON.stringify(events));
  };
  
  export const eliminarEventoDispatch = (state, id) => (dispatch) => {
      let events = state.events.filter(e => e.id !== id);
      agregarEventosToLS (events);
      getFormularioEventosLS();
    
      dispatch(borrarEventoObj(id))
    };
  
    export const agregarEventoDispatch = (id, nombreEvento, fecha, tiempo, participantes, descripcion,state) => (dispatch) => {
  
      console.log(localStorage.getItem("events"))
      let events;
    
        if (localStorage.getItem("events")) {
        
        const changeEvent = {
          id: id,
          date: fecha,
          time: tiempo,
          participants: participantes,
          eventName: nombreEvento,
          description: descripcion
        }
        const localStorageArr = JSON.parse(localStorage.getItem("events")).filter(e => e.id !== id);
        events = [...localStorageArr, changeEvent]
      } else {
        let newEvent = {
          id: id,
          date: fecha,
          time: tiempo,
          participants: participantes,
          eventName: nombreEvento,
          description: descripcion
        }
    
        events = [...state.events, newEvent]
    
      };
    
      agregarEventosToLS(events);
      dispatch(getFormularioEventosLS());
    
      getObtenerFechaActual(state.currentYear, state.currentMonth, 1);
    };