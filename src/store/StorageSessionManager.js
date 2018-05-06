import { store } from './reducers/index'
import { setChapterList, setPlaceList, setProgress, setCharacterList} from './actions/actions'
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
        Storage.getCharacterList().then( characterList => {
          store.dispatch(setCharacterList(characterList))
        })
        Storage.getPlaceList().then( placeList => {
          store.dispatch(setPlaceList(placeList))
        })
        Storage.getChapterList().then( chapterList => {
          store.dispatch(setPlaceList(chapterList))
        })
        Storage.getProgress().then( progress => {
          store.dispatch(setProgress(progress))
        })
      } else {
        //If there's no local storage (1st app launch), gets data from API
        this.getDataFromApi()
      }
    })
  }

  clearStorage() {
    Storage.clearStorage()
  }

  getDataFromApi() {
    API.getPlaceList()
    API.getCharacterList()
    API.getChapterList()
  }
}

export default storageSessionManager = new StorageSessionManager()
