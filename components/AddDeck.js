import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TestBox from './TestBox';
import TextButton from './TextButton';
import { blue } from '../utils/colors';
import { connect } from 'react-redux';
import { addDeck } from '../actions'
import { addDeckAsyncStoreage } from '../utils/api'

class AddDeck extends Component {
  state = {
    decktitle: '',
  };

  handleDeckTitleChange = (decktitle) => {
    this.setState({ decktitle });
  };
  
  handleSubmit = () => {
    //add card to deck
    const { decktitle } = this.state;
    const titleNoSpace = decktitle.replace(/\s/g, "");
    const { dispatch, navigation } = this.props;
    
    dispatch(addDeck(titleNoSpace, decktitle));
    addDeckAsyncStoreage(titleNoSpace, decktitle);
    
    this.setState({ decktitle : '' });

    navigation.navigate('DeckDetail',{ itemId:titleNoSpace });
    //redirect back to deck detail
  };
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bodyContainer}>
          <Text style={styles.textInputTitle}>What is the title of your new deck ?</Text>
          <TestBox
            placeholder="Deck Title"
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            onChangeText={this.handleDeckTitleChange}
            value={this.state.decktitle}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TextButton 
            style={{ backgroundColor: blue }} 
            onPress={this.handleSubmit}
            disabled={this.state.decktitle === ''}>
            Create Deck
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
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  textInputTitle: {
    paddingBottom: 5,
    paddingTop: 10,
  },
});

function mapStateToProps(state, props) {
  return {
  };
}

export default connect(mapStateToProps)(AddDeck);
