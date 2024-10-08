import React from 'react';
import {IToastContext} from './types';
import {useToastState} from './useToastState';

const ToastContext = React.createContext<IToastContext>({
  toastList: [],
  createToast: () => {},
  removeToastAtIndex: () => {},
  secondsTicker: () => {},
});

export const ToastProvider = ({children}) => {
  const {createToast, toastList, removeToastAtIndex, secondsTicker} =
    useToastState();
  const timer = React.useRef<any>();
  React.useEffect(() => {
    startTimer();
    return () => {
      stopTimer();
    };
  }, []);
  const startTimer = () => {
    timer.current = setInterval(() => {
      secondsTicker();
    }, 1000);
  };
  const stopTimer = () => {
    if (timer) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  return (
    <ToastContext.Provider value={{toastList, createToast, removeToastAtIndex}}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return React.useContext(ToastContext);
};
