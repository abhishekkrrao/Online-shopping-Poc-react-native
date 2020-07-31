import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import styles from './style'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/AntDesign'
import Header from '../../Componets/HeaderView'
import { SliderBox } from 'react-native-image-slider-box';
export default class Details extends Component {
  constructor(props) {
    super(props)

    this.state = {
      liked: false
    }

    this.lastPress = 0
  }
  handleLargeAnimatedIconRef = (ref) => {
    this.largeAnimatedIcon = ref
  }
  handleSmallAnimatedIconRef = (ref) => {
    this.smallAnimatedIcon = ref
  }
  animateIcon = () => {
    const { liked } = this.state
    this.largeAnimatedIcon.stopAnimation();
    if (liked) {
      this.largeAnimatedIcon.bounceIn()
        .then(() => this.largeAnimatedIcon.bounceOut())
      this.smallAnimatedIcon.pulse(200)
    } else {
      this.largeAnimatedIcon.bounceIn()
        .then(() => {
          this.largeAnimatedIcon.bounceOut()
          this.smallAnimatedIcon.bounceIn()
        })
        .then(() => {
          if (!liked) {
            this.setState(prevState => ({ liked: !prevState.liked }))
          }
        })
    }
  }
  handleOnPress = () => {
    const time = new Date().getTime()
    const delta = time - this.lastPress
    const doublePressDelay = 400
    if (delta < doublePressDelay) {
      this.animateIcon()
    }
    this.lastPress = time
  }
  handleOnPressLike = () => {
    this.smallAnimatedIcon.bounceIn();
    this.setState(prevState => ({ liked: !prevState.liked }))
  }
  openUserProfilePage(item) {

  }
  getName(email) {
    if (email) {
      return email.substring(0, email.lastIndexOf("@"));
    } else {
      return "";
    }
  }
  render() {
    const receivedValue = this.props.navigation.getParam('item', () => { });
    console.log('receivedValue ', receivedValue);
    const { liked } = this.state
    const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

    return (
      <View style={styles.containers}>
        <Header title="Detail" style={styles.headerContainer} />
        <View
          onPress={() => { this.openUserProfilePage(receivedValue) }}
          style={{ flexDirection: 'row', width: '90%', padding: 5 }}>
          <TouchableHighlight
            onPress={() => { this.openUserProfilePage(receivedValue) }}
            style={{
              alignItems: 'flex-start',
              justifyContent: 'flex-start'
            }} >
            <Image source={{ uri: receivedValue.avatarSource }} style={{ width: 50, height: 50, borderRadius: 50 }} />
          </TouchableHighlight>
          <View
            onPress={() => { this.openUserProfilePage(receivedValue) }}
            style={{
              alignItems: 'flex-start', justifyContent: 'flex-start',
              width: "70%", paddingStart: 10
            }}>
            <Text onPress={() => { this.openUserProfilePage(receivedValue) }}
              style={{
                fontFamily: "Montserrat-Medium", paddingStart: 5,
                fontSize: 18, fontWeight: "bold"
              }}>
              {this.getName(receivedValue.email)}
            </Text>
            <Text onPress={() => { this.openUserProfilePage(receivedValue) }}
              style={{ fontFamily: "Montserrat-Medium", padding: 5, color: "#515151" }}>
              {receivedValue.email}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', width: "25%", alignSelf: "flex-end" }}>
            {}
          </View>
        </View>




        <TouchableOpacity
          activeOpacity={1}
          style={styles.card}
          onPress={this.handleOnPress}
        >
          <AnimatedIcon
            ref={this.handleLargeAnimatedIconRef}
            name="heart"
            color="#fff"
            size={80}
            style={styles.animatedIcon}
            duration={500}
            delay={200}
          />
          <SliderBox
            images={receivedValue.imageList}
            sliderBoxHeight={350}
            ImageComponentStyle={{ width: "100%" }}
            dotColor="#FFEE58"
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={20}
            circleLoop />


          <View style={styles.photoDescriptionContainer}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={this.handleOnPressLike}>
              <AnimatedIcon
                ref={this.handleSmallAnimatedIconRef}
                name={liked ? 'heart' : 'hearto'}
                color={liked ? "#e92f3c" : "#515151"}
                size={18}
                style={styles.icon}
              />
            </TouchableOpacity>
            <View style={styles.polaroidTextContainer}>

              <Text style={[styles.text, styles.textPhotographer]}>
                {receivedValue.productDesc}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}