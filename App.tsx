import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry, Text } from "@ui-kitten/components";
import mapping from "./mapping.json";
import { useFonts } from "expo-font";
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from "@react-navigation/stack";
// import { default as theme } from './theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import 'react-native-reanimated';
import * as firebase from 'firebase';
import apiKeys from './config/keys';

import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import Dashboard from './src/screens/Dashboard';
import BlogScreen from "./src/screens/BlogScreen";
import { FeatherIconsPack } from "./src/components/FeatherIcon";
import { ThemeContext } from "./src/context/theme-context";
import { BlogsContext } from "./src/context/blogs-context";


import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


const AppNavigator = createSharedElementStackNavigator({
  Loading: { screen: LoadingScreen},
  SignIn: { screen: SignInScreen },
  SignUp: { screen: SignUpScreen },
  Dashboard: { screen: Dashboard },
  Blog: { screen: BlogScreen }
},
{
  initialRouteName: 'Loading',
});

const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  const [theme, setTheme] = React.useState('dark');
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  const [loaded, error] = useFonts({
    Roboto: require("./assets/fonts/Roboto/Roboto.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  if (!firebase.apps.length) {
    console.log('Connected with Firebase')
    firebase.initializeApp(apiKeys.firebaseConfig);
  }


  if (!loaded) {
    return null;
  }

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <BlogsContext.Provider value={{blog: undefined}}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <ApplicationProvider
            {...eva}
            theme={theme === 'light' ? eva.light : eva.dark}
          // theme={{ ...eva.dark, ...theme }}
          // customMapping={{ ...eva.mapping, ...mapping }}
          >
            {/* //   <View style={styles.container}>
      //     <Text style={styles.titleText} category="h1">
      //       Do you best and enjoy the process!
      //     </Text>
      //     <StatusBar style="auto" />
      //   </View> */}
            {/* <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name={'Loading'} component={LoadingScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Sign In' component={SignInScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Sign Up' component={SignUpScreen} options={{ headerShown: false }} />
                <Stack.Screen name={'Dashboard'} component={Dashboard} options={{ headerShown: false }} />
                <Stack.Screen name={'Blog'} component={BlogScreen} options={{ headerShown: false }} />
              </Stack.Navigator>
            </NavigationContainer> */}
            <AppContainer />
          </ApplicationProvider>
        </ThemeContext.Provider>
      </BlogsContext.Provider>
    </>
  );
};

export default App;
