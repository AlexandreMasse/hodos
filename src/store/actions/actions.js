import { actionTypes } from './actionTypes'

// CHAPTER

export const unlockChapter = (id) => {
  return {
    type: actionTypes.CHAPTER_UNLOCK,
    id
  }
}


// CHARACTER

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


// PROGRESS
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

// PLACE

export const unlockPlace = (id) => {
  return {
    type: actionTypes.PLACE_UNLOCK,
    id
  }
}


// API & Storage
export const getPlaceList = (placeList) => ({
  type: actionTypes.GET_PLACELIST,
  placeList
});

export const getCharacterList = (characterList) => ({
  type: actionTypes.GET_CHARACTERLIST,
  characterList
});

export const getChapterList = (chapterList) => ({
  type: actionTypes.GET_CHAPTERLIST,
  chapterList
});

export const getProgress = (progress) => ({
  type: actionTypes.GET_PROGRESS,
  progress
});



