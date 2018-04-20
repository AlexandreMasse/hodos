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

export const unlockPlace = (id) => {
  return {
    type: actionTypes.PLACE_UNLOCK,
    id
  }
}

export const unlockChapter = (id) => {
  return {
    type: actionTypes.CHAPTER_UNLOCK,
    id
  }
}

export const unlockCharacter = (id) => {
  return {
    type: actionTypes.CHARACTER_UNLOCK,
    id
  }
}

export const addCharacterToMap = (id) => {
  return {
    type: actionTypes.CHARACTER_ADD_TO_MAP,
    id
  }
}



