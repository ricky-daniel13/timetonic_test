/**
 * @format
 */
import {AppRegistry} from 'react-native';
import LoginScreen from './src/test';
import {name as appName} from './app.json';
import { PaperProvider } from 'react-native-paper';

export default function Main() {
  return (
    <PaperProvider>
      <LoginScreen />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
