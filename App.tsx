import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'src/app/store';
import { AppNavigationContainter } from 'src/navigations';
import NotificationProvider from 'src/notifications';

const App: React.FC = () => {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <PaperProvider>
            <AppNavigationContainter />
          </PaperProvider>
          <NotificationProvider />
        </SafeAreaProvider>
      </PersistGate>
    </StoreProvider>
  );
};

export default App;
