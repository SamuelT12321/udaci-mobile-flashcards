import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import Constants from 'expo-constants';
// You can import from local files
import Navigation from './components/Navigation';
import { purple } from './utils/colors';
import { setLocalNotification } from './utils/helpers'

function FlashCardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}
const store = createStore(
  reducer,applyMiddleware(thunk, logger)
);
export default class App extends React.Component {
  componentDidMount(){
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <FlashCardsStatusBar
            backgroundColor={purple}
            barStyle="light-content"
          />
          <Navigation />
        </View>
      </Provider>
    );
  }
}
