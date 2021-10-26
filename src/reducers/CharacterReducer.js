const initialState = {
  characters: []
}

const CharacterReducer = (state = initialState, action) => {
  switch(action.type){
    case 'ADD_CHARACTERS': {
      return {
        characters: [ ...action.payload ]
      }
    }
    case 'REMOVE_CHARACTER_BY_ID': {
      return {
        characters: state.characters.filter((character) => {
          return character.id !== action.payload
        })
      }
    }
    default: return state;
  }
}

export default CharacterReducer;