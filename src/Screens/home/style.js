import {StyleSheet} from 'react-native';
export default {
    MainContainer: {
      flex: 1,
      margin: 0
    },
    imageView: {
      width: 'auto',
      height: 'auto',
      flex: 1
    },
    imageViews: {
      width: '100%',
      height: 350,
      flex: 1,
      padding: 0,
      margin: 0
    },
    textView: {
      textAlignVertical: 'center', padding: 10,  color: '#000', flex: 1,
      fontFamily: "Montserrat-Medium", fontWeight: '900', fontSize: 14
    },
    textViews: {
      width: '50%',
      textAlignVertical: 'center',
      padding: 10,
      color: '#000',
      fontSize: 9,
      fontFamily: "Montserrat-Medium",
      fontWeight: '500'
    },
    custom_view: { flex: 1, backgroundColor: '#ffffff', marginBottom: 5, padding: 0, borderRadius: 7,width:"100%" },
    cust_buy_b1:{ backgroundColor: '#000', marginEnd: 5,height:40, width: 125, borderRadius: 5, paddingTop: 10, textAlign:"center",color:"#fff" },
    headerContainer:{  fontFamily: "boldme", fontSize: 28, fontWeight: "900"}
  };