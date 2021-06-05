/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {WebViewMessageEvent} from 'react-native-webview/lib/WebViewTypes';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const uri = process.env.CFD_WEBAPP_URL || '';

// type is duplicated; this would go in a library
type Msg = {
  id: string;
  at: string;
  msg: {[key: string]: any};
};

function App() {
  const webView = useRef<WebView | null>(null);

  const [messages, setMessages] = useState<Msg[]>([]);
  const recvMessageFromWebView = (event: WebViewMessageEvent) => {
    const msg: Msg = JSON.parse(event.nativeEvent.data);
    setMessages([msg, ...messages]);
  };
  const sendMessageToWebView = () => {
    const at = new Date().toISOString();
    const msg = {
      id: `msg-native-${at}`,
      at,
      msg: 'this was sent from the native app',
    };

    if (webView.current) {
      webView.current.injectJavaScript(`
// yes, literally, we are injecting javascript into the webapp and executing it
window.postMessage(${JSON.stringify(msg)})
true; // <- this is required`);
    }
  };

  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={backgroundStyle(isDarkMode)}>
      <StatusBar barStyle={barStyle(isDarkMode)} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle(isDarkMode)}>
        <Text style={[styles.expl, styles.pink, styles.bumpDown]}>
          This is how we pass data between Native App and Web App
        </Text>

        <Text style={[styles.title, styles.expl, styles.bumpDown]}>
          WebView
        </Text>

        <WebView
          ref={webView}
          source={{uri}}
          style={[styles.webview, styles.bumpDown]}
          onMessage={recvMessageFromWebView}
        />

        <Text style={[styles.title, styles.expl, styles.bumpDown]}>
          Native App
        </Text>

        <TouchableOpacity onPress={() => sendMessageToWebView()}>
          <View style={[styles.button, styles.bumpDown]}>
            <Text style={styles.buttonText}>Send message to web app</Text>
          </View>
        </TouchableOpacity>

        <Text style={[styles.expl, styles.pink, styles.bumpDown]}>
          Messages Received From Web View:
        </Text>
        <View style={styles.bumpDown}>
          {messages.map((msg: Msg) => (
            <View key={msg.id}>
              <Text style={styles.msg}>{JSON.stringify(msg)}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pink: {color: 'pink', fontStyle: 'italic'},
  bumpDown: {marginTop: 10},
  webview: {height: 300, marginBottom: 20},
  button: {height: 50, width: '100%', backgroundColor: 'blue'},
  buttonText: {fontWeight: 'bold', color: 'white'},
  title: {fontWeight: 'bold', fontSize: 24},
  msg: {color: 'white'},
  expl: {color: 'white'},
});

const backgroundStyle = (isDarkMode: boolean) => ({
  backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
});
const barStyle = (isDarkMode: boolean) =>
  isDarkMode ? 'light-content' : 'dark-content';

export default App;
