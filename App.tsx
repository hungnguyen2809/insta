import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'src/app/store';
import { AppNavigationContainter } from 'src/navigations';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigationContainter />
      </PersistGate>
    </Provider>
  );
};

export default App;
