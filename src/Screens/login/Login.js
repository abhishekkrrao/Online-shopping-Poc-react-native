import React from 'react'
import { Text, TextInput, View, Image, TouchableHighlight, Keyboard } from 'react-native'
import styles from './style'
import firebase from 'react-native-firebase'
import Loading from '../../loader/Loading'
// import auth from '../../Api/authentication'
import assets from '../../assets/assets'
export default class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = { email: '', password: '', errorMessage: null, isLoading: false }
  }
  goSignUpPage() {
    this.props.navigation.navigate('signUp');
  }
  // saveData(key,obj){
  //   auth.saveData(key,obj);
  // }

  handleLogin = () => {
    // TODO: Firebase stuff...
    Keyboard.dismiss()
    this.setState({
      isLoading: true
    })
    const { email, password } = this.state;
    const emailError = this.validateEmail(this.state.email)
    const passwordError = this.state.password
    if (!emailError && !passwordError) {
      //this.setState({ errorMessage: 'Details are not valid!' });
      this.setState({
        isLoading: false,
        errorMessage: 'Details are not valid!'
      })
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.props.navigation.navigate('Home');
          this.setState({
            isLoading: false
          })
        }).catch(error => {
          this.setState({ errorMessage: error.message })
          this.setState({
            isLoading: false
          })
        })
    }
  }

  showLoading() {
    if (this.state.isLoading) {
      return (
        <Loading></Loading>
      )
    }
  }
  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  loader() {
    if (this.state.isLoading == true) {
      return (
        <Loading></Loading>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>

        {/* <View style={{ width: "100%",alignItems:"center" }}>
          <Image
            source={assets.banners.logo}
            style={{ width: 96, height: 96, borderRadius: 96 }} />
        </View> */}

        <Text style={styles.text_view}> {"Welcome into"} {"\n"}{" e-connect"} </Text>
        {/* <Text style={styles.text_view}> {"Login into"} {"\n"}{" your account"} </Text> */}
        {this.state.errorMessage && <Text style={{ color: 'red', fontFamily: "Montserrat-Medium" }}> {this.state.errorMessage} </Text>}

        <Text style={styles.text_view_subtitle}> {"Your Email"} </Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          returnKeyType={"next"}
          onSubmitEditing={() => { this.Password.focus(); }}
          blurOnSubmit={false}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Text style={styles.text_view_subtitle2}> {"Your Password"} </Text>
        <TextInput
          ref={(input) => { this.Password = input; }}
          mode='outlined'
          secureTextEntry
          maxLength={8}
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.onPasswordChange(password)}
          value={this.state.password}
        />
        {this.loader()}
        <TouchableHighlight onPress={() => this.handleLogin()} style={styles.buttonCss}>
          <Text style={{ fontFamily: "Montserrat-Medium", color: "#fff" }}> {"Login"} </Text>
        </TouchableHighlight>
        <View style={{ marginTop: 25 }}>
          <Text style={{ fontFamily: "Montserrat-Medium" }}> {"Don't have an account?"} <Text onPress={() => this.goSignUpPage()} style={{ color: '#CD001F', fontSize: 18, fontFamily: "Montserrat-Medium" }}> {"Signup"} </Text></Text>
        </View>
        <View style={{ marginTop: 25 }}>
          <Text onPress={() => { this.goFPage() }} style={{ fontFamily: "Montserrat-Medium" }}> {"Forget Password ?"} </Text>
        </View>
      </View>
    )
  }
  goFPage() {
    this.props.navigation.navigate('ForgetPasswordPage');
  }
  onPasswordChange(password) {
    this.setState({ password })
  }
}