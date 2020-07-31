import React, { Component } from "react";
import { View, Text, FlatList, Image, TouchableHighlight, Button, ToastAndroid } from "react-native";
import firebase from 'react-native-firebase'
import Loading from '../../loader/Loading'
import Headers from '../../Componets/HeaderView'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconNew from 'react-native-vector-icons/MaterialIcons'
import Share from 'react-native-share';
import styles from './style'
import { SliderBox } from 'react-native-image-slider-box';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      dataSource: [],
      uid:""
    };
  }
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
  loadData(number) {
    let list = [];
    let self = this;
    firebase.database()
      .ref('addProduct/')
      .orderByChild('createdAt')
      .limitToLast(number)
      .on('child_added', function (snapshot) {
        let a = Object.keys(snapshot.val());
        Object.values(snapshot.val()).map((response, index) => {
          response.key = a[index];
          list.push(response);
        });
        console.log('listOlcab ', list);
        self.setState({
          isLoading: false,
          dataSource: list
        });
      });
  }

  componentDidMount() {
    Icon.loadFont().then(() => { }).catch(() => { });
    this.loadData(5);
    let user = firebase.auth().currentUser;
    if(user){
      this.setState({
        uid:user.uid
      })
    }
   
  }
  _addDataToList(data) {
    console.log('push notification data ', data);
  }


  getList(number) {
    const arrayList = [];
    return new Promise((resolve, reject) => {
      try {
        firebase.database()
          .ref('addProduct/')
          .limitToFirst(number)
          .once('child_added').then(function (snapshot) {
            Object.values(snapshot.val()).map(async (o1) => {
              let a = Object.keys(o1);
              await Object.values(o1).map(async (o2, index) => {
                // console.log('o2222>>>> ', o2);
                o2.key = a[index];
                await arrayList.push(o2);
              });
              resolve(arrayList.reverse());
            });
          }, function error(error) {
            reject(error);
          }, this);
      } catch (error) {
        console.log('error>>>> ', error);
      }
    });
  }

  payNow() {
    ToastAndroid.show("Likes done!", ToastAndroid.LONG);
    console.log('paynow called');
    // RNUpiPayment.initializePayment({
    //   vpa: 'john@upi', // or can be john@ybl or mobileNo@upi
    //   payeeName: 'John Doe',
    //   amount: '1',
    //   transactionRef: 'aasf-332-aoei-fn'
    // }, function successCallback(data) {
    //   console.log('datadata >>> ', data);
    //   // do whatever with the data
    // }, function failureCallback(data) {
    //   console.log('datadata >>> ', data);
    //   // do whatever with the data
    // });
  }

  _refresh() {
    // console.log('i am called on bottom load more button ...');
    //  this.fetchList(5);

    // this.loadData(this.state.dataSource.length + 1);
    //  this.loadData(this.state.dataSource.length + 1);
  }

  shareApp(url) {
    let options = {
      title: 'Hi',
      url: url,
      message: 'This is only for testing the app.',
      filename: url,
      saveToFiles: true,
      urls: [url]
    }
    Share.open(options)
      .then((res) => { console.log(res) })
      .catch((err) => { err && console.log(err); });
  }

  closeApp() {
    this.props.navigation.goBack();
  }

  likeIt(item,index) {

    console.log('item>>>>>>>> ', item);


    let path = 'addProduct/' + item.uid + '/' + item.key + '/likes/' + firebase.auth().currentUser.uid;
    console.log('path>>>>>>>> ', path);
    ToastAndroid.show("Liked!", ToastAndroid.LONG);


    // if(item.likes.uid == this.state.uid){

    // }else{

    // }

   // let updates;
    //this.state.dataSource[index].isLike = true;


    // if (item.likes) {
    //   console.log('item.isLike ', item.likes);
    //   let a = Object.values(item.likes);
    //   console.log('item.aaa ', a[0]);
    //   let obj = a[0];

    //   if (obj.isLike) {
    //     updates = {
    //       uid: firebase.auth().currentUser.uid,
    //       isLike: false
    //     }
    //   } else {
    //     updates = {
    //       uid: firebase.auth().currentUser.uid,
    //       isLike: true
    //     }
    //   }
    // } else {
    //   updates = {
    //     uid: firebase.auth().currentUser.uid,
    //     isLike: true
    //   }
    // }

    // firebase.database().ref(path).update(updates).then((response) => {
    //   console.log('isLiked ', response);
    // });

  }
  render() {
    if (this.state.isLoading == true) {
      return (
        <View style={styles.MainContainer}>
          <Headers title="E-shop" style={styles.headerContainer}></Headers>
          <Loading></Loading>
        </View>
      )
    } else {
      return (
        <View style={styles.MainContainer}>
          <Headers title="E-shop" style={styles.headerContainer}></Headers>
          <FlatList
            data={this.state.dataSource}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            onRefresh={() => this._refresh()}
            refreshing={this.state.isLoading}
            onEndReachedThreshold={5}
            onEndReached={() => {
              this._refresh();
            }}
            renderItem={({ item,index }) => this.addIcons(item,index)}
            keyExtractor={(item, index) => index.toString() + '' + new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString()}
          />
        </View>
      );
    }
  }

  getName(name) {
    if (name != null && name != undefined && typeof (name) != "undefined") {
      return name.substring(0, name.lastIndexOf("@"));
    } else {
      return ""
    }
  }
  renderMenu() {
    return (
      <View style={{ alignItems: "flex-end", alignSelf: "flex-end", marginEnd: 10, paddingTop: 0, position: "absolute", right: 15 }}>
        <Menu
          ref={this.setMenuRef}
          button={<IconNew onPress={() => this.showMenu()} type="material" name="more-vert" size={35} color="#000" />}
        >
          <MenuItem onPress={() => { }}>{" Delete Item "}</MenuItem>
        </Menu>
      </View>
    );
  }
  addIcons(item,index) {
    const br = `\n`;
    return (
      <View style={styles.custom_view}>
        <View
          onPress={() => { this.openUserProfilePage(item) }}
          style={{ flex: 1, flexDirection: 'row', padding: 5, marginTop: 5, width: '95%', marginLeft: '.5%' }}>
          <TouchableHighlight
            onPress={() => { this.openUserProfilePage(item) }}
            style={{
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }} >
            <Image source={{ uri: item.avatarSource }} style={{ width: 50, height: 50, borderRadius: 30, flex: 1 }} />
          </TouchableHighlight>
          <View
            onPress={() => { this.openUserProfilePage(item) }}
            style={{ alignItems: 'flex-start', justifyContent: 'flex-start', width: "70%" }}>
            <Text onPress={() => { this.openUserProfilePage(item) }} style={{ fontFamily: "Montserrat-Medium", paddingStart: 5 }}>
              {this.getName(item.email)}
            </Text>
            <Text onPress={() => { this.openUserProfilePage(item) }} style={{ fontFamily: "Montserrat-Medium", padding: 5 }}>
              {item.email}
            </Text>

          </View>


          <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', width: "25%", alignSelf: "flex-end" }}>
            {this.renderMenu()}
          </View>
        </View>


        <SliderBox
          images={item.imageList}
          sliderBoxHeight={350}
          ImageComponentStyle={{ width: "100%", marginStart: 0, margin: 0, padding: 0 }}
          onCurrentImagePressed={() => { this.props.navigation.navigate('Details', { item: item }); }}
          dotColor="#FFEE58"
          inactiveDotColor="#90A4AE"
          paginationBoxVerticalPadding={20}
          circleLoop />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={styles.textView} > {item.productName}  </Text>
          <Text style={styles.textView} >  {'₹'} {item.productPrice} </Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={styles.textView} >{item.productDesc}</Text>
        </View>
        <View style={{ flex: 2, flexDirection: 'row', width: "100%" }}>
          <View style={{ flex: 1, flexDirection: 'row', width: "50%", alignSelf: "flex-start", alignContent: "flex-start", alignItems: "flex-start" }}>
            <View style={{ padding: 10 }}>
              <Icon onPress={() => this.gotoCommentPage(item)} name="comment-o" size={24} color="#ccc" />
            </View>
            <View style={{ padding: 10 }}>
              <Icon onPress={() => this.shareApp(item.productPic)} name="mail-reply" size={24} color="#ccc" />
            </View>
            <View style={{ padding: 10 }}>
              <Icon name="bookmark-o" size={24} color="#ccc" />
            </View>
            <View style={{ padding: 10 }}>
              {this.displayIcon(item,index)}
              {/* <Icon onPress={() => console.log('')} name="heart" size={24} color="#D84315" /> */}
            </View>
          </View>
          <View style={{  alignContent: "flex-end", alignItems: "flex-end" }}>
            <Text onPressIn={() => this.payNow()} style={styles.cust_buy_b1}> {"BUY"}</Text>
          </View>
        </View>
      </View>
    )
  }

  openUserProfilePage(item) {
    this.props.navigation.navigate('ClientProfilePage', { item: item })
  }
  displayIcon(item,index) {


    console.log('item ',item);

    if (item.likes) {
      let a = Object.values(item.likes);
      let obj = a[0];
      if (obj.isLike && item.uid == obj.uid) {
        return <Icon onPress={() => this.likeIt(item,index)} name="heart" size={24} color="#D84315" />
      } else {
        return <Icon onPress={() => this.likeIt(item,index)} name="heart-o" size={24} color="#ccc" />;
      }
    } else {
      return <Icon onPress={() => this.likeIt(item,index)} name="heart-o" size={24} color="#ccc" />;
    }
  }
  gotoCommentPage(item) {
    this.props.navigation.navigate('Comment', { item: item })
  }
}