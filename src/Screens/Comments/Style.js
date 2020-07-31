import { StyleSheet } from 'react-native';
export default {
  MainContainer: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#ffffff'
  },
  sub_main_container: {
    flex: 1,
    margin: 0
  }, touch_v: {
    width: 200,
    backgroundColor: '#000',
    height: 45,
    color: '#000',
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "Montserrat-Medium",
  }, text_c_view: {
    width: "100%",
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "Montserrat-Medium",
    fontSize: 19,
    padding: 10
  },
  headerContainer: {
    backgroundColor: "#ccc"
  },
  input: {
    width: "90%",
    paddingRight: 10,
    paddingLeft: 10,
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
  left: {  flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start',  margin: 6,  width:"95%"},
  right: {  flexDirection: 'row',  alignItems: 'flex-end',  margin: 3,  justifyContent: 'flex-end',},
  leftMessage: {
     textAlign: 'left',  padding: 5,width:"95%"
  },
  rightMessage: {
    fontFamily: "Montserrat-Medium", textAlign: 'right', backgroundColor: '#ccc', padding: 10, borderRadius: 30
  },left_image:{
    width: 50, height: 50, borderRadius: 50
  }
};