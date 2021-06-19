import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text, Layout } from '@ui-kitten/components';
import { BlogsContext } from '../context/blogs-context';
import { Image } from 'react-native';
import { Card } from 'react-native-elements'
// import asd from './../../assets/readme-icon.png'
import { View, AnimatePresence } from 'moti'

import { SharedElement } from 'react-navigation-shared-element';


export default function CardItem({ info, navigation }: any) {

  const temp = info.item.title + " id:" + String(info.index);
  const renderItemHeader = (headerProps: any, info: any) => (
    <Layout {...headerProps}>
      <Text category='h6'>
        {temp}
      </Text>
    </Layout>
  );

  const renderItemFooter = (footerProps: any) => (
    <>
      <Text {...footerProps}>
        {info.item.author}
      </Text>
      <Text {...footerProps}>
        {info.item.datePublished}
      </Text>
      <Text {...footerProps}>
        {info.item.views}
      </Text>
    </>
  );
  const context = React.useContext(BlogsContext);
  const handleOnPress = () => {
    context.blog = info.item;
    navigation.replace('Blog')
  }

  return (
    <AnimatePresence>
      <View
        style={{ marginTop: 20, width: '100%', height: 500, shadowColor: 'rgba(0, 0, 0, 0.75)', shadowRadius: 5 }}
        from={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      //  transition={{
      //   // default settings for all style values
      //   type: 'timing',
      //   duration: 1000,
      //  }}
      >

        <TouchableWithoutFeedback
          onPress={handleOnPress}
        >
          <Layout
            style={{ paddingHorizontal: 0, paddingVertical: 0, borderRadius: 20, height: '100%' }}
          // onPress={handleOnPress}
          // containerStyle={styles.item}
          // status='basic'
          // header={headerProps => renderItemHeader(headerProps, info)}
          // footer={renderItemFooter}
          >

            <SharedElement id={`item.${info.item.title}`}>
              <Image
                source={{ uri: info.item.imageUrl }}
                style={styles.image}
              />
            </SharedElement>
            <Layout style={{ padding: 20, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }}>
              <SharedElement id={`image`}>
                <Text category='h2'>
                  {info.item.title}
                </Text>
              </SharedElement>
              <Text style={{ paddingTop: 10 }}>
                {info.item.content.substring(0, 200)}...
              </Text>
            </Layout>
          </Layout>
        </TouchableWithoutFeedback>
      </View>
    </AnimatePresence>
  );
}

const styles = StyleSheet.create({
  item: {
    // backgroundColor: 'white',
    padding: 20,
    marginVertical: -20,
    borderRadius: 20
  },
  image: {
    flex: 1,
    // // display: undefined,
    // // maxWidth:'100%',
    // // maxHeight:500,
    // width: 200,
    // height: 200,
    // // aspectRatio: 1,
    resizeMode: 'cover',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
    // objectFit: 'cover'
  }
});


CardItem.sharedElements = (route: any, otherRoute: any, showing: any) => [
  { id: 'image' },
  // {id: 'text', animation: 'fade'},
];