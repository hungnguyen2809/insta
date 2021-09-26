import { delay, put, takeEvery } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { LoginForm } from 'src/models';
import { authActions } from './slice';

function* loginAccount(action: PayloadAction<LoginForm>) {
  try {
    const token = Date.now() + action.payload.email + action.payload.password;
    yield delay(1000);
    yield put(authActions.loginAccountSuccess(token));
  } catch (error) {
    yield put(authActions.loginAccountFailed());
  }
}

export default function* AuthSaga() {
  yield takeEvery(authActions.loginAccount.type, loginAccount);
}
