/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/Contexts/AuthContext';

export default function Main() {
  return (
    <AuthProvider>
      <PaperProvider>
        <App/>
      </PaperProvider>
    </AuthProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
