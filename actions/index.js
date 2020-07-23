import { getDecks } from '../utils/api';
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_DECK_CARD = 'ADD_DECK_CARD'
export const REMOVE_DECK='REMOVE_DECK'
export const RESET_STORE='RESET_STORE'

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks,
    };
}

export function addDeck(titleNoSpace,title){
  console.log('actions index: ',titleNoSpace);
    return {
        type: ADD_DECK,
        titleNoSpace,
        title
    };
}

export function addCardToDeck(deckId, card){
    console.log('addCardToDeck : deckId : ', deckId , ' ,card : ',card)
    return {
        type: ADD_DECK_CARD,
        deckId,
        card
    };
}

export function removeDeck(id){
  console.log("removeDeck(id) index")
  return{
    type:REMOVE_DECK,
    id
  }
}

export function resetStore(){
  return {
    type:RESET_STORE
  }
}

export function handleInitialData() {
  return dispatch => {
    return getDecks().then(decks => {
      dispatch(receiveDecks(decks));
    });
  };
}