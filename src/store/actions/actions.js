import { actionTypes } from './actionTypes'

export const incrementChapter = () => {
  return {
    type: actionTypes.PROGRESS_INCREMENT_CHAPTER
  }
}

export const incrementSlide = () => {
  return {
    type: actionTypes.PROGRESS_INCREMENT_SLIDE
  }
}
