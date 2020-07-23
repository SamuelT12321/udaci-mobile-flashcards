import { AsyncStorage } from 'react-native';
import { decks } from './_DATA';

const DECKS_STORAGE_KEY = 'MobileFlashcards:decks';

export async function getDecks() {
  try {
    const storeResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

    if (storeResults === null) {
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
    }
    return storeResults === null ? decks : JSON.parse(storeResults);
  } catch (err) {
    console.log(err);
  }
}

export async function getDeck(id) {
  try {
    const storeResults = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    return JSON.parse(storeResults)[id];
  } catch (err) {
    console.log(err);
  }
}

export async function addDeckAsyncStoreage(titleNoSpace,title) {
  try {
    await AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [titleNoSpace]: {
          title,
          questions: []
        }
      })
    )
  } catch (err) {
    console.log(err);
  }
}

export async function addCardToDeckAsyncStoreage(deckId, card){
  try{
    const deck = await getDeck(deckId)

    await AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [deckId]:{
          questions:[...deck.questions].concat(card)
        }
      })
    )
  }catch (err){
    console.log(err);
  }
}
export async function removeDeckAsyncStoreage(itemId) {
  console.log("removeDeckAS")
  try {
    const results = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    const data = JSON.parse(results);
    data[itemId] = undefined;
    delete data[itemId];
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
    console.log("removeDeckAS"+JSON.stringify(data))
    console.log("removeDeckAS finsihed")
  } catch (err) {
    console.log(err);
  }
}

export async function resetDecks() {
  try {
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
  } catch (err) {
    console.log(err);
  }
}