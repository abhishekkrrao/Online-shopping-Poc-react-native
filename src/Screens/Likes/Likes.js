import React, { Component } from 'react';
import { Text, View, FlatList, Image, TouchableHighlight } from 'react-native';
import styles from './style'
import firebase from 'react-native-firebase'
import Headers from '../../Componets/HeaderView'
export default class Like extends Component {
  constructor(props) {
    super(props)
    //this.deatilPage = this.deatilPage.bind(this);
  }
  state = { dataSource: [], isLoading: false }
  componentDidMount() {
    // const receivedValue = this.props.data;
    this.loadData(5);
  }
  deatilPage(item) {
    this.props.navigation.navigate('Details', { item: item });
  }
  loadData(number) {
    this.setState({ isLoading: true });
    let list = [];
    let self = this;
    firebase.database().ref('addProduct/')
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
  render() {
    return (
      <View style={styles.container}>
        <Headers title="Likes" style={styles.headerContainer}></Headers>
        <FlatList
          data={this.state.dataSource}
          numColumns={3}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <TouchableHighlight onPressIn={() => { this.deatilPage(item) }} style={styles.itemContainer}>
                <Image style={styles.imageThumbnail} source={{ uri: item.productPic }} />
              </TouchableHighlight>
            </View>
          )}
          keyExtractor={(item, index) => index.toString() + '' + new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString()}
        />
      </View>
    );
  }
}