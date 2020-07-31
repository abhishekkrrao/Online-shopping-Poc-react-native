import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import assets from '../assets/assets.js'
import { styles as commonStyles, dimensions, colors } from '../Res'

const Header = ({ title, navigation, style, rightButtonComponent }) => (
    <View style={[styles.headerView, style]}>
        <TouchableOpacity style={styles.backButtonView} onPress={() => navigation.goBack()}>
            {getBackIconInApp(title)}
        </TouchableOpacity>
        {rightButtonComponent && <View style={styles.rightButtonView}>{rightButtonComponent}</View>}
        {getBackTitleInApp(title, style)}
    </View>
)
function getBackIconInApp(title) {
    if (title != 'E-shop') {
        return (<Image source={assets.banners.back} resizeMode='contain' style={styles.backIcon} />);
    }
}

function getBackTitleInApp(title, style) {
    if (title != 'E-shop') {
        return (<Text style={[styles.headerTitleText, style]}>{title}</Text>);
    } else {
        return (<Text style={[styles.headerTitleTexts, style]}>{title}</Text>);
    }
}

const styles = StyleSheet.create({
    headerView: {
        height: dimensions.headerHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#ccc",
        ...commonStyles.shadowBottom,
        zIndex: 1
    },
    headerTitleTexts: {
        backgroundColor: "#ccc", fontFamily: "boldme", fontSize: 28, fontWeight: "900"
    }, headerTitleText: {
        fontSize: 21,
        fontWeight: '600',
        alignSelf: 'center',
        fontFamily: "Montserrat-Medium"
    },
    headerTitleTextMain: {
        backgroundColor: "#ccc", fontFamily: "boldme", fontSize: 28, fontWeight: "900"
    },
    backButtonView: {
        position: 'absolute',
        left: 0,
        padding: 20
    },
    rightButtonView: {
        position: 'absolute',
        right: 0
    },
    backIcon: {
        width: 25,
        height: 25
    }
})

export default withNavigation(Header)
