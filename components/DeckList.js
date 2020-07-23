import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { gray, white } from '../utils/colors';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import DeckDetail from './DeckDetail';
import AddDeckCard from './AddDeckCard';
import { handleInitialData } from '../actions/index';

function Deck(item) {
  const deckCardCount = item.questions.length;
  return (
    <View style={styles.row}>
      <View style={styles.row_text}>
        <Text style={[styles.deck_title, { fontSize: 20 }]}>{item.title}</Text>
        <Text style={[styles.deck_cards, { fontSize: 16, color: gray }]}>
          {deckCardCount > 1 ? (
            <Text>{deckCardCount} Cards</Text>
          ) : (
            <Text>{deckCardCount} Card</Text>
          )}
        </Text>
      </View>
    </View>
  );
}

class DeckList extends Component {
  renderItem = ({ item }) => {
    const { decks, navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('DeckDetail', { itemId: item })}>
        <Deck {...decks[item]} />
      </TouchableOpacity>
    );
  };
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    //const decks =getDecks()
    const { decks } = this.props;
    console.log('redner() ', decks);
    return (
      <View style={styles.container}>
        <FlatList
          ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
          data={Object.keys(decks)}
          renderItem={this.renderItem}
          keyExtractor={(decks,index)=>index.toString()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    height: 100,
    backgroundColor: white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
    // borderStyle: 'solid',
    // borderColor: gray,
    // borderBottomWidth: 1,
  },
  row_text: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  deck_title: {
    padding: 2,
  },
  deck_cards: {
    padding: 1,
  },
});

function mapStateToProps(state) {
  const decks = state;
  return {
    decks: state,
  };
}
export default connect(mapStateToProps, { handleInitialData })(DeckList);
