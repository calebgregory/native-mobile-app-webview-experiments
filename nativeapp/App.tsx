/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const url = process.env.CFD_WEBAPP_URL || '';

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Text style={[styles.expl, styles.bumpDown]}>WebView 1</Text>
        <WebView source={{uri: url}} style={styles.webview} />
        <Text style={styles.expl}>WebView 2</Text>
        <WebView source={{uri: url}} style={styles.webview} />
        <Text style={styles.expl}>
          What this means is that on iOS, at least, WebViews share a Browser
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bumpDown: {marginTop: 100},
  webview: {height: 100, marginBottom: 100},
  expl: {color: 'white'},
});

export default App;
