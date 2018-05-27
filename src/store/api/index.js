import axios from "axios";
import { store } from '../reducers/index'
import { setPlaceList, setCharacterList, setChapterList, setSkillList, setSkillTypeList } from "../actions/actions";

/**
 * Store data from API in reducers, by dispatching a set action
 */
export const API = {
  getPlaceList() {
    return new Promise((resolve, reject) => {
      axios.get('http://leatanda.fr/hodos-api/api/places/index.php').then(response => {
        store.dispatch(setPlaceList(response.data))
        resolve(response.data)
      }).catch(err => {
        console.log('API CALL : error in getPlaceList =>', err)
      })
    })
  },
  getCharacterList() {
    return new Promise((resolve, reject) => {
      axios.get('http://leatanda.fr/hodos-api/api/characters/index.php').then(response => {
        store.dispatch(setCharacterList(response.data))
        resolve(response.data)
      }).catch(err => {
        console.log('API CALL : error in getCharacterList => ', err)
      })
    })
  },
  getChapterList() {
    return new Promise((resolve, reject) => {
      axios.get('http://leatanda.fr/hodos-api/api/chapters/index.php').then(response => {
        store.dispatch(setChapterList(response.data))
        resolve(response.data)
      }).catch(err => {
        console.log('API CALL : error in getChapterList => ', err)
      })
    })
  },
  getSkillList() {
    return new Promise((resolve, reject) => {
      axios.get('http://leatanda.fr/hodos-api/api/skills/index.php').then(response => {
        store.dispatch(setSkillList(response.data))
        resolve(response.data)
      }).catch(err => {
        console.log('API CALL : error in getSkillList => ', err)
      })
    })
  },
  getSkillTypeList() {
    return new Promise((resolve, reject) => {
      axios.get('http://leatanda.fr/hodos-api/api/skillTypes/index.php').then(response => {
        store.dispatch(setSkillTypeList(response.data))
        resolve(response.data)
      }).catch(err => {
        console.log('API CALL : error in getSkillTypesList => ', err)
      })
    })
  }

}
