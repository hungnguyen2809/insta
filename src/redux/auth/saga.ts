import { delay, put, takeEvery } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { LoginForm } from 'src/models';
import { authActions } from './slice';

function* loginAccount(action: PayloadAction<LoginForm>) {
  try {
    if (action.payload.email === 'ngochuyen@gmail.com' && action.payload.password === 'ngochuyen') {
      const token = Date.now() + action.payload.email + action.payload.password;
      yield delay(1000);
      yield put(authActions.loginAccountSuccess(token));
    } else {
      yield delay(1000);
      yield put(authActions.loginAccountFailed('Thông tin đăng nhập không chính xác.'));
    }
  } catch (error) {
    yield put(authActions.loginAccountFailed('Có lỗi xảy ra khi thực hiện.'));
  }
}

export default function* AuthSaga() {
  yield takeEvery(authActions.loginAccount.type, loginAccount);
}
