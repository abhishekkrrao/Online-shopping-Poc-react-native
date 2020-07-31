import React, { Component } from 'react';
import { Text, View, FlatList, TouchableHighlight, Image } from 'react-native';
import styles from './style'
import firebase from 'react-native-firebase'
import Header from '../../Componets/HeaderView'
import Loading from '../../loader/Loading'
import { Icon } from 'react-native-elements'
export default class FollowingPage extends Component {
    constructor(props) {
        super(props)
    }
    state = { list: [], isLoading: true }
    _refresh() {

    }
    renderList(item, index) {
        console.log('item>>> ', item);
        console.log('index>>> ', index);

        return (
            <View style={{
                flex: 1, flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
                backgroundColor: '#eceff1',
                marginTop: 5,
                borderRadius: 5,
                width: '95%',
                marginLeft: '2.5%'
            }}>
                <View style={{ width: 70 }}>
                    <TouchableHighlight style={{ padding: 5 }} >
                        <Image source={{ uri: item.profilePic }} style={{ width: 50, height: 50, borderRadius: 30 }} />
                    </TouchableHighlight>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: "Montserrat-Medium" }}>
                        {item.name}
                    </Text>
                    <Text style={{ fontFamily: "Montserrat-Medium" }}>
                        {item.email}
                    </Text>
                </View>
                <View style={styles.followButtom}>
                    {this.renderFollowButton(item, index)}
                </View>
            </View>
        );

    }
    renderFollowButton(item, index) {
        //#FFD600
        if (item.isFollow) {
            return (<View style={styles.followButtom_valid}>
                <Text onPress={() => { this.followMe(item, index) }} style={styles.followButtomText}>{"Followed"} </Text>
            </View>
            )
        } else {
            return (
                <View style={styles.followButtom_valids}>
                    <Text onPress={() => { this.followMe(item) }} style={styles.followButtomText}>{"Follow"} </Text>
                </View>
            )
        }

    }
    followMe(item, index) {
        let path = "follow/" + firebase.auth().currentUser.uid + "/" + item.followerUID;
        item.isFollow = item.isFollow == false ? true : false;
        console.log('obj>>>>>> ', item);
        console.log('obj>>>>>> ', path);
        firebase.database().ref(path).set(item).then((result) => {
            if (this.state.list.length > 0) {
                console.log('isFollow>>>> ', this.state.list[index].isFollow);
                // let isFollow = this.state.list[index].isFollow;
                // if (this.state.list[index].isFollow == true) {
                //     this.state.list[index].isFollow = false;
                // } else {
                //     this.state.list[index].isFollow = true;
                // }
            }
        }).catch((error) => {
            console.log('error>>>> ', error);
        });
    }
    render() {
        return (
            <View style={styles.containers}>
                <Header title="Followings" style={styles.headerContainer} />
                {this.showLoading()}
                <View style={styles.containers}>
                    <FlatList
                        data={this.state.list}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        onRefresh={() => this._refresh()}
                        refreshing={this.state.isLoading}
                        onEndReached={() => {
                            this._refresh();
                        }}
                        renderItem={({ item, index }) => this.renderList(item, index)}
                        keyExtractor={(item, index) => index.toString() + '' + new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString()}
                    />
                </View>
            </View>
        )
    }
    showLoading() {
        if (this.state.isLoading) {
            return (
                <Loading></Loading>
            )
        }

    }
    componentDidMount() {
        this.getFollowerDetail();
    }

    getFollowerDetail() {
        let list = [];
        let path = "follow/" + firebase.auth().currentUser.uid;
        try {
            firebase.database()
                .ref(path)
                .orderByChild('createAt').once('value').then((snapshot) => {
                    Object.values(snapshot.val()).map((obj, index) => {
                        list.push(obj);
                    });
                    console.log('snapshot>>>> ', list);
                    this.setState({
                        isLoading: false,
                        list: list
                    })
                }).catch((error) => {
                    console.log('error>>>> ', error);
                });
        } catch (error) {
            console.log('error>>>> ', error);
        }
    }
}