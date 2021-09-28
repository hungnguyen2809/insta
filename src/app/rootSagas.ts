import { all, call } from 'redux-saga/effects';
import AuthSaga from 'src/redux/auth/saga';

export default function* rootSagas() {
  yield all([call(AuthSaga)]);
}
