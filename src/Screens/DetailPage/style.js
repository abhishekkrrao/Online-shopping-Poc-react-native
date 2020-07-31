import { StyleSheet } from 'react-native';
export default {
  containers: {
    width:"100%",
    flex:1
  },
  headerContainer: {
    backgroundColor: "#ccc",
},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height:400,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    marginTop:0
  },
  image: {
    marginTop: 10,
    height: 280,
    width: '92%'
  },
  photoDescriptionContainer: {
    flex:1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  icon: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  animatedIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    borderRadius: 160,
    opacity: 0
  },
  text: {
    textAlign: 'center',
    fontSize: 13,
    color: "#515151"
  },
  textPhotographer: {
    fontWeight: 'bold',
    textAlign: 'center',
    width:"90%"
  },
  polaroidTextContainer: {
    flexDirection: 'row',
    paddingTop: 0
  }
}