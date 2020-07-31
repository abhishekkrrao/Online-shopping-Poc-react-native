import { StyleSheet } from 'react-native';
export default {
  mainContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  container: {
    flex: 1,
    alignItems: "center",
    margin: 10
  },
  input: {
    backgroundColor: "#ccc",
    width: "100%",
    height: 45,
    color: "#000000",
    padding: 10,

  },
  headerContainer: {
    backgroundColor: "#ccc"
  },
  textInput: {
    height: 65, fontSize: 13, width: '90%', marginTop: 5,
    fontFamily: "Montserrat-Medium", borderColor: '#9b9b9b', borderRadius: 0, borderBottomWidth: 2, padding: 5
  },
  textInputMultiple: {
    height: 100, fontSize: 13, width: '90%', marginTop: 5,
    fontFamily: "Montserrat-Medium", borderColor: '#9b9b9b', borderRadius: 0, borderBottomWidth: 2, paddingLeft: 5
  },
  text_View: {
    flex: 2, flexDirection: 'row', width: "90%", margin: 10, height: 55, padding: 5,
  },
  t1: {
    flex: 1, padding: 5, fontWeight: "900", fontFamily: "Montserrat-Medium", color: "#fff"
  },
  touch_v1: { flex: 1, width: 50, height: 50, borderRadius: 50, alignContent: 'flex-start', justifyContent: 'flex-start' },
  image_v1: { flex: 1, padding: 5, width: 50, height: 50, borderRadius: 50, alignSelf: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start' },
  image_v2: { backgroundColor: '#000', borderRadius: 5, alignContent: 'center', height: 45, padding: 5, width: 100 },
  button_v1: { fontFamily: "Montserrat-Medium", backgroundColor: '#000', alignSelf: 'flex-end' },
  size_view: { flexDirection: "row", flex: 1, width: "90%", height: 65, margin: 5, padding: 5 },
  size_view_text: { flex: 1, width: "45%", paddingLeft: 5, paddingTop: 15, fontFamily: "Montserrat-Medium", fontSize: 14, fontWeight: "900" },
  heading_text: { flex: 1, width: "95%", padding: 10, fontFamily: "Montserrat-Medium", fontSize: 15, },
}