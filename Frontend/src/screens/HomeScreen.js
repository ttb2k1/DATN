import { Button } from '@rneui/base';
import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import BoxComponent from '../components/BoxComponent';

const HomeScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get('window').width;
  const columnWidth = 150;
  const numColumns = Math.floor(windowWidth / columnWidth);
  // console.log(numColumns);

  const data = [
    {
      title: 'Translate',
      navigateTo: 'Translate',
      icon: 'search',
    },
    { title: 'Learn', navigateTo: 'Learn', icon: 'book' },
    { title: 'Practice', navigateTo: 'Practice', icon: 'edit' },
  ];

  const calculateSpacing = () => {
    const totalSpacing = windowWidth - columnWidth * numColumns;
    const spacing = totalSpacing / (numColumns + 1);
    return spacing;
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: Math.ceil(data.length / numColumns) }).map(
        (_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {data
              .slice(rowIndex * numColumns, (rowIndex + 1) * numColumns)
              .map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.box,
                    { marginLeft: index === 0 ? calculateSpacing() : 0 },
                  ]}
                >
                  <BoxComponent
                    onPress={() => navigation.navigate(item.navigateTo)}
                    title={item.title}
                    icon={item.icon}
                    height={150}
                    width={150}
                  />
                </View>
              ))}
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 17,
  },
  box: {
    flex: 1,
  },
});

export default HomeScreen;
