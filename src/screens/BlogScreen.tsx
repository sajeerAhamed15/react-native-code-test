import React, { useState } from 'react';
import { ActivityIndicator, Animated, Dimensions, ImageBackground, SafeAreaView, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { HEADER_COLLAPSED_HEIGHT, HEADER_EXPANDED_HEIGHT, SCREEN_WIDTH, styles } from "./styles"
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { BlogsContext } from '../context/blogs-context';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
// import LottieLoader from 'react-native-lottie-loader';
import LottieView from 'lottie-react-native';

import { SharedElement } from 'react-navigation-shared-element';


export default function BlogScreen({ navigation }: any) {
    const context = React.useContext(BlogsContext);
    const [loading, setLoading] = useState(true);

    const [scrollY] = useState(new Animated.Value(0));

    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
        outputRange: [HEADER_EXPANDED_HEIGHT + 100, HEADER_COLLAPSED_HEIGHT + 50],
        extrapolate: 'clamp'
    });
    const headerTitleOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    });
    const heroTitleOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    });

    const headerTitle = context.blog.title


    const handleOnBackPress = () => {
        navigation.replace("Dashboard")
    }
    // console.log(context.blog.imageUrl);
    console.log("asd");
    return (
        <Layout style={styles.container}>
            {/* {loading ?
                (
                    <SafeAreaView>
                        <Text style={{ position: 'absolute', height: 100, width: 100 }}>loading</Text>
                    </SafeAreaView>
                )
                : null} */}
            <Animated.View style={[styles.header, { height: headerHeight }]}>
                <Animated.View style={[styles.header, { height: headerHeight }]}>
                    {loading && <Layout style={{ height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.75)', justifyContent: 'center', alignItems: 'center' }} >
                        <LottieView style={{ height: 150, width: 150 }} source={require('./../../assets/loading.json')} autoPlay loop />
                    </Layout>}
                    <SharedElement id={`item.${context.blog.title}`}>
                        <Image onLoad={() => setLoading(false)} source={{ uri: context.blog.imageUrl }} style={{ height: '100%', width: '100%' }} />
                    </SharedElement>
                    {/* defaultSource={require("./../../assets/readme-icon.png")} */}
                </Animated.View>

                <Animated.Text style={
                    {
                        textShadowColor: 'rgba(0, 0, 0, 0.75)',
                        textShadowRadius: 5,
                        textShadowOffset: { width: -1, height: 1 },
                        textAlign: 'center',
                        fontSize: 32,
                        color: 'white',
                        position: 'absolute',
                        bottom: 80,
                        left: 16,
                        opacity: heroTitleOpacity
                    }}>{headerTitle}</Animated.Text>
                <SafeAreaView style={{ flexDirection: 'row-reverse' }}>
                    {/* <TouchableOpacity onPress={() => navigation.replace("Dashboard")}>
                        <Icon name='arrow-back' fill={'white'} style={{
                            // ShadowColor: 'red',
                            // shadowRadius: 10,
                            // borderWidth: 2,
                            // overflow: 'hidden',
                            // borderColor: 'red',
                            shadowOffset: { width: -1, height: 1 },
                            height: 20,
                            width: 20,
                            // top: 0,
                            // marginTop: Constants.statusBarHeight,
                            marginLeft: 15,
                            position: 'absolute',
                            // marginBottom: 12
                        }} />
                    </TouchableOpacity> */}
                    <Animated.Text style={
                        {
                            // right: 0,
                            // position: 'relative',
                            // display: 'flex',
                            // flex: 1,
                            // alignItems: 'center',
                            // justifyContent: 'center',
                            // alignContent: 'center',
                            // marginLeft: 'auto',
                            width: '100%',
                            // backgroundColor: 'red',
                            textShadowColor: 'rgba(0, 0, 0, 0.75)',
                            textShadowRadius: 5,
                            textShadowOffset: { width: -1, height: 1 },
                            textAlign: 'center',
                            fontSize: 18,
                            color: 'white',
                            // marginTop: 5,
                            // top: Constants.statusBarHeight,
                            opacity: headerTitleOpacity
                        }}>{headerTitle}</Animated.Text>
                    <TouchableOpacity style={{ marginLeft: 'auto', height: 50, width: 50 }} onPress={handleOnBackPress}>
                        <Icon name='arrow-back' fill={'white'} style={{
                            // ShadowColor: 'red',
                            // shadowRadius: 10,
                            // borderWidth: 2,
                            // overflow: 'hidden',
                            // borderColor: 'red',
                            shadowOffset: { width: -1, height: 1 },
                            height: 20,
                            width: 20,
                            // top: 0,
                            // marginTop: Constants.statusBarHeight,
                            marginLeft: 15,
                            // left: 0,
                            // position: 'absolute',
                            // marginBottom: 12
                        }} />
                    </TouchableOpacity>
                </SafeAreaView>



            </Animated.View>
            {/* <Icon name='arrow-back' fill={'white'} style={{
                // ShadowColor: 'red',
                // shadowRadius: 10,
                // borderWidth: 2,
                // overflow: 'hidden',
                // borderColor: 'red',
                shadowOffset: { width: -1, height: 1 },
                height: 20,
                width: 20,
                top: 0,
                marginLeft: 15,
                marginBottom: 12
            }} /> */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
                onScroll={Animated.event(
                    [{
                        nativeEvent: {
                            contentOffset: {
                                y: scrollY
                            }
                        }
                    }])
                }
                scrollEventThrottle={16}>
                <Layout style={[styles.blogContent]}>
                    <SharedElement id={`image`}>
                        <Text>
                            {context.blog.title}
                        </Text>
                    </SharedElement>
                </Layout>
                <View>

                </View>

            </ScrollView>
            {/* {loading ?
                (
                    <LottieLoader visible={loading} source={require('./../../assets/loading.json')}/>
                )
                : null} */}
        </Layout>
        // <SafeAreaView style={{ flex: 1 }}>
        //     <Layout style={styles.container}>
        //         <Text>{context.title}</Text>
        //         {/* <CollapsibleToolbar
        //             title={'Exercises'}
        //             // headerColor={Colors.primary}
        //             // headerColorDark={Colors.primaryDark}
        //             image={require('./assets/sports.png')}
        //             backPress={() => alert('Navigate Back')}>
        //                 <Text>
        //                     spernatur tempore itaque sunt autem esse. Qui quisquam et. Voluptates amet aut consequatur et et veritatis nemo explicabo eum. Nisi explicabo quis repellat dolorum. Libero ipsam asperiores. Deleniti culpa ipsum impedit itaque voluptas est. Asperiores accusamus voluptatem voluptatem. Ut eligendi quo sed minima est numquam. Eveniet nulla pariatur et quasi eum sint repudiandae recusandae ad. Commodi dolorem asperiores temporibus sequi dolor. Ea debitis quos distinctio quisquam repellat in. Corporis eius provident sunt. Ea recusandae aperiam eum ipsam perspiciatis. Ipsum enim numquam unde temporibus saepe laborum quia. Impedit ut nesciunt est deserunt non dolore officiis cumque. Nihil dolorem delectus soluta consequatur cum deserunt possimus. Culpa qui aperiam voluptatem excepturi possimus blanditiis. Sit odio perferendis. Odio sit tempore quo. Consequatur quis quo dolor amet sunt quia facilis tempora consequatur. Velit et qui sit quo maxime corrupti sunt. Possimus autem totam nisi dolorum accusantium et sunt error. Sint neque enim non corrupti id aspernatur cum in autem. Dolores nobis provident voluptatem aperiam ad aut. Cupiditate aut ab dolores at. Beatae quasi quis aut. Consequuntur sapiente labore consequuntur id qui. Dolorem facilis repellendus inventore voluptates sit sed qui. Ipsum iusto et. Eaque optio sapiente natus in enim aspernatur. Porro et repellendus tempora itaque error nihil sint dolor provident. Itaque molestiae voluptas earum nihil voluptatem voluptatibus quas. Tempora consequatur ut rerum enim voluptatibus quaerat repellendus voluptatem. Enim a nobis veniam neque magnam. Nemo dicta consectetur earum facilis at necessitatibus porro. Vero velit dolorum neque sunt debitis assumenda eligendi. Est ut soluta molestiae. Inventore ea aut eos tenetur ducimus. Est id libero fuga. Distinctio nihil ex animi. Fuga magni aut ut illo et fugiat qui. Rerum temporibus fugit nobis ducimus sit. Beatae temporibus ducimus recusandae. Accusantium delectus quo eaque recusandae et. Tempore at voluptas sequi dolores eius. Fuga officia dolorum. Sit asperiores occaecati dolores odit rerum. Itaque quam est. Commodi alias tenetur voluptate voluptatum. Rem sunt dolore. Animi ut optio sequi nisi. Ut rem nisi pariatur aut. Vel voluptas est reprehenderit. Incidunt amet ad sapiente voluptas ea et qui. Deserunt ipsum explicabo. Quo non in officiis. Qui aliquid ut veritatis ducimus pariatur aut aut neque id. Eos ut quia praesentium. Atque ut omnis enim quos aliquam. Itaque nulla laboriosam et ut quaerat est. Aut ea expedita rerum doloremque pariatur blanditiis. Vel rerum eligendi accusamus. Recusandae sit pariatur ut dolores. Sapiente eligendi ut labore et quibusdam placeat dicta adipisci aperiam. Non maxime voluptate odit eum suscipit nostrum et. Qui beatae occaecati enim. Voluptas pariatur animi praesentium qui repudiandae et nihil. Velit delectus sed. Impedit ut laborum rerum quis doloremque. Occaecati itaque magni distinctio tempore ut cum voluptates optio deleniti. Eum quia et nulla et. Mollitia dolor veritatis placeat. Labore ad modi nihil iste ut. Est dolores ea dolorum.
        //                 </Text>
        //         </CollapsibleToolbar> */}
        //         <Button onPress={() => navigation.replace('Dashboard')} >Back</Button>
        //     </Layout>
        // </SafeAreaView>
    );
}


BlogScreen.sharedElements = (route: any, otherRoute: any, showing: any) => [
    { id: 'image' },
    // {id: 'text', animation: 'fade'},
];