
import { AsyncStorage } from 'react-native'
import characterList from '../reducers/characterList';

const CHAPTERLIST_KEY = '@HODOS:CHAPTER_LIST'
const CHARACTERLIST_KEY = '@HODOS:CHARACTER_LIST'
const PLACELIST_KEY = '@HODOS:PLACELIST_LIST'
const PROGRESS_KEY = '@HODOS:PROGRESS_LIST'
const SKILLLIST_KEY = '@HODOS:SKILL_LIST'
const SKILLTYPELIST_KEY = '@HODOS:SKILL_TYPE_LIST'

export const Storage = {
  async hasSavedData() {
    try {
      const storage = await AsyncStorage.getAllKeys()
      if (storage.length)
        return true
      return false
    } catch (error) {
      console.log('AsyncStorage : error in hasSavedData => ', error)
    }
  },
  async setPlaceList(placeList) {
    try {
      await AsyncStorage.setItem(PLACELIST_KEY, JSON.stringify(placeList))
    } catch (error) {
      console.log('AsyncStorage : error in setPlaceList => ', error)
    }
  },
  async setCharacterList(characterList) {
    try {
      await AsyncStorage.setItem(CHARACTERLIST_KEY, JSON.stringify(characterList))
    } catch (error) {
      console.log('AsyncStorage : error in setCharacterList => ', error)
    }
  },
  async setChapterList(chapterList) {
    try {
      await AsyncStorage.setItem(CHAPTERLIST_KEY, JSON.stringify(chapterList))
    } catch (error) {
      console.log('AsyncStorage : error in setChapterList => ', error)
    }
  },
  async setProgress(progress) {
    try {
      await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
    } catch (error) {
      console.log('AsyncStorage : error in setProgress => ', error)
    }
  },
  async setSkillList(skillList) {
    try {
      await AsyncStorage.setItem(SKILLLIST_KEY, JSON.stringify(skillList))
    } catch (error) {
      console.log('AsyncStorage : error in setSkillList => ', error)
    }
  },
  async setSkillTypeList(skillTypeList) {
    try {
      await AsyncStorage.setItem(SKILLTYPELIST_KEY, JSON.stringify(skillTypeList))
    } catch (error) {
      console.log('AsyncStorage : error in setSkillList => ', error)
    }
  },
  async getPlaceList () {
    try {
      const placeList =  await AsyncStorage.getItem(PLACELIST_KEY)

      if (placeList !== null)
        return JSON.parse(placeList)

    } catch (error) {
      console.log('AsyncStorage : error in getPlaceList => ', error)
    }
  },
  async getCharacterList() {
    try {
      const characterList =  await AsyncStorage.getItem(CHARACTERLIST_KEY)

      if (characterList !== null)
        return JSON.parse(characterList)

    } catch (error) {
      console.log('AsyncStorage : error in getCharacterList => ', error)
    }
  },
  async getChapterList() {
    try {
      const chapterList =  await AsyncStorage.getItem(CHAPTERLIST_KEY)
      if (chapterList !== null)
        return JSON.parse(chapterList)

    } catch (error) {
      console.log('AsyncStorage : error in getChapterList => ', error)
    }
  },
  async getProgress() {
    try {
      const progress =  await AsyncStorage.getItem(PROGRESS_KEY)

      if (progress !== null)
        return JSON.parse(progress)

    } catch (error) {
      console.log('AsyncStorage : error in getProgress => ', error)
    }
  },
  async getSkillList() {
    try {
      const skillList =  await AsyncStorage.getItem(SKILLLIST_KEY)

      if (skillList !== null)
        return JSON.parse(skillList)

    } catch (error) {
      console.log('AsyncStorage : error in getSkillList => ', error)
    }
  },
  async getSkillTypeList() {
    try {
      const skillTypeList =  await AsyncStorage.getItem(SKILLTYPELIST_KEY)

      if (skillTypeList !== null)
        return JSON.parse(skillTypeList)

    } catch (error) {
      console.log('AsyncStorage : error in getSkillTypeList => ', error)
    }
  },
  async clearStorage() {
    try {
      const keys = [CHAPTERLIST_KEY, PROGRESS_KEY, CHARACTERLIST_KEY, PLACELIST_KEY, SKILLLIST_KEY, SKILLTYPELIST_KEY]
      AsyncStorage.multiRemove(keys)
    } catch (error) {
      console.log('AsyncStorage : error in clearStorage => ', error)
    }
  }
}
