import React from 'react';
import {useToast} from './ToastContext';
import { Text, TouchableOpacity } from 'react-native';

export const Home = () => {
  const {createToast} = useToast();
  const handleCreateToastPress = React.useCallback(() => {
    createToast({
      message: 'hello world',
      title: 'Toast No ' + Math.floor(Math.random() * 100),
    });
  }, [createToast]);
  return (
    <TouchableOpacity onPress={handleCreateToastPress}>
      <Text>{'create random Toast'}</Text>
    </TouchableOpacity>
  );
};

/*
function () {
store.ToastStore.
}
*/
