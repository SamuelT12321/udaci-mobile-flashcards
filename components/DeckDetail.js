import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextButton from './TextButton';
import { red, blue, gray,lightPurp } from '../utils/colors';
import { connect } from 'react-redux';
import { removeDeck } from '../actions/index';
import { removeDeckAsyncStoreage } from '../utils/api';

class DeckDetail extends Component {
  
  addCard = () => {
    const { itemId ,navigation} = this.props
    //add card by item id 
    navigation.navigate('AddDeckCard',{itemId})
    // Route to add card
  };
  startQuiz = () => {
    const { itemId ,navigation } = this.props
    //start quiz by item id
    navigation.navigate('TakeQuiz',{itemId})
    // Route to start quiz
  };
  deleteDeck= () => {
    const { itemId,navigation,dispatch } = this.props
    dispatch(removeDeck(itemId));
    removeDeckAsyncStoreage(itemId);
    navigation.navigate('Home') 
  }
  render() {
    const { deck } = this.props
    if(deck){
      return(
        <View style={styles.container}>
        <View style={styles.bodyContainer}>
          <Text style={{fontSize:20}}>Deck: {deck.title} </Text>
          <Text style={{color:gray}}>{deck.questions.length} cards</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextButton style={{ backgroundColor: blue }} onPress={this.addCard}>
            Add Card
          </TextButton>
          <TextButton 
            style={{ backgroundColor: lightPurp }} 
            onPress={this.startQuiz}
            disabled={deck.questions.length === 0}>
            Start Quiz
          </TextButton>
          <TextButton style={{ backgroundColor: red }} onPress={this.deleteDeck}>
            Delete Deck
          </TextButton>
        </View>
      </View>
      )
    }
    return (
      <View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state,props){
  const itemId = props.route.params.itemId;
  const deck = state[itemId];
  return{
    itemId,
    deck
  }
}

export default connect(mapStateToProps)(DeckDetail);
