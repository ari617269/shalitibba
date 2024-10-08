import React from 'react';
import {ToastProvider} from './ToastContext';
import {ToastList} from './ToastList';
import {Home} from './Home';

const App = () => {
  return (
    <ToastProvider>
      <>
        <ToastList />
        <Home />
      </>
    </ToastProvider>
  );
};

export default App;