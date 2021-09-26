import { combineReducers } from '@reduxjs/toolkit';
import authReducer from 'src/redux/auth/slice';

const createRootReducers = () => {
  return combineReducers({
    auth: authReducer,
  });
};

export default createRootReducers;
