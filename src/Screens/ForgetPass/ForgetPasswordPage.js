import React, { Component } from 'react';
import { Text, View, TextInput,TouchableHighlight } from 'react-native';
import styles from './style'
export default class ForgetPasswordPage extends Component {
    constrcutor() {
    }
    state = { email: "" }
    componentDidMount() {
    }

    gotoLogin() {
        this.props.navigation.navigate('Login')
    }
    checkOtp(){
        this.props.navigation.navigate('OtpPage')
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text_view}> {"Reset Password"} </Text>
                {this.state.errorMessage && <Text style={{ color: 'red', fontFamily: "Montserrat-Medium" }}> {this.state.errorMessage} </Text>}

                <Text style={styles.text_view_subtitle}> {"Your Email/Mobile"} </Text>
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Email/Mobile"
                    blurOnSubmit={false}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TouchableHighlight onPress={() => this.checkOtp()} style={styles.buttonCss}>
                    <Text style={{ fontFamily: "Montserrat-Medium", color: "#fff" }}> {"Submit"} </Text>
                </TouchableHighlight>
                <View style={{ marginTop: 25 }}>
                    <Text style={{ fontFamily: "Montserrat-Medium" }}> {"Go to ?"} <Text onPress={() => { this.gotoLogin(); }} style={{ color: '#FF7538', fontSize: 18, fontFamily: "Montserrat-Medium" }}> {"Login"} </Text></Text>
                </View>
            </View>
        );
    }
}