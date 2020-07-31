import React, { Component } from "react";
import { Text, TextInput, View, Image, TouchableHighlight, Keyboard, ScrollView } from 'react-native'
import styles from './style'
import firebase from 'react-native-firebase'
import Loading from '../../loader/Loading'
import { fromLeft, zoomIn, zoomOut, flipX, flipY, fromRight } from 'react-navigation-transitions'
import assets from '../../assets/assets'
export default class signUp extends Component {
    state = { email: '', password: '', firstName: "", lastName: "", Mobile: "", errorMessage: null, isLoading: false }
    handleSignUp = () => {
        Keyboard.dismiss();
        this.setState({
            isLoading: true
        })
        console.log('isLoading ', this.state.isLoading);
        const emailError = this.validateEmail(this.state.email)
        const passwordError = this.state.password
        if (!emailError && !passwordError) {
            this.setState({ errorMessage: "Details are not valid !", isLoading: false })
        } else {
            if (this.state.firstName == '' || this.state.lastName == '' || this.state.Mobile == '') {
                this.setState({ errorMessage: "Please fill all required details .", isLoading: false });
                return;
            } else {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.state.email, this.state.password)
                    .then((res) => {

                        console.log('userInfo >>> ', res);
                        this.writeUserData(this.state.email)

                    })
                    .catch(error => this.setState({ errorMessage: error.message, isLoading: false }))
            }
        }
    }

    writeUserData(email) {


        firebase.auth().onAuthStateChanged(user => {
            let obj = {
                email: email,
                uid: user.uid,
                profilePic: 'https://bootdey.com/img/Content/avatar/avatar6.png',
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                Mobile: this.state.Mobile
            }
            console.log('', obj);
            firebase.database().ref('Users/' + user.uid).set(obj).then((data) => {

                //success callback
                console.log('data ', data);
                this.setState({ isLoading: false })
            }).catch((error) => {
                //error callback
                console.log('error ', error)
            })
        })
    }
    componentDidMount() {
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    showLoading() {
        console.log('isLoading ', this.state.isLoading);
        if (this.state.isLoading) {
            return (
                <Loading></Loading>
            )
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={{ width: "100%", flex: 1, height: "100%", marginBottom: 20 ,paddingTop:50}}
                    alwaysBounceVertical={true}>
                    {/* <View style={{ width: "100%", alignItems: "center" }}>
                        <Image
                            source={assets.banners.logo}
                            style={{ width: 96, height: 96, borderRadius: 96 }} />
                    </View> */}
                    <Text style={styles.text_view}>{"Register"}</Text>
                    {this.state.errorMessage &&
                        <Text style={{ color: 'red', fontFamily: "Montserrat-Medium", padding: 10, alignContent: "center", alignSelf: "center" }}>
                            {this.state.errorMessage}
                        </Text>}

                    <View style={styles.two_view_container}>

                        <View style={styles.two_view_container_Child}>
                            <Text style={styles.text_view_subtitle3}> {"First Name"} </Text>
                            <TextInput
                                placeholder="First Name"
                                autoCapitalize="none"
                                style={styles.textInput}
                                returnKeyType={"next"}
                                onSubmitEditing={() => { this.lastName.focus(); }}
                                onChangeText={firstName => this.setState({ firstName })}
                                value={this.state.firstName}
                                blurOnSubmit={false}
                            />
                        </View>

                        <View style={styles.two_view_container_Child}>
                            <Text style={styles.text_view_subtitle3}> {"Last Name"} </Text>
                            <TextInput
                                placeholder="Last Name"
                                autoCapitalize="none"
                                style={styles.textInput}
                                returnKeyType={"next"}
                                ref={(input) => { this.lastName = input; }}
                                onSubmitEditing={() => { this.Mobile.focus(); }}
                                onChangeText={lastName => this.setState({ lastName })}
                                value={this.state.lastName}
                                blurOnSubmit={false}
                            />
                        </View>
                    </View>


                    <View style={styles.two_view_container_new}>
                        <Text style={styles.text_view_subtitle}> {"Mobile"} </Text>
                        <TextInput
                            placeholder="Mobile"
                            keyboardType='numeric'
                            autoCapitalize="none"
                            style={styles.textInput}
                            returnKeyType={"next"}
                            ref={(input) => { this.Mobile = input; }}
                            onSubmitEditing={() => { this.email.focus(); }}
                            onChangeText={Mobile => this.setState({ Mobile })}
                            value={this.state.Mobile}
                            maxLength={10}
                            blurOnSubmit={false}
                        />
                        {this.showLoading()}
                        <Text style={styles.text_view_subtitle}> {"Email"} </Text>
                        <TextInput
                            placeholder="Email"
                            autoCapitalize="none"
                            style={styles.textInput}
                            ref={(input) => { this.email = input; }}
                            returnKeyType={"next"}
                            onSubmitEditing={() => { this.Password.focus(); }}
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                            blurOnSubmit={false}
                        />

                        <Text style={styles.text_view_subtitle2}> {"Password"} </Text>
                        <TextInput
                            secureTextEntry
                            placeholder="Password"
                            autoCapitalize="none"
                            style={styles.textInput}
                            ref={(input) => { this.Password = input; }}
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                        />


                        <TouchableHighlight style={styles.buttonCss} onPress={() => { this.handleSignUp() }}>
                            <Text style={{ fontFamily: "Montserrat-Medium", color: "#fff" }}> {"Signup"} </Text>
                        </TouchableHighlight>

                        <View style={{ marginTop: 25 }}>
                            <Text style={{ fontFamily: "Montserrat-Medium" }}> {"Already have an account?"} <Text onPress={() => this.goLoginPage()} style={{ color: '#CD001F', fontSize: 18, fontFamily: "Montserrat-Medium" }}> {"Login"} </Text></Text>
                        </View>

                    </View>

                </ScrollView>

            </View>
        )
    }
    goLoginPage() {
        this.props.navigation.navigate('Login');
        fromRight(3000);
    }

}