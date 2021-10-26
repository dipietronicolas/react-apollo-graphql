const initialState = {
  favCharacters: []
}

const FavsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FAV_CHAR': {
      return {
        favCharacters: [
          ...state.favCharacters, {
            id: action.payload
          }
        ]
      }
    }
    case 'REMOVE_FAV_CHAR': {
      return {
        favCharacters: state.favCharacters.filter((char) => {
          return char.id !== action.payload
        })
      }
    }
    default:
      return state;
  }
}

export default FavsReducer;