import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {styled} from 'styled-components/native';
import {useToast} from './ToastContext';
import {Toast, ToastLevel} from './types';

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const ToastItem = styled.View<{backgroundColor: string}>`
  height: 100px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 20px;
  background-color: ${props => props.backgroundColor ?? 'red'};
`;

const ToastIcon = styled.Image`
  height: 50px;
  width: 50px;
  margin-right: 20px;
`;
const ToastBody = styled.View``;
const ToastHeading = styled.Text`
  font-size: 30px;
  font-weight: 800;
  color: white;
`;
const ToastMessage = styled.Text`
  font-size: 20px;
  font-weight: 400;
  color: white;
  margin-top: 20px;
  color: white;
`;
const CrossButton = styled.TouchableOpacity`
  height: 50;
  width: 50;
`;

const styles = StyleSheet.create({
  list: {
    padding: 20,
  },
});

export const ToastList = () => {
  const {toastList, removeToastAtIndex} = useToast();
  const visibleToast = React.useMemo(() => {
    return toastList.filter(toast => toast.visible);
  }, [toastList]);
  const keyExtractor = React.useCallback(
    (item: Toast) => item.startTimestamp,
    [],
  );
  const backgroundColor = React.useCallback((style: ToastLevel) => {
    switch (style) {
      case ToastLevel.success:
        return 'green';
      case ToastLevel.warning:
        return 'yellow';
      case ToastLevel.error:
        return 'red';
      case ToastLevel.information:
        return 'blue';
      case ToastLevel.default:
      default:
        return 'black';
    }
  }, []);
  const renderItem = React.useCallback(
    ({item}: {item: Toast}) => {
      const {url, style, title, message, startTimestamp} = item;
      return (
        <ToastItem backgroundColor={backgroundColor(style)}>
          {url ? <ToastIcon source={{uri: url}} resizeMode={'contain'} /> : null}
          <ToastBody>
            <ToastHeading>{title}</ToastHeading>
            <ToastMessage>{message}</ToastMessage>
          </ToastBody>
          <CrossButton onPress={() => removeToastAtIndex(startTimestamp)}>
            <ToastHeading>{'X'}</ToastHeading>
          </CrossButton>
        </ToastItem>
      );
    },
    [backgroundColor, removeToastAtIndex],
  );
  return (
    <Container>
      <FlatList
        style={styles.list}
        data={visibleToast}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </Container>
  );
};
