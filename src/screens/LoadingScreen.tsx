import React, { useEffect } from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import * as firebase from 'firebase';
import { styles } from "./styles"
import { Layout } from '@ui-kitten/components';

export default function LoadingScreen({ navigation }: any) {
  useEffect(
    () => {
      firebase.auth().onAuthStateChanged((user) => {
        console.log("onAuthStateChanged: ", user);
        
        if (user) {
          console.log("nav Dashboard");
          navigation.navigate('Dashboard');
        } else {
          console.log("nav Dashboard");
          navigation.replace('SignIn');
        }
      });
    }
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styles.container}>
        <ActivityIndicator size='large' />
      </Layout>
    </SafeAreaView>

  );
}