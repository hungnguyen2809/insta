import AsyncStorage from '@react-native-async-storage/async-storage';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import createRootReducers from './rootReducers';
import rootSagas from './rootSagas';

const sagaMiddleware = createSagaMiddleware();
const rootReducers = createRootReducers();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducers = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducers,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSagas);

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
