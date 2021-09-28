import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';
import { LoginForm, ActionError } from 'src/models';

interface AuthState {
  loading: boolean;
  token: string;
  error: ActionError;
}

const initialState: AuthState = {
  loading: false,
  token: '',
  error: {
    status: false,
    message: '',
  },
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
    loginAccountFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = { ...state.error, status: true, message: action.payload };
    },

    onResetError: state => {
      state.error = { ...state.error, status: false, message: '' };
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
export const selectAuthError = (state: RootState) => state.auth.error;

//Reducer
const authReducer = authSlice.reducer;
export default authReducer;
