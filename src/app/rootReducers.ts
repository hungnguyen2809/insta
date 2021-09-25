import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from 'src/redux/counter/slice';

const createRootReducers = () => {
  return combineReducers({
    counter: counterReducer,
  });
};

export default createRootReducers;
