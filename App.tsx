import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'src/app/store';
import { AppNavigationContainter } from 'src/navigations';

const App = () => {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <AppNavigationContainter />
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
};

export default App;
