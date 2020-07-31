import React from 'react';
import { TouchableHighlight, Text, View, Image, ScrollView, FlatList, } from 'react-native';
import Headers from '../../Componets/HeaderView'
import firebase from 'react-native-firebase'
import Loading from '../../loader/Loading'
import styles from './style'
import Icon from 'react-native-vector-icons/FontAwesome'
import { NavigationActions } from 'react-navigation';
export default class ClientProfilePage extends React.Component {
    state = {
        email: '', uid: '',
        avatarSource: 'https://bootdey.com/img/Content/avatar/avatar6.png', isLoading: false,
        list: [], index: 0, currentUserUID: firebase.auth().currentUser.uid,
        routes: [{ key: 'first', title: 'Likes' }, { key: 'second', title: 'Saved' },], senderUID: "", name: "", isFollow: false
    }

    showLoading() {
        if (this.state.isLoading == true) {
            return (
                <Loading></Loading>
            )
        }
    }
    componentDidMount() {
        Icon.loadFont().then(() => { }).catch(() => { });
        const receivedValue = this.props.navigation.getParam('item', () => { });
        console.log('receivedValue ', receivedValue);
        this.setState({
            senderUID: receivedValue.uid
        })
        this.getUserProductList(receivedValue.uid).then((list) => {
            console.log('list>>>> ', list);
            this.setState({
                list: list
            });
            // this.state.list = list;
        }).catch((error) => {
            console.log('error1>>> ', error);
        });
        this.getCurrentUser(receivedValue);
        this.getFollowerDetail();
    }
    getCurrentUser(value) {
        this.setState({
            email: value.email,
            uid: value.uid,
            isLoading: true
        });
        this.getUserDetails(value.uid).then(() => {
            // console.log('snapshotprofilePic>> ', profilePic);
        }).catch((error) => {
            console.log('error>>> ', error);
        });
    }
    getUserDetails(uid) {
        return new Promise((resolve, reject) => {
            let path = 'Users/' + uid;
            // console.log('pathpath>>> ', path);
            var ref = firebase.database().ref(path);
            ref.once('value').then(snapshot => {
                console.log('profilePic ', snapshot.val());
                this.setState({
                    avatarSource: snapshot.val().profilePic,
                    isLoading: false
                })
                resolve(snapshot.val().profilePic)
            }).catch((error) => {
                reject(error)
            });
        })
    }
    getUserProductList(uid) {
        const arrayList = [];
        return new Promise((resolve, reject) => {
            try {
                firebase.database().ref('/addProduct/' + uid).once('value').then(function (snapshot) {
                    let a = Object.keys(snapshot.val());
                    Object.values(snapshot.val()).map(async (o2, index) => {
                        o2.key = a[index];
                        arrayList.push(o2);
                    });
                    resolve(arrayList.reverse());
                }, function error(error) {
                    reject(error);
                });
            } catch (error) {
                console.log('error2>>>> ', error);
            }
        });
    }

    openPage(item) {
        console.log('modalpage_item ', item);
    }


    likeItems(item) {
        return (
            <View
                style={{
                    width: 150, height: 150, padding: 0,
                    borderRadius: 150, elevation: 5,
                    shadowOpacity: 1, marginStart: 2
                }}>
                <TouchableHighlight
                    style={{ width: "100%", height: "100%", borderRadius: 0 }}>
                    <Image source={{ uri: item.productPic }}
                        style={{ width: "100%", height: "100%", borderRadius: 10 }} />
                </TouchableHighlight>
            </View>
        )
    }

    showLikes() {
        return (
            <FlatList
                horizontal={true}
                style={{ flex: 1, paddingStart: 10 }}
                initialNumToRender={3}
                data={this.state.list}
                renderItem={({ item }) => this.likeItems(item)}
                keyExtractor={(item, index) => index.toString() + '' + new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString()}
            />
        )
    }
    back() {
        this.props.navigation.goBack();
    }
    render() {
        var data = this.state.email;
        var name = data.substring(0, data.lastIndexOf("@"));
        return (
            <View style={styles.container}>
                {/* <Headers title="Profile" style={styles.headerContainer}></Headers> */}
                <ScrollView
                    style={{ flex: 1, width: '100%', marginBottom: 10 }}
                    horizontal={false}>
                    <View style={{ padding: 15, flexDirection: "row", width: "100%" }}>
                        <View style={{ justifyContent: "flex-start", alignItems: "flex-start", width: "60%" }}>
                            <Text style={{
                                color: "#000000",
                                fontWeight: "900",
                                fontFamily: "Montserrat-Medium",
                                fontSize: 33,
                                width:"100%"
                            }}>{"Profile"} </Text>
                        </View>

                        <View style={{ justifyContent: "flex-end", alignItems: "flex-end", width: "30%", marginBottom: 10 }}>
                            <Icon onPress={() => { this.back() }} name="close" size={24} color="#000" />
                        </View>
                    </View>


                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <TouchableHighlight style={styles.avatar1} >
                                <Image style={styles.avatar}
                                    source={{ uri: this.state.avatarSource }} />
                            </TouchableHighlight>
                        </View>
                        <View style={styles.right_container}>
                            <Text style={styles.name}>{name} </Text>
                            <Text style={styles.userInfo}>{data} </Text>
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                {this.renderFollowButton()}
                            </View>

                            {this.followButtonRender()}
                        </View>
                    </View>


                    <View style={styles.item}>
                        {this.showLoading()}
                    </View>

                    <View style={styles.container}>
                        <View style={{ flexDirection: "row", width: "100%", flex: 2 }}>
                            <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 24, width: 200, flex: 1 }}> {"Your Likes"} </Text>
                            <Text onPress={() => { this.gotoShowAllLikes() }} style={styles.text_v}> {"Show all"} </Text>
                        </View>
                        {this.showLikes()}
                        <View style={{ flexDirection: "row", width: "100%", flex: 2 }}>
                            <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 24, width: 200, flex: 1 }}> {"Your Saved"} </Text>
                            <Text onPress={() => { this.gotoShowAllSaved() }} style={styles.text_v}> {"Show all"} </Text>
                        </View>
                        {this.showLikes()}
                    </View>
                </ScrollView>
            </View>
        );
    }

    gotoShowAllLikes() {
        this.props.navigation.navigate('Like')
    }
    gotoShowAllSaved() {
        this.props.navigation.navigate('Saved')
    }
    followButtonRender() {
        if (this.state.currentUserUID != this.state.senderUID) {
            if (this.state.isFollow) {
                return (
                    <View style={styles.followButtom_valid}>
                        <Text onPress={() => { this.followMe() }} style={styles.followButtomText}>{"Followed"} </Text>
                    </View>
                )
            } else {
                return (
                    <View style={styles.followButtom}>
                        <Text onPress={() => { this.followMe() }} style={styles.followButtomText}>{"Follow"} </Text>
                    </View>
                )
            }

        }
    }

    renderFollowButton() {
        //#FFD600
        if (this.state.isFollow) {
            return (<View style={{ flex: 1, flexDirection: "row", paddingTop: 10 }}>
                <Text style={styles.followText}>{"0"}{"  Following"} </Text>
                <Text style={styles.followText}>{"0"}{"  Followers"} </Text>
            </View>
            )
        } else {
            return (<View style={{ flex: 1, flexDirection: "row", paddingTop: 10 }}>
                <Text style={styles.followText}>{"0"}{"  Following"} </Text>
                <Text style={styles.followText}>{"0"}{"  Followers"} </Text>
            </View>
            )
        }
    }

    followMe() {
        let path = "follow/" + firebase.auth().currentUser.uid + "/" + this.state.senderUID;
        let path_following = "following/" + this.state.senderUID + "/" + firebase.auth().currentUser.uid;
        let name = "";
        if (this.state.email) {
            name = this.state.email.substring(0, this.state.email.lastIndexOf("@"));
        }
        if (this.state.isFollow) {
            this.setState({
                isFollow: false
            });
        } else {
            this.setState({
                isFollow: true
            });
        }
        let obj = {
            followerUID: this.state.senderUID,
            email: this.state.email,
            name: name,
            profilePic: this.state.avatarSource,
            isFollow: this.state.isFollow = this.state.isFollow == false ? true : false,
            createAt: new Date().getTime()
        }
        let obj1 = {
            followerUID: firebase.auth().currentUser.uid,
            email: this.state.email,
            name: name,
            profilePic: this.state.avatarSource,
            isFollow: this.state.isFollow = this.state.isFollow == false ? true : false,
            createAt: new Date().getTime()
        }
        console.log('obj>>>>>> ', obj);
        console.log('obj>>>>>> ', path);
        console.log('obj>>>>>> ', obj1);
        console.log('obj>>>>>> ', path_following);
        firebase.database().ref(path_following).set(obj1).then((result) => {
            console.log('result>>>> ', result);
        }).catch((error) => {
            console.log('error>>>> ', error);
        });
        firebase.database().ref(path).set(obj).then((result) => {
            console.log('result>>>> ', result);
        }).catch((error) => {
            console.log('error>>>> ', error);
        });


    }

    getFollowerDetail() {
        let self = this;
        let path = "follow/" + this.state.senderUID;
        try {
            firebase.database()
                .ref(path)
                .orderByChild('createAt')
                .on('child_added', function success(snapshot) {
                    console.log('snapshot>>>> ', snapshot.val().isFollow);
                    // let a = Object.keys(snapshot.val());
                    // Object.values(snapshot.val()).map((response, index) => {
                    //     response.key = a[index];
                    // });
                    self.setState({
                        isFollow: snapshot.val().isFollow
                    })
                }, function failure(error) {
                    console.log('error>>>> ', error);
                });
        } catch (error) {
            console.log('error>>>> ', error);
        }
    }
}
