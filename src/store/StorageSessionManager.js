import { store } from './reducers/index'
import { setChapterList, setPlaceList, setProgress, setCharacterList, setSkillList, setSkillTypeList, setChapterProgress, unlockSkill, unlockCharacter, unlockPlace, unlockChapter, setPlaceProgress, setChapterRomanProgress, currentOffsetProgress} from './actions/actions'
import { API } from './api/index'
import { Storage } from './storage/index'

class StorageSessionManager {
  constructor() {

  }
  setDataForSession() {

    //When App launches, check if there's local storage
    Storage.hasSavedData().then( data => {
      //If so, we use it by passing sending an action that will be interpreted into the reducer
      if (data) {
        console.log('StorageSessionManager : get data from storage')
        Storage.getCharacterList().then( characterList => {
          store.dispatch(setCharacterList(characterList))
        })
        Storage.getPlaceList().then( placeList => {
          store.dispatch(setPlaceList(placeList))
        })
        Storage.getChapterList().then( chapterList => {
          store.dispatch(setChapterList(chapterList))
        })
        Storage.getProgress().then( progress => {
          store.dispatch(setProgress(progress))
        })
        Storage.getSkillList().then( skillList => {
          store.dispatch(setSkillList(skillList))
        })
        Storage.getSkillTypeList().then( skillTypeList => {
          console.log(JSON.stringify(skillTypeList))
          store.dispatch(setSkillTypeList(skillTypeList))
        })
      } else {
        //If there's no local storage (1st app launch ever), gets data from API
        this.getDataFromApi()
      }
    })
  }

  clearStorage() {
    Storage.clearStorage()
  }

  getDataFromApi(chapterId) {
    console.log('StorageSessionManager : get data from api')
    Promise.all([
      API.getPlaceList(),
      API.getCharacterList(),
      API.getChapterList(),
      API.getSkillList(),
      API.getSkillTypeList()
    ]).then((values) => {
      this.setCurrentHodosProgress(chapterId, values[2], values[0])
    })
  }

  setCurrentHodosProgress (chapterId, chapterList, placeList) {
    const chapterProgress = chapterId ? chapterId : 26
    if (chapterProgress) {
      store.dispatch(setChapterProgress(chapterProgress))
      store.dispatch(setChapterRomanProgress('XXVII'))
      store.dispatch(currentOffsetProgress(0, 0))
      // const chapterList = values[2]
      const storeSkill = store.getState().skillList

      chapterList.forEach(chapter => {
        if (chapter.id <= chapterProgress) {
          //Unlock chapter
          store.dispatch(unlockChapter(chapter.id))
          //Unlock discovered skills
          if (chapter.skillDiscovered && chapter.skillDiscovered.length) {
            chapter.skillDiscovered.forEach(skill => {
              store.dispatch(unlockSkill(skill))
            })
          }
          //Unlock discovered characters
          if (chapter.charactersDiscovered && chapter.charactersDiscovered.length) {
            chapter.charactersDiscovered.forEach(character => {
              store.dispatch(unlockCharacter(character))
            })
          }
        }
      })

      //Set discovered places
      // const placeList = values[0]
      placeList.forEach(place => {
        if (place.chapters && place.chapters.length) {
          place.chapters.forEach(chapter => {
            if (chapter <= chapterProgress) {
              store.dispatch(unlockPlace(place.id))
            }
            if (chapter == chapterProgress) {
              store.dispatch(setPlaceProgress(place.id))
            }
          })
        }
      })
    }
  }
}

export default storageSessionManager = new StorageSessionManager()
