import React, { Component } from "react";
import { View, Text, ScrollView, FlatList, TextInput, Image } from "react-native";
import Loading from '../../loader/Loading'
import styles from './Style'
import Headers from '../../Componets/HeaderView'
import Icon from 'react-native-vector-icons/MaterialIcons'
import firebase from 'react-native-firebase'
import Icons from 'react-native-vector-icons/FontAwesome'
export default class Comment extends Component {
    constructor(props) {
        super(props)
    }

    state = { isLoading: true, receivedValue: {}, message: '', recieverUid: '', currentUID: '', arrayList: [], avatarSource: '' }
    componentDidMount() {
        const receivedValue = this.props.navigation.getParam('item', () => { });
        console.log('receivedValue ', receivedValue);
        this.setState({
            receivedValue: receivedValue,
            isLoading: false
        });
        this.getComment(receivedValue).then((list) => {
            console.log('snapshotlist ', list);
            this.setState({
                arrayList: list,
                currentUID: firebase.auth().currentUser.uid,
                isLoading: false
            });
        }).catch(() => { });
        this.getUserDetails().then(() => { }).catch(() => { });
    }

    getComment(item) {
        let self = this;
        let path = "comment/" + item.uid + "/" + item.key + "/comment";
        return new Promise((resolve) => {
            const arrayList = [];
            const senderRef = firebase.database().ref(path);
            senderRef.orderByChild('createdAt').on('child_added', function (snapshot) {
                arrayList.push({
                    createdAt: snapshot.val().timestamp,
                    message: snapshot.val().message,
                    recieverUid: snapshot.val().uid,
                    senderUid: firebase.auth().currentUser.uid,
                    email: snapshot.val().email,
                    profilePic: snapshot.val().pic
                });
                resolve(arrayList)

            });

        });
    }
    getUserDetails() {
        let self = this;
        return new Promise((resolve, reject) => {
            let path = 'Users/' + firebase.auth().currentUser.uid;
            // console.log('pathpath>>> ', path);
            firebase.database().ref(path).once('value').then(snapshot => {
                console.log('profilePic ', snapshot.val().profilePic);
                self.setState({
                    avatarSource: snapshot.val().profilePic,
                    isLoading: false
                })
                resolve(snapshot.val().profilePic)
            }).catch((error) => {
                reject(error)
            });
        })
    }
    doComment(item, message) {
        let path = "comment/" + item.uid + "/" + item.key + "/comment";

        //path = "comment/" + item.uid + "/" + item.key + "/comment";

        console.log('item.path ', path);
        let user = firebase.auth().currentUser;
        console.log('user ', user);
        if (message == "" || message == null || message == undefined) { return }
        let obj = {
            message: message,
            uid: user.uid,
            email: user.email,
            pic: this.state.avatarSource,
            timestamp: new Date().getTime()
        }
        if (item.uid != null && item.uid != undefined && item.key != null && item.key != undefined) {


            firebase.database().ref(path).push(obj).then(() => {
                this.setState({ message: "" });
            }).catch((error) => {
                console.log('error ', error);
            });


        } else {
            console.log('item.uid ', item.uid);
            console.log('item.key ', item.key);
        }
    }

    right_left_Message(item) {
        console.log('productPic ', item.profilePic);
        return (
            <View style={styles.left}>
                <Image source={{ uri: item.profilePic }} style={styles.left_image} />
                <View style={styles.leftMessage}>
                    <Text style={{ width: "90%", padding: 5, fontFamily: "Montserrat-Medium" }}>{item.message}</Text>
                </View>
            </View>
        )
    }
    renderSeparator = () => (<View style={{ backgroundColor: '#dbdbdb', height: 0.5, width: "100%" }} />);

    render() {

        if (this.state.isLoading) {
            return (
                <View style={styles.MainContainer}>
                    <Headers title="Comments" style={styles.headerContainer} ></Headers>
                    <Loading></Loading>
                </View>

            )
        } else {
            return (
                <View style={styles.MainContainer}>
                    <Headers title="Comments" style={styles.headerContainer} ></Headers>
                    <View style={styles.sub_main_container}>

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
                                keyExtractor={({ item, index }) => index + 'llll' + '' + new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString()}
                                onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
                                onLayout={() => this.flatList.scrollToEnd({ animated: true })}
                                ItemSeparatorComponent={this.renderSeparator}
                            />
                        </ScrollView>

                        <View style={styles.passwordContainer}>
                            <TextInput
                                returnKeyType={"Send"}
                                placeholder="Type a comment ....."
                                autoCapitalize="none"
                                autoFocus={true}
                                blurOnSubmit={false}
                                style={styles.input}
                                onChangeText={message => this.setState({ message })}
                                value={this.state.message}
                                onSubmitEditing={() => this.doComment(this.state.receivedValue, this.state.message)}
                            />
                            <Icons onPress={() => { this.doComment(this.state.receivedValue, this.state.message) }} type="material" name="chevron-circle-right" size={35} color="#ccc" />
                            {/* <Icon onPress={() => this.doComment(this.state.receivedValue, this.state.message)} type="material" name="chevron-right" size={35} color="#000" /> */}
                        </View>
                    </View>
                </View>
            );
        }
    }
}