import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { AuthContext } from './src/Contexts/AuthContext';
import LoginScreen from "./src/LoginScreen";

function App(): React.JSX.Element  {
  const userContext = useContext(AuthContext);
  if(userContext!.userData.username==undefined)
    return (<LoginScreen />);
  else
  return (
    <View>
      <Text variant="displayMedium">Logged!</Text>
    </View>
  );
};
export default App;