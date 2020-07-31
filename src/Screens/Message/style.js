import {StyleSheet} from 'react-native';
export default {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#ffffff'
      },
      searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 50
      },
      searchIcon: {
        padding: 10,
      }, 
      input: {
        width: "90%",
        paddingRight: 10,
        paddingLeft:10,
        fontFamily: "Montserrat-Medium",
        paddingTop: 5,
        height: 45,
        alignSelf: 'center',
        backgroundColor: '#ffffff'
      }, 
      passwordContainer: {
        flexDirection: 'row',
        paddingBottom: 0,
      },
      inputStyle: {
        flex: 1,
        paddingLeft: 15,
        paddingStart: 15
      },
      sendView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6E5BAA',
        height: 0
      },
      sendView2: {
        justifyContent: 'flex-end',
        paddingRight: 10,
        height: 50
      },
      sendView1: {
        flex: 1,
        justifyContent: 'center',
        height: 50
      },
      sendButton: {
        alignItems: "flex-end",
        justifyContent: "flex-end"
      },
      headerContainer: {
        backgroundColor: "#ccc"
      },
      textInput: {
        height: 50,
        fontSize: 14,
        width: '100%',
        borderColor: '#9b9b9b',
        fontFamily: "Montserrat-Medium",
        borderBottomWidth: 2,
        paddingLeft: 15
      },
      button: {
        width: 50,
        height: 45,
      },
      left: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        margin: 3
      },
      right: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        margin: 3,
        justifyContent: 'flex-end',
      },
      leftMessage: {
        fontFamily: "Montserrat-Medium", textAlign: 'left', backgroundColor: '#ccc', padding: 10, borderRadius: 30
      },
      rightMessage: {
        fontFamily: "Montserrat-Medium", textAlign: 'right', backgroundColor: '#ccc', padding: 10, borderRadius: 30
      },
}