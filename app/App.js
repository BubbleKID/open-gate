import React from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import { ApplicationProvider, Button, Input, Text, Toggle, Icon, IconRegistry } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ImageOverlay } from './extra/image-overlay.component';
import LottieView from 'lottie-react-native';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as animationData from './assets/data.json';
import axios from "axios";

let storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
});

// 全局变量
global.storage = storage

const EyeIcon = (style) => (
  <Icon {...style} name='eye'/>
);

const EyeOffIcon = (style) => (
  <Icon {...style} name='eye-off'/>
);

const PersonIcon = (style) => (
  <Icon {...style} name='person'/>
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      setEmail: '',
      passwordVisible: false,
      checked: true,
      isPlayed: false,
      speed: 1,
    };

    this.onSignInButtonPress = this.onSignInButtonPress.bind(this);
    this.onPasswordIconPress = this.onPasswordIconPress.bind(this);
    this.onCheckedChange = this.onCheckedChange.bind(this);
    this.setPasswordVisible = this.setPasswordVisible.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    this.animation.reset();
   
    storage.load({
      key: 'loginState',
      autoSync: true,
      syncInBackground: true,
      syncParams: null
    })
    .then(ret => {
      if(!!ret.email) {
        this.setState({
          email: ret.email,
          password: ret.password,
          isPlayed: true,
        });
        this.animation.play(0,10);
      }
    });
  }

  onSignInButtonPress = () => {
    if(this.email !== '' && this.password !== '') {
      axios
       .post("http://192.168.0.186:3000/login", {
         email: this.email,
         password: this.password
       })
       .then(function(response) {
         if(response.data === 'success') {
           setTimeout(function() {
             this.animation.play(10, 37);
             this.animation.stop();
           }, 5000);
           storage.save({
            key: 'loginState',
            data: {
              email: this.state.email,
              password: this.state.password,
            },
            expires: null,
          });
         }
       })
       .catch(function(error) {
         console.log(error);
       });
   }
  };

  onPasswordIconPress = () => {
    this.setPasswordVisible(!this.state.passwordVisible);
  };

  onCheckedChange = () => {
    this.setState({checked: !this.state.checked});
  };

  setPasswordVisible = () => {
    this.setState({passwordVisible: !this.state.passwordVisible});
  };

  onInputChange = (value, name) => {
    this.setState({[name]: value});
    
  
   
  }

  componentDidUpdate(prevState) {
    const { email, password, isPlayed, speed } = this.state;

    if(email == '' && password == '' && isPlayed == true) {
      this.setState({
        speed: -1,
        isPlayed: false,
      }, () => this.animation.play(0, 10));
    }

    if((email != '' || password != '') && isPlayed == false) {
      this.setState({
        speed: 1,
        isPlayed: true,
      }, () => this.animation.play(0, 10));
    }
  }

  render() {
    const { email, password, passwordVisible, checked, speed } = this.state;

    return (
      <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <KeyboardAvoidingView>
          <ImageOverlay style={styles.container} source={require('./assets/image-background.jpg')}>
            <View style={styles.headerContainer}>
              <LottieView 
                ref={animation => {
                  this.animation = animation;
                }}
                loop={false}
                style={styles.animation}
                source={require('./assets/data.json')}
                speed={speed}
              />
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
                icon={PersonIcon}
                value={email}
                onChangeText={(value) => this.onInputChange(value, 'email')}
              />
              <Input
                style={styles.passwordInput}
                status='control'
                placeholder='Password'
                icon={passwordVisible ? EyeIcon : EyeOffIcon}
                value={password}
                secureTextEntry={!passwordVisible}
                onChangeText={(value) => this.onInputChange(value, 'password')}
                onIconPress={this.onPasswordIconPress}
              />
              <Toggle style={styles.toggle}
                textStyle={styles.toggleText}
                text="Remember my account"
                checked={checked}
                onChange={this.onCheckedChange}
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
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animation: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 320,
    flex: 1,
    marginTop: 72,
  },
  toggleText: {
    color: '#ffffff',
    fontSize: 18,
  },
  toggle: {
    marginTop: 20,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
  },
  formContainer: {
    flex: 1,
    marginTop: 240,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
    marginBottom: 72,
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



