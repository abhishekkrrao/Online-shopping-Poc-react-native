import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './style'
export default class OtpPage extends Component {
    constructor(props) {
        super(props)
    }
    state = {}
    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>

                
                <View style={styles.otpView}>
                    <View style={styles.card}>
                        <View style={styles.otpContainer}>
                            <View style={styles.subotpContainer}>
                                <Text style={styles.textNum}>{"1"}</Text>
                            </View>
                            <View style={styles.subotpContainer}>
                                <Text style={styles.textNum}>{"2"}</Text>
                            </View>
                            <View style={styles.subotpContainer}>
                                <Text style={styles.textNum}>{"3"}</Text>
                            </View>
                        </View>

                        <View style={styles.otpContainer}>
                            <View style={styles.subotpContainer}>
                                <Text style={styles.textNum}>{"4"}</Text>
                            </View>
                            <View style={styles.subotpContainer}>
                                <Text style={styles.textNum}>{"5"}</Text>
                            </View>
                            <View style={styles.subotpContainer}>
                                <Text style={styles.textNum}>{"6"}</Text>
                            </View>
                        </View>


                        <View style={styles.otpContainer}>
                            <View style={styles.subotpContainer}>
                                <Text style={styles.textNum}>{"7"}</Text>
                            </View>
                            <View style={styles.subotpContainer}>
                                <Text style={styles.textNum}>{"8"}</Text>
                            </View>
                            <View style={styles.subotpContainer}>
                                <Text style={styles.textNum}>{"9"}</Text>
                            </View>
                        </View>


                        <View style={styles.otpContainer}>
                            <View style={styles.subotpContainer}>
                                <Text style={styles.textNum}>{""}</Text>
                            </View>
                            <View style={styles.subotpContainer}>
                                <Text style={styles.textNum}>{"0"}</Text>
                            </View>
                            <View style={styles.subotpContainer}>
                                <Text style={styles.textNum}>{"*"}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}