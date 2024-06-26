import React, { useContext, useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { TextInput, Button, Text, ActivityIndicator, Portal, Dialog } from 'react-native-paper';
import { AuthContext } from '../Contexts/AuthContext';
import { DoLogin } from '../API/Timetonic';
import ExtError from '../Library/ExtError';

function LoginScreen(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorDesc, setErrorDesc] = useState('');


  //Get Userstate context;
  const UserState = useContext(AuthContext);

  const handleLogin = async () => {
    setIsLoading(true);
    //Gets Login information
    try {
      const response = await DoLogin(email, password);
      console.log("Response: ", response);
      UserState?.setUserData({
        username: email,
        password: password,
        o_u: response!.o_u,
        userToken: response!.userToken,
        sessionToken: response!.sessionToken,
      });
    }
    catch (error: any) {
      if (error instanceof ExtError) {
        console.log(error.message);
        setErrorMsg(error.userErrorTitle);
        setErrorDesc(error.userErrorMessage);
      } else {
        console.log(error.message);
        setErrorMsg("Unknown Connection Error");
        setErrorDesc("Try again later.");
      }

      setIsFail(true);
      setIsLoading(false);
    }
  };

  const hideModal = () => setIsFail(false);

  return (
    <View style={styles.container}>
      <Portal>
        <Dialog visible={isFail} onDismiss={hideModal}>
          <Dialog.Title>{errorMsg}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{errorDesc}</Text>
          </Dialog.Content>
        </Dialog>
      </Portal>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isLoading}>
        <View style={styles.overlayBg}>
          <ActivityIndicator animating={isLoading} />
        </View>
      </Modal>
      <Text variant="displayMedium" style={styles.logo}>Timetonic</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        disabled={isLoading}
        autoComplete='email'
        autoCapitalize='none' />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={styles.input}
        disabled={isLoading}
        autoComplete='current-password'
        autoCapitalize='none' />
      <Button mode="contained" onPress={handleLogin} disabled={isLoading} style={styles.button}>
        LOGIN
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-around',
    paddingHorizontal: 20,
  },
  logo: {
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    width: "100%"
  },
  button: {
    width: "30%",
    marginTop: 10,

  },
  overlayBg: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBG: {
    backgroundColor: 'white',
    padding: 20
  },
});

export default LoginScreen;