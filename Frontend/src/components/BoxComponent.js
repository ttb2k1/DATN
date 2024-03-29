import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BoxComponent = ({ title, onPress, icon, height, width }) => {
  const boxStyle = {
    ...styles.box,
    width: width,
    height: height,
  };

  return (
    <TouchableOpacity style={boxStyle} onPress={onPress}>
      <View style={styles.contentContainer}>
        {icon && <Icon name={icon} size={30} color='black' marginBottom={5} />}
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'white',
    borderRadius: 150 * 0.08,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 7,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    maxWidth: 130,
  },
});

export default BoxComponent;
