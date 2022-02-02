import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reductor_Calendario from "../Reductores/reductor_Calendario";
import reductor_cambioServicios from "../Reductores/reductor_CambioServicios";



const reducer = combineReducers({
    calendarState: reductor_Calendario,
    eventState: reductor_cambioServicios,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));

export default store;