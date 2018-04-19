import { actionTypes } from './actionTypes'

export const incrementChapter = () => {
  return {
    type: actionTypes.INCREMENT_CHAPTER
  }
}

export const incrementSlide = () => {
  return {
    type: actionTypes.INCREMENT_SLIDE
  }
}
