import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextButton from './TextButton';
import { red } from '../utils/colors';
import { connect } from 'react-redux';
import { resetDecks } from '../utils/api.js';
import { resetStore } from '../actions/index';

class Setting extends Component {
  HandleResetAppData = () => {
    const { navigation,dispatch } = this.props;
    dispatch(resetStore());
    resetDecks();
    navigation.navigate('Home')
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bodyContainer}>
          <TextButton style={{ backgroundColor: red }} onPress={this.HandleResetAppData}>
            Reset App Data
          </TextButton>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect()(Setting);
