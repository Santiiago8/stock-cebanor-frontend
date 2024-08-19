import React from 'react';
import { UserProvider } from './context/userContext';
import { AppRouter } from './router';
import { StockProvider } from './context/StockContext';

function App() {
  return (
    <UserProvider>
      <StockProvider>
        <AppRouter />
      </StockProvider>
    </UserProvider>
  );
}

export default App;
