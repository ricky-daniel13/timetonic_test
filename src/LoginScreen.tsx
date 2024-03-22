import React, { useContext, useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { TextInput, Button, Text, ActivityIndicator, Portal } from 'react-native-paper';
import { AuthContext } from './Contexts/AuthContext';
import { Login } from './API/timetonic';

function LoginScreen(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFail, setIsFail] = useState(false);

  //Get Userstate context;
  const UserState = useContext(AuthContext);

  const handleLogin = async () => {
    setIsLoading(true);
    console.log('Email:', email);
    console.log('Password:', password);
    

    const response = await Login(email, password);
    

    UserState?.setUserData({
      ...UserState.userData,
      username: email,
      password: password,
    });

    setIsLoading(false);

    console.log(UserState?.userData);
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isLoading}>
        <View style={styles.modalBackground}>
          <ActivityIndicator animating={isLoading} />
        </View>
      </Modal>
      <Text variant="displayMedium" style={styles.logo}>Timetonic</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        disabled={isLoading}/>
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={styles.input}
        disabled={isLoading}/>
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
    alignItems:'center',
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;