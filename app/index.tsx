import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

const Message = styled.Text`
  align-self: stretch;
  text-align: center;
  font-size: 20px;
  color: #000000;
`;

interface Props {
  message?: string;
}

const App: React.FC<Props> = (props: Props) => {
  const {message = 'world'} = props;
  return (
    <Container>
      <Message>{'hello'}</Message>
    </Container>
  );
};

export default App;
