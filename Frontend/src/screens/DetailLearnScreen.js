import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Button,
} from 'react-native';
import LearnService from '../services/LearnService';
import BoxComponent from '../components/BoxComponent';

const DetailLearnScreen = ({ route }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const level = route.params.level;
  const windowWidth = Dimensions.get('window').width;
  const boxSize = (windowWidth - 70) / 5;

  const numColumns = Math.floor(windowWidth / boxSize) - 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await LearnService.getListKanjiByLevel(level, currentPage);
        setData(res.data.results);
        console.log(res.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [level, currentPage]);

  const calculateSpacing = () => {
    const totalSpacing = windowWidth - boxSize * numColumns;
    const spacing = totalSpacing / (numColumns + 5);
    return spacing;
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const totalPages = Math.ceil(data?.length / numColumns);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {data &&
          Array.from({ length: totalPages }).map((_, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {data
                ?.slice(rowIndex * numColumns, (rowIndex + 1) * numColumns)
                .map((item, index) => (
                  <View
                    key={index}
                    style={[
                      styles.box,
                      { marginLeft: index === 0 ? calculateSpacing() : 0 },
                    ]}
                  >
                    <BoxComponent
                      key={index}
                      title={item.kanji}
                      height={boxSize}
                      width={boxSize}
                      // styles={styles.box}
                    />
                  </View>
                ))}
            </View>
          ))}
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title='Pre'
            onPress={handlePrevPage}
            disabled={currentPage === 1}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title='Next'
            onPress={handleNextPage}
            disabled={currentPage === totalPages || data?.length < 100}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  box: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    width: '50%',
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default DetailLearnScreen;
