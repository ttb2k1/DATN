import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import BoxComponent from '../components/BoxComponent';

const PracticeScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  const boxSize = (screenWidth - 70) / 5;
  return (
    <View style={styles.container}>
      <BoxComponent title='N1' height={boxSize} width={boxSize}>
        <Text></Text>
      </BoxComponent>
      <BoxComponent title='N2' height={boxSize} width={boxSize}>
        <Text></Text>
      </BoxComponent>
      <BoxComponent title='N3' height={boxSize} width={boxSize}>
        <Text></Text>
      </BoxComponent>
      <BoxComponent title='N4' height={boxSize} width={boxSize}>
        <Text></Text>
      </BoxComponent>
      <BoxComponent title='N5' height={boxSize} width={boxSize}>
        <Text></Text>
      </BoxComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    flexWrap: 'wrap',
  },
});

export default PracticeScreen;
