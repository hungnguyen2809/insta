import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';

interface CounterState {
  value: number;
  state: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: 0,
  state: 'idle',
};

const counterSilce = createSlice({
  name: 'counterSlice',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
  },
});

//Actions
export const counterActions = counterSilce.actions;

//Selectors
export const selectCount = (state: RootState) => state.counter.value;

//Reducer
const counterReducer = counterSilce.reducer;
export default counterReducer;
