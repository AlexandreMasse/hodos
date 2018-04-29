import { actionTypes } from '../actions/actionTypes'

const initialState = []

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
    case actionTypes.GET_PLACELIST:
      return action.placeList.map((place) => {
        return {
          ...place,
          isLocked: place.isLocked !== undefined  ? place.isLocked : true,
        }
      })
    default:
      return state
  }
}

export default placeList
