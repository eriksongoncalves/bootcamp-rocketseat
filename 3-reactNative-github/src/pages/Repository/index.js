import React from 'react';
import { WebView } from 'react-native-webview';

const Repository = ({ navigation }) => <WebView
    source={{ uri: navigation.getParam('repository').html_url }}
    style={{ flex: 1 }}
/>;

Repository.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('repository').name
});

export default Repository;
