import Constants from 'expo-constants';
import { Dimensions, StyleSheet } from 'react-native';


export const HEADER_EXPANDED_HEIGHT = 300;
export const HEADER_COLLAPSED_HEIGHT = 120;

export const { width: SCREEN_WIDTH } = Dimensions.get("screen")

export const styles = StyleSheet.create({
  // button: {
  //   width: 150,
  //   padding: 5,
  //   backgroundColor: '#ff9999',
  //   borderWidth: 2,
  //   borderColor: 'white',
  //   borderRadius: 15,
  //   alignSelf: 'center',
  // },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // container: {
  //   height: '100%',
  //   width: '100%',
  //   backgroundColor: '#3FC5AB',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'italic',
    marginTop: '2%',
    marginBottom: '10%',
  },
  titleText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2E6194',
  },


  formInput: {
    width: 300,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#a4eddf',
    padding: 10,
    margin: 5,
  },

  errorText: {
    color: 'red',
    marginTop: 5,
  },
  inlineText: {
    marginTop: 80,
    textAlign: 'center',
  },
  textInput: {
    width: 300,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#a4eddf',
    padding: 10,
    margin: 5,
  },

  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  titleContainer: {
    position: 'absolute',
    top: 170,
  },

  label: {
    margin: 20,
  },
  button: {
    marginTop: 40,
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: Constants.statusBarHeight + 30,
    // padding: 8,
    // backgroundColor: '#363636',
    // zIndex: 99999999
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'red',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },

  containerList: {
    maxHeight: 320,
  },
  contentContainerList: {
    paddingHorizontal: 20,
    paddingVertical: 4,
  },

  toggle: {
    margin: 2,
  },

  item: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#cacaca',
  },


  scrollContainer: {
    // padding: 16,
    // elevation: 10,
    paddingTop: HEADER_EXPANDED_HEIGHT - (Constants.statusBarHeight),
    // top: Constants.statusBarHeight
    // backgroundColor: 'red',
    // borderRadius: 20
  },
  header: {
    // backgroundColor: 'lightblue',
    position: 'absolute',
    width: SCREEN_WIDTH,
    top: 0,
    left: 0,
    // zIndex: 9999
  },
  // title: {
  //   marginVertical: 16,
  //   color: "black",
  //   fontWeight: "bold",
  //   fontSize: 24
  // }
  backImage: {
    width: SCREEN_WIDTH,
    height: 60
  },
  blogContent: { 
    // marginTop: -20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white', 
    width: SCREEN_WIDTH, 
    padding: 16
  },

  shape: {
    justifyContent: 'center',
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: 'white',
  },
});
