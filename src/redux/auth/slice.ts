import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';
import { LoginForm } from 'src/models';

interface AuthState {
  loading: boolean;
  token: string;
}

const initialState: AuthState = {
  loading: false,
  token: '',
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    loginAccount: (state, _action: PayloadAction<LoginForm>) => {
      state.loading = true;
    },
    loginAccountSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.token = action.payload;
    },
    loginAccountFailed: state => {
      state.loading = false;
    },

    logoutAccount: state => {
      state.token = '';
    },
  },
});

//Actions
export const authActions = authSlice.actions;

//Selector
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthToken = (state: RootState) => state.auth.token;

//Reducer
const authReducer = authSlice.reducer;
export default authReducer;
