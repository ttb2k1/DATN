import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  PanResponder,
  Image,
  findNodeHandle,
  UIManager,
  ScrollView,
} from 'react-native';
import { SearchBar } from '@rneui/themed';
import Canvas from 'react-native-canvas';
import ResearchService from '../services/ResearchService';
import Icon from 'react-native-vector-icons/FontAwesome';
import { decode } from 'base-64';
import ViewShot from 'react-native-view-shot';

const TranslateScreen = () => {
  const viewShotRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [data, setData] = useState([]);
  const [kanji, setKanji] = useState([
    {
      probability: 0.9597116112709045,
      className: '夫',
    },
    {
      probability: 0.022601615637540817,
      className: '天',
    },
    {
      probability: 0.00294183986261487,
      className: '丈',
    },
    {
      probability: 0.0024818649981170893,
      className: '大',
    },
    {
      probability: 0.001169415540061891,
      className: '木',
    },
    {
      probability: 0.0006844024755991995,
      className: '矢',
    },
    {
      probability: 0.00018253822054248303,
      className: '失',
    },
  ]);
  const [open, setOpen] = useState(false);
  const [determine, setDetermine] = useState({
    xMin: 1000,
    yMin: 1000,
    xMax: 0,
    yMax: 0,
  });
  const [croptedImage, setCroptedImage] = useState(null);

  const measureView = (ref) => {
    return new Promise((resolve) => {
      const handle = findNodeHandle(ref.current);
      UIManager.measureInWindow(handle, (x, y, width, height) => {
        resolve({ x, y, width, height });
      });
    });
  };

  const handleTouchStart = (event, gestureState) => {
    const { pageX, pageY } = event.nativeEvent.touches[0];
    setIsDrawing(true);
    setPoints([{ x: pageX, y: pageY }]);
  };

  const handleTouchMove = (event, gestureState) => {
    if (!isDrawing) return;
    const { pageX, pageY } = event.nativeEvent.touches[0];
    setPoints((prevPoints) => [...prevPoints, { x: pageX, y: pageY }]);
  };

  const handleTouchEnd = (event, gestureState) => {
    setIsDrawing(false);
  };

  useEffect(() => {
    const cropImage = async (determine) => {
      const { xMin, yMin, xMax, yMax } = determine;
      const canvas = canvasRef.current;

      if (canvas) {
        try {
          const uri = await viewShotRef.current.capture();
          return setCroptedImage(uri);
        } catch (error) {
          console.log(error);
        }
      }
    };

    if (
      !isDrawing &&
      JSON.stringify(determine) !==
        JSON.stringify({ xMin: 1000, yMin: 1000, xMax: 0, yMax: 0 })
    ) {
      cropImage(determine);
    }
  }, [isDrawing]);

  useEffect(() => {
    const drawLine = (context, startPoint, endPoint) => {
      context.beginPath();
      context.strokeStyle = 'white';
      context.lineWidth = 7;
      context.moveTo(startPoint.x - 30, startPoint.y - 160);
      context.lineTo(endPoint.x - 30, endPoint.y - 160);
      context.stroke();
    };

    const handleCanvas = async (canvas) => {
      if (canvas) {
        const context = canvas.getContext('2d');

        if (context && points.length >= 2) {
          const lastPoint = points[points.length - 2];
          const currentPoint = points[points.length - 1];
          if (lastPoint && currentPoint) {
            drawLine(context, lastPoint, currentPoint);
            setDetermine({
              xMin: Math.min(determine.xMin, currentPoint.x),
              xMax: Math.max(determine.xMax, currentPoint.x),
              yMin: Math.min(determine.yMin, currentPoint.y),
              yMax: Math.max(determine.yMax, currentPoint.y),
            });
          }
        }
      }
    };

    if (canvasRef) {
      handleCanvas(canvasRef.current);
    }
  }, [canvasRef, points]);

  useEffect(() => {
    if (croptedImage) {
      try {
        ResearchService.postCanvas('image', croptedImage).then((res) => {
          // console.log(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    }
    // console.log(croptedImage);
  }, [croptedImage]);

  const handleSearch = (text) => {
    setSearch(text);
  };

  const handleSearchSubmit = async () => {
    setSearchResult(search);
    try {
      await ResearchService.getVocabByName(search).then((res) => {
        setData(res.data.results);
        // console.log(res.data.results);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleChoose = (kanji) => {
    setSearch(search + kanji);
    setOpen(false);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: handleTouchStart,
    onPanResponderMove: handleTouchMove,
    onPanResponderRelease: handleTouchEnd,
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar
          platform='android'
          containerStyle={styles.searchBarContainer}
          onChangeText={handleSearch}
          onSubmitEditing={handleSearchSubmit}
          value={search}
          placeholder='Type here...'
          placeholderTextColor='#888'
        />
        <View style={styles.drawIconContainer}>
          <TouchableOpacity onPress={handleOpen} style={styles.drawButton}>
            <Icon
              name='paint-brush'
              size={30}
              color='gray'
              style={styles.drawIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {open && (
        <View style={styles.canvasLabelContainer}>
          <View style={styles.canvasContainer}>
            {panResponder && (
              <ViewShot ref={viewShotRef} style={{ flex: 1 }}>
                <View
                  style={styles.canvasWrapper}
                  {...panResponder.panHandlers}
                >
                  <Canvas ref={canvasRef} style={styles.canvas} />
                </View>
              </ViewShot>
            )}
            {kanji && (
              <View style={styles.divContainer}>
                <View style={styles.labelContainer}>
                  {kanji?.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.label,
                        index === 6 && styles.noBorderRight,
                      ]}
                      onPress={() => handleChoose(item.className)}
                    >
                      <Text style={{ fontSize: 20 }}>{item.className}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      )}
      {data?.map((item, index) => (
        <View key={index} style={styles.cardBoxContainer}>
          <Text>
            <Text style={{ fontSize: 25, color: 'red' }}>{item.kanji}</Text>
            <Text
              style={{ fontSize: 15, color: 'gray' }}
            >{` [${item.mean}]`}</Text>
          </Text>
          <Text style={{ fontSize: 15, marginBottom: 15, marginTop: 7 }}>
            Số nét: {item.stroke_count}
          </Text>
          <Text style={{ fontSize: 18 }}>音: {item.on}</Text>
          <Text style={{ fontSize: 18 }}>訓: {item.kun}</Text>
          <Text style={{ fontSize: 18, marginTop: 10 }}>
            <Text>Những từ liên quan:</Text>
          </Text>
          {item.kun && (
            <View>
              {item.example_kun[
                item.kun
                  .split(' ')
                  .find((ele) => item.example_kun.hasOwnProperty(ele))
              ]?.map((kun, index) => {
                return (
                  index <= 7 && (
                    <View
                      key={index}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 10,
                      }}
                    >
                      <Text
                        style={{
                          marginRight: 15,
                          marginBottom: 10,
                          fontSize: 15,
                          color: 'red',
                        }}
                      >
                        {kun.w}
                      </Text>
                      <Text style={{ marginRight: 15, color: 'gray' }}>
                        {kun.p}
                      </Text>
                      <Text style={{ flexShrink: 1 }}>{kun.m}</Text>
                    </View>
                  )
                );
              })}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    position: 'absolute',
    top: 0,
    zIndex: 1, // Add zIndex to ensure the search container appears above other elements
  },
  searchBarContainer: {
    flex: 1,
    borderRadius: 30,
    padding: 10,
  },
  searchBarIconContainer: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
  searchBarRightIconContainer: {
    marginRight: 10,
  },
  searchIcon: {
    position: 'relative',
    zIndex: 0,
  },
  drawIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'white',
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 50,
    height: '100%',
  },
  drawIcon: {
    fontSize: 20,
  },
  canvasLabelContainer: {
    flex: 1,
    alignItems: 'center',
    width: '85%',
    zIndex: 2, // Set zIndex to 0 to place the container below the search container
    marginTop: 80,
  },
  canvasContainer: {
    width: '100%',
    height: 200,
    backgroundColor: 'blue',
  },
  canvasContainer: {
    width: '100%',
    height: 200,
    backgroundColor: 'blue',
  },
  canvasWrapper: {
    flex: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 200,
    alignItems: 'center',
  },
  canvas: {
    flex: 1,
    backgroundColor: 'black',
    width: '100%',
  },
  divContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    height: 40,
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  label: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noBorderRight: {
    borderRightWidth: 0,
  },
  coordinatesContainer: {
    marginTop: 10,
  },
  coordinateText: {
    color: 'white',
    fontSize: 12,
  },
  labelText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  searchBarRightIconContainer: {
    marginRight: 10,
  },
  cardBoxContainer: {
    display: 'flex',
    backgroundColor: 'red',
    position: 'absolute',
    top: 100,
    width: '90%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
  },
});
export default TranslateScreen;
