import { configureStore } from '@reduxjs/toolkit'
import { combineReducers, compose } from 'redux';
import EmployeeReducer, { EmployeeReduxState } from './employee/EmployeeReducer';
import UserReducer, { UserReduxState } from './user/UserReducer';


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export interface RootState {
  user: UserReduxState;
  employee: EmployeeReduxState;
}

const rootReducer = combineReducers({
  user: UserReducer,
  employee: EmployeeReducer
});

export const store = configureStore({ reducer: rootReducer });