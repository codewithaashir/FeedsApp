/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, StyleSheet, useWindowDimensions,ActivityIndicator } from 'react-native';
import WebView from 'react-native-webview';
import { Colors } from '../common/colors';

const FeedWebview = (props) => {
    const { url } = props.route&&props.route.params?props.route.params:props;
    const { width, height } = useWindowDimensions();
    const [loading, setLoading] = useState(false);
    const onLoadStartHandler = () => {
        setLoading(true);
    };
    const onLoadEndHandler = () => {
        setLoading(false);
    };

    return (
        <>
            <View style={styles.root}>
                
                <WebView
                    onLoadStart={onLoadStartHandler}
                    onLoad={onLoadEndHandler}
                    onLoadEnd={onLoadEndHandler}
                    source={{ uri: url }}
                    containerStyle={{ width: width, height: height }}
                />
            </View>
            {loading &&
                < View style={styles.loaderView}>
                    <ActivityIndicator size={'small'} color={Colors.twitterBlue}/>
                </View>
            }
     
        </>
    );
};

const styles = StyleSheet.create({
    root: {
        flexGrow: 1,
        backgroundColor: Colors.white,
    },
    loaderView: {
        justifyContent: 'center',
        alignItems: 'center',

        ...StyleSheet.absoluteFill,
    },
});

export default FeedWebview;
