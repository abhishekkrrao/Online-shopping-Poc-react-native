import React, { Component } from "react";
import { View, Text, FlatList, ScrollView, TextInput, Dimensions } from "react-native";
import Header from '../../Componets/HeaderView'
import styles from './style'
import firebase from 'react-native-firebase'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/FontAwesome'
export default class Message extends Component {
    state = { message: '', recieverUid: '', currentUID: '', arrayList: [] }
    static navigationOptions = {
        title: 'Chats'
    };
    onSend(messages) {
        console.log('messagemessage ', messages);
        if (messages != null && messages != undefined && messages != "") {
            this.writeUserData(messages);
        }
    }

    writeUserData(messages) {
        let user = firebase.auth().currentUser;
        if (this.state.recieverUid != undefined) {
            this.setState({
                currentUID: firebase.auth().currentUser.uid
            })
            firebase.database().ref('chat/' + user.uid + this.state.recieverUid).push({ message: messages, senderUid: user.uid, createdAt: new Date().getTime(), recieverUid: this.state.recieverUid }).then(() => {
                this.setState({ message: "" });
            }).catch((error) => {
                console.log('error ', error);
            });
        }
    }
    getCurrentUserUid() {
        return new Promise((resolve) => {
            firebase.auth().onAuthStateChanged(user => {
                this.setState({
                    currentUID: user.uid
                })
                resolve(user.uid);
            })
        })
    }
    getUpcomingInfo() {
        return new Promise((resolve) => {
            const receivedValue = this.props.navigation.getParam('item', () => { });
            this.setState({
                recieverUid: receivedValue.uid
            });
            resolve(receivedValue.uid);
        });
    }
    componentDidMount() {
        this.getCurrentUserUid().then((currentUID) => {
            this.getUpcomingInfo().then((recieverUid) => {
                this.getList().then((list) => {
                    console.log('list>>> ', list)
                    this.setState({
                        arrayList: list
                    });
                });
            })
        })
    }

    getList() {
        return new Promise((resolve) => {
            const arrayList = [];
            const senderRef = firebase.database().ref('chat/' + this.state.currentUID + this.state.recieverUid);
            const recieverRef = firebase.database().ref('chat/' + this.state.recieverUid + this.state.currentUID);
            senderRef.orderByChild('createdAt').on('child_added', function (snapshot) {
                arrayList.push({
                    createdAt: snapshot.val().createdAt,
                    message: snapshot.val().message,
                    recieverUid: snapshot.val().recieverUid,
                    senderUid: snapshot.val().senderUid
                });
                resolve(arrayList)
            });
            recieverRef.orderByChild('createdAt').on('child_added', function (snapshot) {
                arrayList.push({
                    createdAt: snapshot.val().createdAt,
                    message: snapshot.val().message,
                    recieverUid: snapshot.val().recieverUid,
                    senderUid: snapshot.val().senderUid
                });
                console.log('arrayList ', arrayList);
                resolve(arrayList)
            });
        });
    }

    right_left_Message(item) {
        if (item.senderUid == this.state.currentUID) {
            return (
                <View style={styles.left}>
                    <Text style={styles.leftMessage}>
                        {item.message}
                    </Text>
                </View>
            )
        } else {
            return (
                <View style={styles.right}>
                    <Text style={styles.rightMessage}>
                        {item.message}
                    </Text>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header title="Chats" style={styles.headerContainer}></Header>
                <ScrollView
                    style={{ flex: 1, width: '100%', height: "100%" }}
                    horizontal={false}
                    ref="scrollView"
                    onContentSizeChange={(width, height) => this.refs.scrollView.scrollTo({ y: height })}
                >
                    <FlatList
                        ref={ref => this.flatList = ref}
                        data={this.state.arrayList}
                        renderItem={({ item, i }) => {
                            console.log(item['item'], '   iiii ', i);
                            return this.right_left_Message(item)
                        }}
                        keyExtractor={({ index }) => index + 'llll' + '' + new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString()}
                        onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
                        onLayout={() => this.flatList.scrollToEnd({ animated: true })}
                    />
                </ScrollView>
                <View style={styles.passwordContainer}>
                    <TextInput
                        returnKeyType={"Send"}
                        placeholder="Type a message ....."
                        autoCapitalize="none"
                        autoFocus={true}
                        blurOnSubmit={false}
                        style={styles.input}
                        onChangeText={message => { this.setState({ message }) }}
                        value={this.state.message}
                        onSubmitEditing={() => { this.onSend(this.state.message) }}
                    />
                    {/* <Icon onPress={() => { this.onSend(this.state.message) }} type="material" name="chevron-right" size={35} color="#000" /> */}
                    <Icons onPress={() => { this.onSend(this.state.message) }} type="material" name="chevron-circle-right" size={35} color="#ccc" />
                </View>
            </View>
        );
    }
}