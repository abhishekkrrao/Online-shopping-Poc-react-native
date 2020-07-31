import { StyleSheet } from 'react-native';
export default {
  container: { flex: 1, width: '100%', height: "100%", marginTop: 5 },
  otpView: { flex: 1, width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff" },
  card: {
    width: '100%', height: 300, justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff",
    borderRadius: 5, shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, shadowOpacity: 0.3, elevation: 2, marginTop: "2.5%"
  },
  otpContainer: { flex: 1, width: "100%", flexDirection: "row" },
  subotpContainer: { flex: 1, width: "33%", justifyContent: "center", alignContent: "center" },
  textNum: { flex: 1,textAlign: "center", fontSize: 24, fontWeight: "900",fontFamily:"Montserrat-Medium" }
};
