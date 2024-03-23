import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { AuthContext } from './src/Contexts/AuthContext';
import LoginScreen from "./src/LoginScreen";
import LandingScreen from './src/Landing/LandingScreen';

function App(): React.JSX.Element  {
  const userContext = useContext(AuthContext);
  if(userContext!.userData.username==undefined)
    return (<LoginScreen />);
  else
  return (<LandingScreen />);
};
export default App;