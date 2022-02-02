import {
    EDITAR_EVENTO,
    CAMBIAR_EVENTO_FIELD,
    BORRAR_EVENTO_FIELD
} from "../Acciones/tipos_accion";


const initialState = {
    id: "",
    nombreEvento: "",
    fecha: "",
    tiempo: "",
    participantes: "",
    descripcion: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case EDITAR_EVENTO:
            return {
                ...action.payload
            }
            case CAMBIAR_EVENTO_FIELD:
                const {
                    name, value
                } = action.payload;
                return {
                    ...state, [name]: value
                };

            case BORRAR_EVENTO_FIELD:
                return {
                    ...initialState
                }
                default:
                    return state;
    }
};