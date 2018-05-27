import { actionTypes } from './actionTypes'

// CHAPTER
export const unlockChapter = (id) => {
  return {
    type: actionTypes.CHAPTER_UNLOCK,
    id
  }
}

// SKILL
export const unlockSkill = (id) => {
  return {
    type: actionTypes.SKILL_UNLOCK,
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

export const currentOffsetProgress = (currentOffset) => {
  return {
    type: actionTypes.PROGRESS_CURRENT_OFFSET,
    currentOffset
  }
}

export const setChapterProgress = (chapter) => {
  console.log('ACTIONS SETCHAPTERPROGRESS => ', chapter)
  return {
    type: actionTypes.PROGRESS_SET_CHAPTER,
    chapter
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
export const setPlaceList = (placeList) => ({
  type: actionTypes.SET_PLACELIST,
  placeList
});

export const setCharacterList = (characterList) => ({
  type: actionTypes.SET_CHARACTERLIST,
  characterList
});

export const setChapterList = (chapterList) => ({
  type: actionTypes.SET_CHAPTERLIST,
  chapterList
});

export const setProgress = (progress) => ({
  type: actionTypes.SET_PROGRESS,
  progress
});

export const setSkillList = (skillList) => ({
  type: actionTypes.SET_SKILLLIST,
  skillList
});

export const setSkillTypeList = (skillTypeList) => ({
  type: actionTypes.SET_SKILLTYPELIST,
  skillTypeList
});



