import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import TranslateScreen from './src/screens/TranslateScreen';
import HomeScreen from './src/screens/HomeScreen';
import LearnScreen from './src/screens/LearnScreen';
import DetailPracticeScreen from './src/screens/PracticeScreen';
import DetailLearnScreen from './src/screens/DetailLearnScreen';
import PracticeDetailScreen from './src/screens/DetailPracticeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const headerOptions = {
  headerStyle: {
    backgroundColor: '#629fef',
  },
  headerTintColor: 'white',
};
export default function App() {
  return (
    <SafeAreaProvider
      style={{ backgroundColor: headerOptions.headerStyle.backgroundColor }}
    >
      <NavigationContainer>
        <StatusBar backgroundColor='#629fef' />
        <Stack.Navigator initialRouteName='Home' screenOptions={headerOptions}>
          <Stack.Screen name='Translate' component={TranslateScreen} />
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Learn' component={LearnScreen} />
          <Stack.Screen name='Practice' component={DetailPracticeScreen} />
          <Stack.Screen name='DetailLearn' component={DetailLearnScreen} />
          <Stack.Screen
            name='DetailPractice'
            component={PracticeDetailScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
