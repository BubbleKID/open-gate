import React from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import { ApplicationProvider, Button, Input, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ImageOverlay } from './extra/image-overlay.component';
import LottieView from 'lottie-react-native';
//import { EyeIcon, EyeOffIcon, PersonIcon } from './extra/icons';
import { KeyboardAvoidingView } from './extra/3rd-party';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
      email: '',
      password: '',
      setEmail: '',
      setPassword: '',
      passwordVisible: false,
      setPasswordVisible: false,
    };

    this.onSignInButtonPress = this.onSignInButtonPress.bind(this);
    this.onPasswordIconPress = this.onPasswordIconPress.bind(this);
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
    }).start();
  }

  onSignInButtonPress = () => {
    navigation && navigation.goBack();
  };

  onPasswordIconPress = () => {
    setPasswordVisible(!passwordVisible);
  };

  render() {
    const { email, setEmail, password, setPassword, passwordVisible, setPasswordVisible, progress } = this.state;
    return (
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <KeyboardAvoidingView>
          <ImageOverlay
            style={styles.container}
            source={require('./assets/image-background.jpg')}>
            <LottieView source={require('./assets/data.json')} progress={progress}/>
            <View style={styles.headerContainer}>
              <Text
                category='h1'
                status='control'>
                Open the gate
              </Text>
              <Text
                style={styles.signInLabel}
                category='s1'
                status='control'>
                Sign in to your account
              </Text>
            </View>
            <View style={styles.formContainer}>
              <Input
                status='control'
                placeholder='Email'
                //icon={PersonIcon}
                value={email}
                onChangeText={setEmail}
              />
              <Input
                style={styles.passwordInput}
                status='control'
                placeholder='Password'
                //icon={passwordVisible ? EyeIcon : EyeOffIcon}
                value={password}
                secureTextEntry={!passwordVisible}
                onChangeText={setPassword}
                //onIconPress={onPasswordIconPress}
              />
            </View>
            <Button
              style={styles.signInButton}
              status='control'
              size='giant'
              onPress={this.onSignInButtonPress}>
              LET ME IN
            </Button>
          </ImageOverlay>
        </KeyboardAvoidingView>
      </ApplicationProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
  },
  formContainer: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
});



