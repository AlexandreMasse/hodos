import { store } from './reducers/index'
import { getChapterList, getPlaceList, getProgress, getCharacterList} from './actions/actions'
import { API } from './api/index'
import { Storage } from './storage/index'

class StorageSessionManager {
  constructor() {

  }
  setDataForSession() {
    Storage.hasSavedData().then( data => {
      if (data) {
        console.log('retrieves data from storage')
        Storage.getCharacterList().then( characterList => {
          store.dispatch(getCharacterList(characterList))
        })
        Storage.getPlaceList().then( placeList => {
          store.dispatch(getPlaceList(placeList))
        })
        Storage.getChapterList().then( chapterList => {
          store.dispatch(getPlaceList(chapterList))
        })
        Storage.getProgress().then( progress => {
          store.dispatch(getProgress(progress))
        })
      } else {
        console.log('retrieves data from API')
        API.getPlaceList()
        API.getCharacterList()
        API.getChapterList()
      }
    })
  }
}

export default storageSessionManager = new StorageSessionManager()
