import { store } from './reducers/index'
import { setChapterList, setPlaceList, setProgress, setCharacterList} from './actions/actions'
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
        console.log('retrieves data from API')
        API.getPlaceList()
        API.getCharacterList()
        API.getChapterList()
      }
    })
  }
}

export default storageSessionManager = new StorageSessionManager()
