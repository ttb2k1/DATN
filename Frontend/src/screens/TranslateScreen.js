import React from 'react';
import { View, Text } from 'react-native';
import { Header, Icon } from '@rneui/base';
import Canvas from 'react-native-canvas';
import styled from 'styled-components';

const Page = styled(View)`
  padding: 30px 15px 0px;
  background-color: red;
`;

const TranslateScreen = () => {
  const handleCanvas = (canvas) => {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'purple';
    ctx.fillRect(0, 0, 100, 100);
  };

  return (
    <View>
      <Header
        backgroundImageStyle={{}}
        barStyle='default'
        centerComponent={{
          text: 'TRANSLATE',
          style: { color: '#fff' },
        }}
        centerContainerStyle={{}}
        containerStyle={{ height: 80 }}
        leftComponent={{ icon: 'menu', color: '#fff' }}
        leftContainerStyle={{}}
        linearGradientProps={{}}
        placement='center'
        rightComponent={{ icon: 'home', color: '#fff' }}
        rightContainerStyle={{}}
        statusBarProps={{}}
      />
      <Page>
        <Canvas ref={this.handleCanvas} />
      </Page>
    </View>
  );
};

export default TranslateScreen;
