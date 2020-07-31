import { StyleSheet } from 'react-native';
export default {
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#FEF8E5",
    paddingTop:50
  },
  text_view: { paddingLeft: 20, color: '#000', alignSelf: "flex-start", 
  fontSize: 30, fontFamily: "Montserrat-Medium", fontWeight: "900" ,width:250},
  text_view_subtitle: { paddingLeft: 22, color: '#000', marginTop: 25, alignSelf: "flex-start", fontSize: 14, fontFamily: "Montserrat-Medium", fontWeight: "900" },
  text_view_subtitle2: { paddingLeft: 22, color: '#000', marginTop: 5, alignSelf: "flex-start", fontSize: 14, fontFamily: "Montserrat-Medium", fontWeight: "900" },
  textInput: {
    height: 45, width: "90%", fontSize: 12, backgroundColor: '#ccc', borderRadius: 25, marginTop: 8,
    marginVertical: 15, color: "#000", fontFamily: "Montserrat-Medium", paddingLeft: 15
  },
  buttonCss: { width: "90%", backgroundColor: '#000', height: 45, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }
}