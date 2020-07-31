import React from 'react'
import { Text, TextInput, View, Button, TouchableHighlight, Image, ScrollView, Picker } from 'react-native'
import styles from './style'
import firebase from 'react-native-firebase'
import ImagePicker from 'react-native-image-crop-picker';
import Headers from '../../Componets/HeaderView'
import Loading from '../../loader/Loading'
export default class addproduct extends React.Component {
    state = { size: "", createdAt: new Date().getTime(), 
    email: firebase.auth().currentUser.email, avatarSource: "", 
    uid: firebase.auth().currentUser.uid, isLoading: false, productName: '',
     productDesc: '',
     productPic: "https://bootdey.com/img/Content/avatar/avatar6.png", imageList: [],
      productPrice: '', productType: '', productSubType: '', isPicUpload: false }
    addProduct() {
        console.log('state ', this.state.productPrice);
        this.saveProduct(this.state);
    }
    showLoading() {
        if (this.state.isPicUpload) {
            return (
                <Loading></Loading>
            )
        }
    }

    pickImage() {
        try {
            return new Promise((resolve, reject) => {
                ImagePicker.openPicker({
                    width: 300,
                    height: 300,
                    cropping: false,
                    multiple: true,
                    maxFiles:4
                }).then(image => {
                    resolve(image);
                }).catch((error) => {
                    this.setState({
                        isLoading: false
                    })
                    console.log(error);
                    reject(error);
                });
            });
        } catch (error) {

        }
    }

  
    componentDidMount() {
        this.getUserDetails().then((profilePic) => {
            console.log('snapshotprofilePic>> ', profilePic);
        }).catch((error) => {
            console.log('error>>> ', error);
        });
    }
    getUserDetails() {
        return new Promise((resolve, reject) => {
            let path = 'Users/' + firebase.auth().currentUser.uid;
            console.log('pathpath>>> ', path);
            var ref = firebase.database().ref(path);
            ref.once('value').then(snapshot => {
                console.log('profilePic ', snapshot.val().profilePic);
                this.setState({
                    avatarSource: snapshot.val().profilePic,
                })
                resolve(snapshot.val().profilePic)
            }).catch((error) => {
                reject(error)
            });
        })
    }


    saveProduct() {
        console.log('isPicUpload', this.state.isPicUpload)
        console.log('getTime', new Date().getTime());
        const userId = firebase.auth().currentUser.uid;
        if (this.state.isPicUpload) {
            // firebase.database().ref('addProduct/' + new Date().getTime()).set(this.state).then((result) => { this.props.navigation.navigate('Home');console.log('result', result); this.updateState(); }).catch((error) => { console.log('error', error) });
            firebase.database().ref('addProduct/' + userId).push(this.state).then((result) => {
                this.props.navigation.navigate('Home');
                console.log('result ', result);
                // let olacab = `${result}`;
                // let array = [];
                // array = olacab.split('/');

                this.state.productDesc = ''
                this.state.productPic = 'https://bootdey.com/img/Content/avatar/avatar6.png'
                this.state.productPrice = ''
                this.state.productType = ''
                this.state.productSubType = ''
                this.state.isPicUpload = false;
                this.setState({
                    isLoading: false
                });
            }).catch((error) => {
                console.log('error', error);
            });
        } else {
            //alert('Please add a picture')
        }
    }
    uploadProductPic() {
        return new Promise((resolve, reject) => {
            this.pickImage().then((image) => {
                console.log('imageimageimage ', image);

                let a = [];
                image.map((obj, index) => {
                    let uploadUri = decodeURI(obj.path)
                    console.log('uploadUri>>> ', uploadUri);
                    const userId = firebase.auth().currentUser.uid;
                    console.log('userId>>> ', userId);
                    const ref = firebase.storage().ref(`images/${new Date().getTime()}`).child(userId);
                    console.log('ref>>> ', ref);
                    ref.putFile(uploadUri).on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
                        if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                            console.log('snapshot.downloadURL ', snapshot.downloadURL);
                            a.push(snapshot.downloadURL);
                        }
                        if (image.length - 1 == index) {
                            resolve(a);
                            this.setState({
                                imageList: a,
                                productPic: a[0],
                                isPicUpload: true
                            });
                        }
                    });

                });

            });
        })
    }


    sizePicker() {
        return (
            <Picker
                selectedValue={this.state.size}
                style={{ height: 50,width: "40%", justifyContent: "flex-end", fontFamily: "Montserrat-Medium" }}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({ size: itemValue })
                }>
                <Picker.Item style={{ fontFamily: "Montserrat-Medium" }} label="S" value="S" />
                <Picker.Item style={{ fontFamily: "Montserrat-Medium" }} label="M" value="M" />
                <Picker.Item style={{ fontFamily: "Montserrat-Medium" }} label="L" value="L" />
                <Picker.Item style={{ fontFamily: "Montserrat-Medium" }} label="XL" value="xl" />
                <Picker.Item style={{ fontFamily: "Montserrat-Medium" }} label="XXL" value="xxl" />
            </Picker>
        )
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <Headers title="Set up your shop " style={styles.headerContainer}></Headers>
                <ScrollView
                    style={{ width: "100%", flex: 1, height: "100%", marginBottom: 20 }}
                    alwaysBounceVertical={true}>
                    <View style={styles.container}>
                        <Text style={styles.heading_text}> {"Product Name"} </Text>
                        <TextInput
                            style={styles.textInput}
                            autoCapitalize="none"
                            placeholder="Product Name"
                            onChangeText={productName => this.setState({ productName })}
                            value={this.state.productName}
                            returnKeyType={"next"}
                            onSubmitEditing={() => { this.productDesc.focus(); }}
                        />
                        <Text style={styles.heading_text}> {"Product Description"} </Text>
                        <TextInput
                            ref={(input) => { this.productDesc = input; }}
                            returnKeyType={"next"}
                            onSubmitEditing={() => { this.productPrice.focus(); }}
                            style={styles.textInputMultiple}
                            autoCapitalize="none"
                            placeholder="Product Desc"
                            multiline={true}
                            onChangeText={productDesc => this.setState({ productDesc })}
                            value={this.state.productDesc}
                        />
                        <Text style={styles.heading_text}> {"Product Price"} </Text>
                        <TextInput
                            ref={(input) => { this.productPrice = input; }}
                            style={styles.textInput}
                            autoCapitalize="none"
                            placeholder="Product Price"
                            maxLength={6}
                            keyboardType='numeric'
                            autoCompleteType='tel'
                            onSubmitEditing={() => { this.productType.focus(); }}
                            onChangeText={productPrice => this.setState({ productPrice })}
                            value={this.state.productPrice}
                        />
                        <Text style={styles.heading_text}> {"Product Type"} </Text>
                        <TextInput
                            ref={(input) => { this.productType = input; }}
                            style={styles.textInput}
                            autoCapitalize="none"
                            placeholder="Product Type"
                            onSubmitEditing={() => { this.productSubType.focus(); }}
                            onChangeText={productType => this.setState({ productType })}
                            value={this.state.productType}
                        />
                        {this.showLoading()}
                        <Text style={styles.heading_text}> {"Product Sub-Type"} </Text>
                        <TextInput
                            ref={(input) => { this.productSubType = input; }}
                            style={styles.textInput}
                            autoCapitalize="none"
                            placeholder="Product Sub-Type"
                            onChangeText={productSubType => this.setState({ productSubType })}
                            value={this.state.productSubType}
                        />
                        <View style={styles.size_view}>
                            <Text style={styles.size_view_text}> {"Size"} </Text>
                            {this.sizePicker()}
                        </View>
                        <View style={styles.text_View}>
                            <TouchableHighlight style={styles.touch_v1} onPress={() => this.uploadProductPic()}>
                                <Image style={styles.touch_v1} source={{ uri: this.state.productPic }} />
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => this.saveProduct()} style={styles.image_v2}>
                                <Text style={styles.t1}>{"Publish"}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}