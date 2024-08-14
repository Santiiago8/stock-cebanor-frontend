import React from 'react';
import { UserProvider } from './context/userContext';
import { AppRouter } from './router';


function App() {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  );
}

export default App;
