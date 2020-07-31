import { StyleSheet } from 'react-native';
export default {
  container: { flex: 1, alignItems: 'center', backgroundColor: "#FEF8E5" ,paddingTop:5},
  text_view: {
    paddingLeft: 25, color: '#000', alignSelf: "flex-start", fontSize: 30, fontFamily: "Montserrat-Medium",
    fontWeight: "900",width:250
  },
  text_view_subtitle: {
    paddingLeft: 22, color: '#000', marginTop: 5, alignSelf: "flex-start", fontSize: 14,
    fontFamily: "Montserrat-Medium", fontWeight: "900"
  },
  text_view_subtitle3: {
    color: '#000', marginTop: 25, alignSelf: "flex-start", fontSize: 14,
    fontFamily: "Montserrat-Medium", fontWeight: "900"
  },
  text_view_subtitle2: {
    paddingLeft: 22, color: '#000', marginTop: 5, alignSelf: "flex-start", fontSize: 14,
    fontFamily: "Montserrat-Medium", fontWeight: "900"
  },
  textInput: {
    height: 45, width: "90%", fontSize: 12, backgroundColor: '#ccc', borderRadius: 25, marginTop: 8,
    marginVertical: 15, color: "#000", fontFamily: "Montserrat-Medium", paddingLeft: 15
  },
  buttonCss: {
    width: "90%", backgroundColor: '#000', height: 45,
    borderRadius: 25, justifyContent: 'center', alignItems: 'center',
  },
  two_view_container: { flexDirection: 'row', width: "100%", height: 50 ,paddingLeft:20},
  two_view_container_new: { flex: 1, alignItems: 'center', width: "100%", marginTop: 55 },
  two_view_container_Child: { width: "50%", height: 50 },
  two_textInput_view_container: { flex: 1, flexDirection: "row", height: 50 },
  child_view_container: { flex: 1, width: "90%" }
}