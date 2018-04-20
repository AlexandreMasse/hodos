import { actionTypes } from '../actions/actionTypes'

const initialState = [
  {
    id: 1,
    name: "Chapitre 1",
    isLocked: true,
  },
  {
    id: 2,
    name: "Chapitre 2",
    isLocked: true,
  },
  {
    id: 3,
    name: "Chapitre 3",
    isLocked: true,
  },
  {
    id: 4,
    name: "Chapitre 4",
    isLocked: true,
  }
]

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
    default:
      return state
  }
}

export default chapterList
