import React from 'react';
import {Toast, ToastLevel} from './types';

export const useToastState = () => {
  const [toastList, setToastList] = React.useState<Array<Toast>>([]);
  const createToast = (toast: Toast) => {
    const style = [
      ToastLevel.success,
      ToastLevel.warning,
      ToastLevel.error,
      ToastLevel.information,
    ][Math.floor(Math.random() * 4)];
    setToastList(value => {
      return value.concat([
        {
          ...toast,
          style,
          startTimestamp: new Date().getTime(),
          visible: value.length < 4,
        },
      ]);
    });
  };
  const removeToastAtIndex = (index: number) => {
    setToastList(value => {
      return value.filter(item => item.startTimestamp !== index);
    });
  };
  const secondsTicker = () => {
    const now = new Date().getTime();
    setToastList(value => {
      return value
        .filter(item => {
          if (!item.startTimestamp) {
            return false;
          }
          if (!item.visible) {
            return true;
          }
          const secondsPassed = Math.floor((now - item.startTimestamp) / 1000);
          return secondsPassed <= 5;
        })
        .map((item, index, array) => {
          return {
            ...item,
            visible: index < 5 ? true : item.visible,
          };
        });
    });
  };
  return {
    toastList,
    createToast,
    removeToastAtIndex,
    secondsTicker,
  };
};
