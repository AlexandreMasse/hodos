import { actionTypes } from '../actions/actionTypes'

const initialState = {
  chapter: 0,
  slide: 0,
}

const progress = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROGRESS_INCREMENT_CHAPTER:
      return {
        ...state,
        chapter: state.chapter + 1,
        slide: 0
      }
    case actionTypes.PROGRESS_INCREMENT_SLIDE:
      return {
        ...state,
        slide: state.slide + 1
      }
    case actionTypes.SET_PROGRESS:
      return action.progress
    default:
      return state
  }

}

export default progress
