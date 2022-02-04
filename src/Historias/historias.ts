import { combineReducers, applyMiddleware, createStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import appointmentReducer from './equipo/reductor';
import { Historia_Equipo } from './equipo/tipo';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GlobalState {
  appointmentsState: Historia_Equipo;
}

const combinedReducer = combineReducers<GlobalState>({
  appointmentsState: appointmentReducer,
});

const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const historia= createStore(combinedReducer, bindMiddleware([thunk]));

export default historia;