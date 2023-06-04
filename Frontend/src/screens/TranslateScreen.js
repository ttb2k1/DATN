import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { Header, Icon } from '@rneui/base';
import { HeaderComponent } from '../components/HeaderComponent';
import Canvas from 'react-native-canvas';

const TranslateScreen = () => {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'white';
      setContext(ctx);
    }
  }, [canvasRef]);

  const handleTouchStart = (event) => {
    Alert.alert('Canvas is ready');
    const { pageX, pageY } = event.nativeEvent;
    setIsDrawing(true);
    setPoints([{ x: pageX, y: pageY }]);
  };

  const handleTouchMove = (event) => {
    if (!isDrawing) return;
    const { pageX, pageY } = event.nativeEvent;
    setPoints((prevPoints) => [...prevPoints, { x: pageX, y: pageY }]);
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
  };

  useEffect(() => {
    if (context && points.length >= 2) {
      const lastPoint = points[points.length - 2];
      const currentPoint = points[points.length - 1];

      context.beginPath();
      context.moveTo(lastPoint.x, lastPoint.y);
      context.lineTo(currentPoint.x, currentPoint.y);
      context.stroke();
      context.closePath();
    }
  }, [context, points]);

  const handleHomeIconPress = (e) => {
    Alert.alert('hoho');
  };

  return (
    <View>
      {/* <Header
        // leftComponent={{ icon: 'menu', color: '#fff' }}
        // rightComponent={{ icon: 'home', color: '#fff' }}
      /> */}
      <Canvas
        ref={canvasRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ backgroundColor: 'black' }}
      />
    </View>
  );
};

export default TranslateScreen;
