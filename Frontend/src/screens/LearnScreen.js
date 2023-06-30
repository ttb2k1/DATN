import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import BoxComponent from '../components/BoxComponent';

const LearnScreen = ({ navigation }) => {
  const screenWidth = Dimensions.get('window').width;
  const boxSize = (screenWidth - 70) / 5;

  const boxData = [
    { title: 'N1' },
    { title: 'N2' },
    { title: 'N3' },
    { title: 'N4' },
    { title: 'N5' },
  ];

  const extractNumberFromTitle = (title) => {
    const number = title.slice(1);
    return isNaN(number) ? '' : number;
  };

  const handleBoxPress = async (title) => {
    const number = extractNumberFromTitle(title);
    navigation.navigate('DetailLearn', { level: number });
  };

  return (
    <View style={styles.container}>
      {boxData.map((box, index) => (
        <BoxComponent
          key={index}
          title={box.title}
          height={boxSize}
          width={boxSize}
          onPress={() => handleBoxPress(box.title)}
        />
      ))}
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

export default LearnScreen;
