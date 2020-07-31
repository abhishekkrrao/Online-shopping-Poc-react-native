import React, { Component } from "react";
import Home from '../Screens/home/home'
import Details from '../Screens/DetailPage/Details'
import addproduct from '../Screens/Addproduct/addproduct'
import UserProfille from '../Screens/UserProfile/UserProfille'
import Loading from '../loader/Loading'
import signUp from '../Screens/signup/SignUp'
import chat from '../Screens/Chat/Chat'
import Login from '../Screens/login/Login'
import Comment from '../Screens/Comments/Comment'
import Message from '../Screens/Message/Message'
import { Platform } from "react-native";
import { createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import firebase from 'react-native-firebase'
import Saved from "../Screens/Saved/Saved";
import Like from "../Screens/Likes/Likes";
import ForgetPasswordPage from '../Screens/ForgetPass/ForgetPasswordPage'
import OtpPage from '../Screens/Otp/OtpPage'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ClientProfilePage from '../Screens/ClientProfile/ClientProfile'
import FollowersPage from '../Screens/Followers/Followers'
import FollowingPage from '../Screens/Following/Following'
const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: "Shop",
            headerLeft: null,
            gesturesEnabled: false,
            header: {
                visible: false,
                left: null,
            },
            backButton: {
                visible: false,
            }
        }
    }, chat: {
        screen: chat,
        navigationOptions: () => ({
            title: "Message",
            headerLeft: null,
            gesturesEnabled: false,
            header: {
                visible: false,
                left: null,
            },
            backButton: {
                visible: false,
            }
        })
    }, addproduct: {
        screen: addproduct,
        navigationOptions: {
            title: "Sell",
            headerLeft: null,
            gesturesEnabled: false,
            header: {
                visible: false,
                left: null,
            },
            backButton: {
                visible: false,
            }
        }
    }, UserProfille: {
        screen: UserProfille,
        navigationOptions: {
            title: "Profile",
            headerLeft: null,
            gesturesEnabled: false,
            header: {
                visible: false,
                left: null,
            },
            backButton: {
                visible: false,
            }
        }
    },
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => {
            const { routeName } = navigation.state;

            switch (routeName) {
                case 'Home':
                    if (focused) {
                        return (
                            <Icon onPress={() => console.log('')} name="search" size={24} color="#000" />
                        );
                    } else {
                        return (
                            <Icon onPress={() => console.log('')} name="search" size={24} color="#ccc" />
                        );
                    }

                case 'UserProfille':
                    if (focused) {
                        return (
                            <Icon onPress={() => console.log('')} name="person" size={24} color="#000" />
                        );
                    } else {
                        return (
                            <Icon onPress={() => console.log('')} name="person" size={24} color="#ccc" />
                        );
                    }

                case 'addproduct':
                    if (focused) {
                        return (
                            <Icon onPress={() => console.log('')} name="add-shopping-cart" size={24} color="#000" />
                        );
                    } else {
                        return (
                            <Icon onPress={() => console.log('')} name="add-shopping-cart" size={24} color="#ccc" />
                        );
                    }
                case 'chat':
                    if (focused) {
                        return (
                            <Icon onPress={() => console.log('')} name="message" size={24} color="#000" />
                        );
                    } else {
                        return (
                            <Icon onPress={() => console.log('')} name="message" size={24} color="#ccc" />
                        );
                    }
            }
        },
    }), tabBarOptions: {
        activeTintColor: '#000',
        inactiveTintColor: '#ccc',
        activeBackgroundColor: '#fff',
        labelStyle: { fontFamily: "Montserrat-Medium", fontWeight: "900", fontSize: 14 },
        tabStyle: { fontFamily: "Montserrat-Medium", fontWeight: "900", fontSize: 14 },
        style: { height: 50, fontFamily: "Montserrat-Medium", borderStyle: 'solid' }
    },
});
const AppNavigator = createStackNavigator({
    Loading: { screen: Loading },
    Details: { screen: Details },
    signUp: { screen: signUp },
    chat: { screen: chat },
    Message: { screen: Message },
    addproduct: { screen: addproduct },
    Login: { screen: Login },
    Home: { screen: Home },
    UserProfille: { screen: UserProfille },
    Tabs: { screen: TabNavigator },
    Comment: { screen: Comment },
    Saved: { screen: Saved },
    ForgetPasswordPage: { screen: ForgetPasswordPage },
    Like: { screen: Like },
    OtpPage: { screen: OtpPage },
    ClientProfilePage: { screen: ClientProfilePage },
    FollowersPage: { screen: FollowersPage },
    FollowingPage: { screen: FollowingPage }
}, {
    headerMode: 'none',
    defaultNavigationOptions: {
        gesturesEnabled: false,
    }
});
const AppContainer = createAppContainer(AppNavigator);
export default class Navigator extends Component {
    state = { currentUser: '' }
    render() {
        Icon.loadFont().then(() => { }).catch(() => { });
        return (
            <AppContainer ref={r => this.navigation = r._navigation} />
        )
    }
    initFirebaseApp() {
        const iosConfig = {
            apiKey: 'AIzaSyCfthKhLV1RCYYXRmCp-5OYVPfUahWAOlg',
            clientId: '1030315320618-upbact3r9qu7iccvqd1pl74rnp95ks64.apps.googleusercontent.com',
            appId: '1:1030315320618:ios:a5046d75075c029a19aa53',
            databaseURL: 'https://pschedoproject.firebaseio.com/',
            storageBucket: 'pschedoproject.appspot.com',
            messagingSenderId: '1030315320618',
            projectId: 'pschedoproject',
            persistence: true,
            authDomain: "pschedoproject.firebaseapp.com",
        }
        const androidConfig = {
            apiKey: "AIzaSyCfthKhLV1RCYYXRmCp-5OYVPfUahWAOlg",
            authDomain: "pschedoproject.firebaseapp.com",
            databaseURL: "https://pschedoproject.firebaseio.com",
            projectId: "pschedoproject",
            storageBucket: "pschedoproject.appspot.com",
            messagingSenderId: "1030315320618",
            appId: "1:1030315320618:web:9a0f537b4125a0f819aa53",
            measurementId: "G-ESXJTMWFNX"
        }
        // console.log('firebase.app.length ',  Platform.OS === 'ios' ? iosConfig : androidConfig);
        if (firebase.app.length > 0) {
            ;
            firebase.initializeApp(Platform.OS === 'ios' ? iosConfig : androidConfig);
        }
    }
    componentDidMount() {
        this.initFirebaseApp();
        let initialRouteName = 'Loading';
        firebase.auth().onAuthStateChanged(user => {
            if (user == null) {
                initialRouteName = 'signUp'
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({
                        routeName: initialRouteName
                    })],
                })
                this.navigation.dispatch(resetAction);
            } else {
                initialRouteName = 'Tabs'
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({
                        routeName: initialRouteName
                    })],
                });
                this.navigation.dispatch(resetAction);
            }
        });
    }
} 
