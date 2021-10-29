const initialState = {
  favCharacters: []
}

const FavsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FAV_CHAR': {
      localStorage.setItem('favs',
        localStorage.getItem('favs')
          ? JSON.stringify([...JSON.parse(localStorage.getItem('favs')), { id: action.payload }])
          : JSON.stringify([{ id: action.payload }])
      )
      return {
        favCharacters: [
          ...state.favCharacters, {
            id: action.payload
          }
        ]
      }
    }
    case 'REMOVE_FAV_CHAR': {
      const newState = state.favCharacters.filter((char) => {
        return char.id !== action.payload
      })
      localStorage.setItem('favs', JSON.stringify(newState))
      return {
        favCharacters: newState
      }
    }
    case 'LOAD_ON_INIT': {
      return {
        favCharacters: action.payload
      }
    }
    default:
      return state;
  }
}

export default FavsReducer;