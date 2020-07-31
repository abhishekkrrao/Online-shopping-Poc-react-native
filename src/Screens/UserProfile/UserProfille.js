import React, { Component } from 'react';
import { TouchableHighlight, Text, View, Image, ScrollView, Dimensions, FlatList, } from 'react-native';
import Headers from '../../Componets/HeaderView'
import firebase from 'react-native-firebase'
import ImagePicker from 'react-native-image-crop-picker';
import Dialog from "react-native-dialog";
import Loading from '../../loader/Loading'
import styles from './style'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Likes from '../Likes/Likes'
import Saved from '../Saved/Saved'

export default class UserProfile extends React.Component {

  _menu = null;
  setMenuRef = ref => {
    this._menu = ref;
  };
  hideMenu = () => {
    this._menu.hide();
  };
  showMenu = () => {
    this._menu.show();
  };
  state = {
    email: '',
    uid: '',
    avatarSource: 'https://bootdey.com/img/Content/avatar/avatar6.png',
    isLoading: false,
    firstName: "",
    lastName: "",
    mobile: "",
    list: [],
    index: 0,
    routes: [
      { key: 'first', title: 'Likes' },
      { key: 'second', title: 'Saved' },
    ],
    listLength: 0,
    following: 0
  }

  showLoading() {
    if (this.state.isLoading == true) {
      return (
        <Loading></Loading>
      )
    }
  }
  renderChildElement = () => {
    if (this.state.list.length > 0) {
      return (
        <View style={{ flex: 1, width: '100%', paddingBottom: 10, backgroundColor: "#fff" }}>
          <Text style={{ fontSize: 21, fontFamily: "boldme", padding: 5, textTransform: "none" }}>{'Likes'}</Text>
          <ScrollView
            style={{ flex: 1, width: '100%' }}
            horizontal={true}
            decelerationRate={0}
            snapToInterval={150} //your element width
            snapToAlignment={"center"}
            scrollEnabled={true}>{
              this.state.list.map((item) => {
                return this.renderRow(item)
              })
            }
          </ScrollView>
        </View>
      )
    } else {
      return (
        <View style={styles.norecordView}>
          <Text style={styles.norecord}>{'Record Not Found !'}</Text>
        </View>
      );
    }
  }

  openAlert() {
    return (
      <Dialog.Container>
        <Dialog.Title>{"Select Image"}</Dialog.Title>
        {/* <Dialog.Description>
            Do you want to delete this account? You cannot undo this action.
          </Dialog.Description> */}
        <Dialog.Button label="Camera" onPress={this.getImageFromCamera()} />
        <Dialog.Button label="Gallary" onPress={this.getImageFromGallery()} />
      </Dialog.Container>
    );
  }
  getImageFromCamera() {
    return new Promise((resolve) => {
      ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: false
      }).then(image => {
        console.log(image);

        this.setState({
          avatarSource: image.path
        });
        resolve(image.path);
      }).catch((error) => {
        console.log(error);
      });

    });
  }
  getImageFromGallery() {
    return new Promise((resolve) => {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: false
      }).then(image => {
        this.setState({
          avatarSource: image.path
        });
        resolve(image.path);
      });
    });
  }

  pickImage() {
    return new Promise((resolve, reject) => {
      try {
        ImagePicker.openPicker({
          width: 150,
          height: 150,
          cropping: false
        }).then(image => {

          console.log('image.path ', image.path);
          this.setState({
            avatarSource: image.path
          });
          resolve(image.path);
        }).catch((error) => {
          this.setState({
            isLoading: false
          })
          console.log(error);
          reject(error);
        });

      } catch (error) {

      }
    });
  }

  updateSingleData(profilePic) {
    firebase.database().ref('Users/' + this.state.uid).update({
      profilePic,
    });
  }
  uploadProfilePic() {
    return new Promise(() => {
      this.pickImage().then(() => {
        let uploadUri = decodeURI(this.state.avatarSource)
        // console.log('uploadUri>>> ', uploadUri);
        const userId = firebase.auth().currentUser.uid;
        // console.log('userId>>> ', userId);
        const ref = firebase.storage().ref(`images/${userId}`).child(userId);
        //console.log('ref>>> ', ref);
        ref.putFile(uploadUri).on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            // console.log('snapshot.downloadURL ', snapshot.downloadURL);
            this.updateSingleData(snapshot.downloadURL);
            this.setState({
              isLoading: false
            })
          }
        });
      }).catch((error) => {
        console.log('error>>> ', error);
      });
    })
  }
  uploadImage() {
    try {
      this.setState({
        isLoading: true
      })
      this.uploadProfilePic().then((path) => {
        console.log(path);
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  };


  componentDidMount() {
    this.getUserProductList().then((list) => {
      console.log('list>>>> ', list.length);
      this.setState({
        list: list
      });
      // this.state.list = list;
    }).catch((error) => {
      console.log('error1>>> ', error);
    });
    this.getCurrentUser();
    this.getFollowerDetail();
    this.getFollowingDetail();
  }
  getCurrentUser() {
    let user = firebase.auth().currentUser;
    //console.log('useruser>> ', user.email);
    this.setState({
      email: user.email,
      uid: user.uid,
      isLoading: true
    });
    this.getUserDetails();
  }
  getUserDetails() {
    let path = 'Users/' + firebase.auth().currentUser.uid;
    // console.log('pathpath>>> ', path);
    var ref = firebase.database().ref(path);
    ref.once('value').then(snapshot => {
      console.log('profilePic ', snapshot.val().profilePic);
      this.setState({
        avatarSource: snapshot.val().profilePic,
        mobile: snapshot.val().Mobile,
        firstName: snapshot.val().firstName,
        lastName: snapshot.val().lastName,
        email: snapshot.val().email,
        isLoading: false
      })
    });
  }
  getUserProductList() {
    const arrayList = [];
    return new Promise((resolve, reject) => {
      try {
        firebase.database().ref('/addProduct/').once('value').then(function (snapshot) {
          Object.values(snapshot.val()).map(async (o1) => {
            let a = Object.keys(o1);
            await Object.values(o1).map(async (o2, index) => {
              o2.key = a[index];
              await arrayList.push(o2);
            });
            resolve(arrayList.reverse());
          });
        }, function error(error) {
          reject(error);
        });
      } catch (error) {
        console.log('error2>>>> ', error);
      }
    });
  }
  closeApp() {
    firebase.auth().signOut();
  }

  renderChildElementAll = () => {

    console.log('state ', this.state);
    console.log('list ', this.state.list);

    if (this.state.list.length > 0) {
      return (
        <View style={{ flex: 1, width: '100%', height: "100%", backgroundColor: "#fff", justifyContent: "center", alignItems: "center", alignItems: "center" }}>

          <ScrollView
            style={{ flex: 1, width: '100%' }}
            horizontal={true}
            decelerationRate={0}
            snapToInterval={150} //your element width
            snapToAlignment={"center"}
            scrollEnabled={true}>{
              this.state.list.map((item) => {
                return this.renderRow(item)
              })
            }
          </ScrollView>

          <FlatList
            data={this.state.list}
            renderItem={({ item }) => (
              <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                <Image style={styles.imageThumbnail} source={{ uri: item.productPic }} />
              </View>
            )}
            numColumns={3}
            keyExtractor={(item, index) => index.toString() + '' + new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString()}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.norecordView}>
          <Text style={styles.norecord}>{'Record not found !'}</Text>
        </View>
      );
    }
  }
  openPage(item) {
    console.log('modalpage_item ', item);
  }
  renderRow(item) {
    // console.log('productPic ', item.productPic)
    return (
      <View style={{
        borderRadius: 5,
        margin: 5,
        width: 150,
        height: 150,
        flex: 1
      }}>
        <View style={{ width: 150, height: 150 }}>
          <TouchableHighlight style={{ padding: 5 }} >
            <Image source={{ uri: item.productPic }} style={{ width: 150, height: 150, borderRadius: 5 }} />
          </TouchableHighlight>
        </View>
      </View>
    )
  }
  renderMenu() {
    return (
      <View style={{ alignItems: "flex-end", alignSelf: "flex-end", marginEnd: 10, height: 75, width: 75, paddingTop: 15 }}>
        <Menu
          ref={this.setMenuRef}
          button={<Icon onPress={() => this.showMenu()} type="material" name="more-vert" size={35} color="#000" />}
        >
          {/* <MenuItem onPress={() => console.log('')}>Log Out</MenuItem>
                <MenuDivider /> */}
          <MenuItem onPress={() => this.closeApp()}>{"Log Out"}</MenuItem>
        </Menu>
      </View>
    );
  }

  gotoShowAllLikes() {
    this.props.navigation.navigate('Like')
  }
  gotoShowAllSaved() {
    this.props.navigation.navigate('Saved')
  }
  render() {
    return (
      <View style={styles.container}>
        <Headers title="Profile" style={styles.headerContainer} rightButtonComponent={this.renderMenu()}></Headers>
        <ScrollView
          style={{ flex: 1, width: '100%', marginBottom: 10 }}
          horizontal={false}
        >

          <View style={styles.header}>
            <View style={styles.headerContent}>
              <TouchableHighlight onPress={() => this.uploadImage()} style={styles.avatar1} >
                <Image style={styles.avatar}
                  source={{ uri: this.state.avatarSource }} />
              </TouchableHighlight>
            </View>

            <View style={styles.right_container}>
              <Text style={styles.name}>{this.state.firstName}{'-'}{this.state.lastName} </Text>
              <Text style={styles.userInfo}>{this.state.email} </Text>
              <View style={{ flex: 1, flexDirection: "row" }}>
                {this.renderFollowButton()}
              </View>
            </View>

          </View>


          <View style={styles.item}>
            {this.showLoading()}
          </View>

          <View style={styles.container}>
            <View style={{ flexDirection: "row", width: "100%", flex: 2 }}>
              <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 24, width: 200, flex: 1 }}> {"Your Likes"} </Text>
              <Text onPress={()=>{ this.gotoShowAllLikes() }} style={styles.text_v}> {"Show all"} </Text>
            </View>
            {this.showLikes()}
            <View style={{ flexDirection: "row", width: "100%", flex: 2 }}>
              <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 24, width: 200, flex: 1 }}> {"Your Saved"} </Text>
              <Text onPress={()=>{ this.gotoShowAllSaved() }} style={styles.text_v}> {"Show all"} </Text>
            </View>
            {this.showLikes()}
          </View>
        </ScrollView>
      </View>
    );
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
  renderFollowButton() {
    //#FFD600
    return (<View style={{ flex: 1, flexDirection: "row", paddingTop: 10, width: "100%" }}>
      <Text onPress={() => { this.gotoFollowing(); }} style={styles.followText}>{this.state.listLength} {" Following"} </Text>
      <Text onPress={() => { this.gotoFollowers(); }} style={styles.followText}> {this.state.following} {" Followers"} </Text>
    </View>
    )
  }
  gotoFollowers() {
    this.props.navigation.navigate('FollowersPage');
  }
  gotoFollowing() {
    this.props.navigation.navigate('FollowingPage');
  }
  renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <Likes navigation={this.props.navigation} data={this.state.list} />; // passing data as data prop
      case 'second':
        return <Saved navigation={this.props.navigation} data={this.state.list} />;
      default:
        return null;
    }
  };


  showTabView() {
    if (this.state.list.length > 0) {
      return (
        <TabView
          navigationState={this.state}
          renderScene={this.renderScene}
          onIndexChange={index => this.setState({
            index
          })}
          swipeEnabled={true}
          initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
          style={{ elevation: 0, borderWidth: 0 }}
          renderTabBar={props =>
            <TabBar
              {...props}
              labelStyle={{ color: "#000" }}
              indicatorContainerStyle={{ color: "#000", backgroundColor: "#000", elevation: 0, borderWidth: 0 }}
              indicatorStyle={{ color: "#ccc", backgroundColor: "#000", elevation: 0, borderWidth: 0 }}
              contentContainerStyle={{ borderBottomWidth: 0, color: "#000", backgroundColor: "#000", elevation: 0, borderWidth: 0 }}
              tabStyle={{ backgroundColor: "#fff", elevation: 0, color: "#000", borderWidth: 0, fontFamily: "Montserrat-Medium", textTransform: "none", fontSize: "18" }}
            />
          }
        />
      );
    }
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
            listLength: list.length
          })
        }).catch((error) => {
          console.log('error>>>> ', error);
        });
    } catch (error) {
      console.log('error>>>> ', error);
    }
  }
  getFollowingDetail() {
    let list = [];
    let path = "following/" + firebase.auth().currentUser.uid;
    try {
      firebase.database()
        .ref(path)
        .orderByChild('createAt').once('value').then((snapshot) => {
          Object.values(snapshot.val()).map((obj, index) => {
            list.push(obj);
          });
          console.log('snapshot>>>> ', list);
          this.setState({
            following: list.length
          })
        }).catch((error) => {
          console.log('error>>>> ', error);
        });
    } catch (error) {
      console.log('error>>>> ', error);
    }
  }
}
