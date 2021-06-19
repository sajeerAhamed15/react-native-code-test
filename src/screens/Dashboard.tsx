import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { styles } from "./styles"
import { loggingOut } from '../service/firebase';
import { Icon, TopNavigation, Button, TopNavigationAction, List, Layout, OverflowMenu, MenuItem, Toggle } from '@ui-kitten/components';
import CardItem from '../components/CardItem';
import { ThemeContext } from '../context/theme-context';
// import LottieLoader from 'react-native-lottie-loader';
// import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import LottieView from 'lottie-react-native';
import { View, AnimatePresence as AnimatePresenceMoti } from 'moti'
// import { Item } from '../components/Item';


function Shape({ bg }: any) {
  return (
    <View
      from={{
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
      style={[styles.shape, { backgroundColor: bg }]}
    />
  )
}

const useToggleState = (initialState = false) => {
  const [checked, setChecked] = React.useState(initialState);

  const onCheckedChange = (isChecked: boolean) => {
    setChecked(isChecked);
  };

  return { checked, onChange: onCheckedChange };
};

export default function Dashboard({ navigation }: any) {
  let currentUser = firebase.auth().currentUser;
  const [name, setName] = useState('');

  useEffect(() => {
    async function getUserInfo() {
      let doc = await firebase
        .firestore()
        .collection('users')
        .doc(currentUser?.uid)
        .get();

      if (!doc.exists) {
        Alert.alert('No user data found!')
      } else {
        let dataObj = doc.data();
        setName(dataObj?.name)
      }
    }
    getUserInfo();
  })

  const handlePress = () => {
    loggingOut();
    navigation.replace('Loading');
  };


  const navigateBack = () => {
    navigation.pop();
  };


  const BackIcon = (props: any) => (
    <Icon {...props} name='arrow-back' />
  );

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const data = new Array(8).fill({
    title: 'Item',
  });

  const MenuIcon = (props: any) => (
    <Icon {...props} name='more-vertical' />
  );

  const InfoIcon = (props: any) => (
    <Icon {...props} name='info' />
  );

  const LogoutIcon = (props: any) => (
    <Icon {...props} name='log-out' />
  );

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );
  const [menuVisible, setMenuVisible] = React.useState(false);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const themeContext = React.useContext(ThemeContext);
  const switchTheme = () => {
    themeContext.toggleTheme()
  }


  const primaryToggleState = useToggleState();

  const renderOverflowMenuAction = () => (
    <React.Fragment>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={InfoIcon} onPress={switchTheme} title='Toggle theme' />
        <MenuItem accessoryLeft={LogoutIcon} onPress={handlePress} title='Logout' />
      </OverflowMenu>
    </React.Fragment>
  );
  const customData = require('../data/temp.json');

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  })
  const [visible, toggle] = React.useReducer((s) => !s, true)

  return (

    <>
      <AnimatePresenceMoti exitBeforeEnter>
        {loading && <View
          from={{ opacity: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 0
          }}
          transition={{
            // default settings for all style values
            type: 'timing',
            duration: 1000,
          }}
          
          style={{
            height: '100%',
            width: '100%',
            // backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'
          }} >
          <LottieView style={{ height: 150, width: 150 }} source={require('./../../assets/book-animation.json')} autoPlay loop />
        </View>}





        <Layout style={{ flex: 1 }}>
          <SafeAreaView>
            <TopNavigation
              title='MyApp'
              style={{}}
              accessoryRight={renderOverflowMenuAction}
            // accessoryLeft={BackAction} 
            />
            <Layout>
              <List
                contentContainerStyle={styles.contentContainerList}
                data={customData.blogs}
                renderItem={info => <CardItem info={info} navigation={navigation} />}
              />
              {/* <AnimatePresence>
                {true && <Item key="item" />}
              </AnimatePresence> */}
            </Layout>
          </SafeAreaView>
        </Layout>
      </AnimatePresenceMoti>

    </>

    // <Pressable onPress={toggle} style={styles.container}>
    //   <AnimatePresence exitBeforeEnter>
    //     {visible && <Shape bg="hotpink" key="hotpink" />}
    //     {!visible && <Shape bg="cyan" key="cyan" />}
    //   </AnimatePresence>
    // </Pressable>
  )
}
