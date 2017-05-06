import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';

import {
  StackNavigator
} from 'react-navigation';

import Home from './components/Home';
import CameraApp from './components/CameraApp';
import About from './components/About';
import HeaderApp from './components/HeaderApp';

const App = StackNavigator({
  Main: {screen: Home},
  Camera: {screen: CameraApp},
  About: {screen: About}
},{ headerMode: 'screen' })

export default App
