import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TestBox from './TestBox';
import TextButton from './TextButton';
import { blue } from '../utils/colors';
import { connect } from 'react-redux';
import { addCardToDeck } from '../actions';
import { addCardToDeckAsyncStoreage } from '../utils/api';

class AddDeckCard extends Component {
  componentDidMount() {
    const { title } = this.props;
    this.props.navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: 'Add Card to ' + title,
    });
  }
  state = {
    question: '',
    answer: '',
  };

  handleQuestionChange = (question) => {
    this.setState({ question });
  };
  handleAnswerChange = (answer) => {
    this.setState({ answer });
  };

  handleSubmit = () => {
    const deckId = this.props.itemId;
    const { dispatch } = this.props;
    //add card to deck
    const card = {
      question: this.state.question,
      answer: this.state.answer,
    };

    dispatch(addCardToDeck(deckId, card));

    addCardToDeckAsyncStoreage(deckId, card);

    this.setState({ question: '', answer: '' });
    this.props.navigation.navigate('DeckDetail');
    //redirect back to deck detail
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bodyContainer}>
          <Text style={styles.textInputTitle}>Question : </Text>
          <TestBox
            placeholder="Question"
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            onChangeText={this.handleQuestionChange}
            value={this.state.question}
          />
          <Text style={styles.textInputTitle}>Answer : </Text>
          <TestBox
            placeholder="Answer"
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            onChangeText={this.handleAnswerChange}
            value={this.state.answer}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TextButton
            style={{ backgroundColor: blue }}
            onPress={this.handleSubmit}
            disabled={this.state.question === '' || this.state.answer ==='' }>
            Submit
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
  textInputTitle: {
    paddingBottom: 5,
    paddingTop: 10,
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});

function mapStateToProps(state, props) {
  const itemId = props.route.params.itemId;
  const title = state[itemId].title;
  return {
    itemId,
    title,
  };
}
export default connect(mapStateToProps)(AddDeckCard);
