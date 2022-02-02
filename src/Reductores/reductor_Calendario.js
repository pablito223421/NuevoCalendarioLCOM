import { GET_FECHA_ACTUAL, 
    SET_DIAS,
    MES_ANTERIOR,
    MES_SIGUIENTE,
    TOGGLE_DETALLE_SB,
    TOGGLE_EVENTOS_SB,
    TOGGLE_NUEVO_EVENTO_SB,
    SET_DETALLE_DIA,
    AGREGAR_FECHA_EVENTO,
    BORRAR_EVENTO,
    SET_EVENTOS,
   } from "../Acciones/tipos_accion"; 

    const initialState = {
       diaActualdelMes: null,
        mesActual: null,
        anioActual: null,
        dias: [],
        detalleDia: {
          diahoy: null,
          events: []
        },
        detallesSidebarToggled: false,
        eventosSidebarToggled: false,
        nuevoEventoSidebarToggled: false,
        editarEventoSidebarToggled: false,
        fechaEvento: '',
      };

 
      // eslint-disable-next-line import/no-anonymous-default-export
      export default (state = initialState, action) => {
        switch (action.type) {
          case GET_FECHA_ACTUAL:
      
            return {
              ...state,
              diaActualdelMes: action.payload.date,
              mesActual: action.payload.month,
              anioActual: action.payload.year
            };
          case SET_DIAS:
            return {
              ...state,
              dias: action.payload
            };
          case MES_ANTERIOR:
            return {
              ...state,
              mesActual: action.payload.month,
              anioActual: action.payload.year
            };
          case MES_SIGUIENTE:
            return {
              ...state,
              mesActual: action.payload.month,
              anioActual: action.payload.year
            };
          case TOGGLE_DETALLE_SB:
            return {
              ...state,
              detallesSidebarToggled: action.payload
            };
          case TOGGLE_EVENTOS_SB:
            return {
              ...state,
              eventosSidebarToggled: action.payload
            };
          case TOGGLE_NUEVO_EVENTO_SB:
            return {
              ...state,
              nuevoEventoSidebarToggled: action.payload
            };
          case SET_DETALLE_DIA:
            return {
              ...state,
              detalleDia: action.payload
            };
      
          case BORRAR_EVENTO:
            return {
              ...state,
              events: state.events.filter(e => e.id !== action.payload)
            };
          case SET_EVENTOS:
            return {
              ...state,
              events: action.payload
            };
          case AGREGAR_FECHA_EVENTO:
            return {
              ...state,
              fechaEvento: action.payload
            };
          default:
            return state;
        }
      };