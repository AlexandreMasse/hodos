import { actionTypes } from '../actions/actionTypes'

const initialState = {
  chapter: 0,
  chapterRoman: 'I',
  currentOffset: 0,
  percent: 0,
  place: null
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
        currentOffset: action.currentOffset,
        percent: action.percent
      }
    case actionTypes.PROGRESS_SET_CHAPTER:
      return {
        ...state,
        chapter: action.chapter
      }
    case actionTypes.PROGRESS_SET_CHAPTER_ROMAN:
      return {
        ...state,
        chapterRoman: action.chapterRoman
      }
    case actionTypes.PROGRESS_SET_PLACE:
      return {
        ...state,
        place: action.place
      }
    case actionTypes.SET_PROGRESS:
      return action.progress
    default:
      return state
  }

}

export default progress
