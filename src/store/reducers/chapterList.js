import { actionTypes } from '../actions/actionTypes'

const initialState = []

const chapterList = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHAPTER_UNLOCK:
      return state.map((chapter) => {
        if (chapter.id === action.id) {
          return {
            ...state,
            isLocked: false
          }
        }
        return chapter
      })
    case actionTypes.GET_CHAPTERLIST:
      return action.chapterList.map((chapter) => {
        return {
          ...chapter,
          isLocked: chapter.isLocked !== undefined ? chapter.isLocked : true,
        }
      })
    default:
      return state
  }
}

export default chapterList
