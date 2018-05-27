import { actionTypes } from '../actions/actionTypes'

const initialState = {
  chapter: 0,
  currentOffset: 0
}

const progress = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROGRESS_INCREMENT_CHAPTER:
      return {
        ...state,
        chapter: state.chapter + 1,
        currentOffset: 0
      }
    case actionTypes.PROGRESS_CURRENT_OFFSET:
      return {
        ...state,
        currentOffset: action.currentOffset
      }
    case actionTypes.PROGRESS_SET_CHAPTER:
      console.log('progress reducer =>', action.chapter)
      return {
        ...state,
        chapter: action.chapter
      }
    case actionTypes.SET_PROGRESS:
      return action.progress
    default:
      return state
  }

}

export default progress
