import { actionTypes } from '../actions/actionTypes'

const initialState = [
  {
    id: 1,
    name: "Hermes",
    isLocked: true,
    isAddedToMap: false
  },
  {
    id: 2,
    name: "Maia",
    isLocked: true,
    isAddedToMap: false
  },
  {
    id: 3,
    name: "Posseidon",
    isLocked: true,
    isAddedToMap: false
  },
  {
    id: 4,
    name: "Hadès",
    isLocked: true,
    isAddedToMap: false,
  }
]

const characterList = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHARACTER_ADD_TO_MAP:
      return state.map((character) => {
        if (character.id === action.id) {
          return {
            ...character,
            isAddedToMap: true
          }
        }
        return character
      })
      break;
    case actionTypes.CHARACTER_UNLOCK:
      return state.map((character) => {
        if (character.id === action.id) {
          return {
            ...character,
            isLocked: false
          }
        }
        return character
      })
      break;
    case actionTypes.SET_CHARACTERLIST:
      return action.characterList.map((character) => {
        return {
          ...character,
          isLocked: character.isLocked !== undefined ? character.isLocked : true,
          isAddedToMap: character.isAddedToMap !== undefined ? character.isAddedToMap : false,
        }
      })
    default:
      return state
  }
}

export default characterList
