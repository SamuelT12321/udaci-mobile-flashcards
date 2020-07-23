import { RECEIVE_DECKS, 
          ADD_DECK, 
          ADD_DECK_CARD,
          REMOVE_DECK,
          RESET_STORE } from '../actions/index';
import { decks as INITIAL_STATE } from '../utils/_DATA';

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };

    case ADD_DECK:
      var { titleNoSpace ,title } = action;
      return {
        ...state,
        [titleNoSpace]: {
          title,
          questions: []
        }
      };

    case ADD_DECK_CARD:
      var { deckId, card } = action;
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          questions: [...state[deckId].questions].concat(card)
        }
      };

    case REMOVE_DECK:
    console.log("REMOVE_DECK")
      var { id } = action;
      var { [id]: value, ...remainingDecks } = state;
      return remainingDecks;

    case RESET_STORE:
      return INITIAL_STATE;

    default:
      return state;
  }
}
