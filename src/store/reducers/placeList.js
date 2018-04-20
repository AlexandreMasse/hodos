import { actionTypes } from '../actions/actionTypes'

const initialState = [
  {
    id: 1,
    name: 'Londres',
    isLocked: true
  },
  {
    id: 2,
    name: 'Paris',
    isLocked: true
  },
  {
    id: 3,
    name: 'Tokyo',
    isLocked: true
  },
  {
    id: 4,
    name: 'Amsterdam',
    isLocked: true
  }
]

const placeList = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLACE_UNLOCK:
      return state.map((place) => {
        if (place.id === action.id) {
          return {
            ...place,
            isLocked: false
          }
        }
        return place
      })
    default:
      return state
  }
}

export default placeList
