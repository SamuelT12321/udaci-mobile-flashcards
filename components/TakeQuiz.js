import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { blue, red, green } from '../utils/colors';
import { handleSetLocalNotification } from '../utils/helpers'
import TextButton from './TextButton';
const SCREEN = {
  QUESTION: 'question',
  ANSWER: 'answer',
  RESULT: 'result',
};

const ANSWER = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
};

export class TakeQuiz extends Component {
  state = {
    currentQuestion: 0,
    show: SCREEN.QUESTION,
    correct: 0,
    incorrect: 0,
  };

  handleCorrectAnswer = () => {
    const { currentQuestion, correct } = this.state;
    this.setState({
      show: SCREEN.QUESTION,
      currentQuestion: currentQuestion + 1,
      correct: correct + 1,
    });
  };

  handleIncorrectAnswer = () => {
    const { currentQuestion, incorrect } = this.state;
    this.setState({
      show: SCREEN.QUESTION,
      currentQuestion: currentQuestion + 1,
      incorrect: incorrect + 1,
    });
  };
  handleStartOver = () => {
    this.setState({
      currentQuestion: 0,
      show: SCREEN.QUESTION,
      correct: 0,
      incorrect: 0,
    })
  }
  handleGoBack=()=>{
    this.props.navigation.goBack()
  }
  render() {
    const { deck } = this.props;
    const { currentQuestion, show, currect, incorrect } = this.state;
    const card = deck.questions[currentQuestion];
    const totalQuestion = deck.questions.length;

    if (totalQuestion === currentQuestion) {
      handleSetLocalNotification()
      return (
        <View style={styles.container}>
          <View style={styles.pageStyle}>
              <Text style={{fontSize:30, paddingBottom:10}}>
                Quiz Result
              </Text>
              <Text style={{ fontSize: 20, paddingBottom:10}}>
                Correct: {this.state.correct}
              </Text>
              <Text style={{ fontSize: 20}}>
                Incorrect: {this.state.incorrect}
              </Text>
          </View>

          <View style={styles.bottomContainer}>
            <TextButton
              style={{ backgroundColor: green }}
              onPress={this.handleGoBack}>
              Go Back
            </TextButton>
            <TextButton
              style={{ backgroundColor: red }}
              onPress={this.handleStartOver}>
              Start Over
            </TextButton>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View>
          <Text>
            {currentQuestion + 1}/{totalQuestion}
          </Text>
        </View>

        <View style={styles.pageStyle}>
          {show === 'question' ? (
            <View style={styles.pageStyle}>
              <Text style={{ fontSize: 30 }}>{card.question}</Text>
              <TouchableOpacity
                onPress={() => this.setState({ show: SCREEN.ANSWER })}>
                <Text style={{ fontSize: 20, color: red }}>Answer</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.pageStyle}>
              <Text style={{ fontSize: 30 }}>{card.answer}</Text>
              <TouchableOpacity
                onPress={() => this.setState({ show: SCREEN.QUESTION })}>
                <Text style={{ fontSize: 20, color: red }}>Question</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.bottomContainer}>
          <TextButton
            style={{ backgroundColor: green }}
            onPress={this.handleCorrectAnswer}>
            Correct
          </TextButton>
          <TextButton
            style={{ backgroundColor: red }}
            onPress={this.handleIncorrectAnswer}>
            Incorrect
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
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  pageStyle: {
    alignItems: 'center',
    padding: 20,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

const mapStateToProps = (state, props) => {
  const itemId = props.route.params.itemId;
  const deck = state[itemId];
  return {
    deck,
  };
};

export default connect(mapStateToProps)(TakeQuiz);
