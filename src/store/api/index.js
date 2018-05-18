import axios from "axios";
import { store } from '../reducers/index'
import { setPlaceList, setCharacterList, setChapterList, setSkillList, setSkillTypeList } from "../actions/actions";

/**
 * Store data from API in reducers, by dispatching a set action
 */
export const API = {
  getPlaceList() {
    axios.get('http://leatanda.fr/hodos-api/api/places').then(response => {
      store.dispatch(setPlaceList(response.data))
    }).catch(err => {
      console.log('API CALL : error in getPlaceList =>', err)
    })
  },
  getCharacterList() {
    axios.get('http://leatanda.fr/hodos-api/api/characters').then(response => {
      store.dispatch(setCharacterList(response.data))
    }).catch(err => {
      console.log('API CALL : error in getCharacterList => ', err)
    })
  },
  getChapterList() {
    axios.get('http://leatanda.fr/hodos-api/api/chapters').then(response => {
      store.dispatch(setChapterList(response.data))
    }).catch(err => {
      console.log('API CALL : error in getChapterList => ', err)
    })
  },
  getSkillList() {
    axios.get('http://leatanda.fr/hodos-api/api/skills').then(response => {
      store.dispatch(setSkillList(response.data))
    }).catch(err => {
      console.log('API CALL : error in getSkillList => ', err)
    })
  },
  getSkillTypeList() {
    axios.get('http://leatanda.fr/hodos-api/api/skillTypes').then(response => {
      store.dispatch(setSkillTypeList(response.data))
    }).catch(err => {
      console.log('API CALL : error in getSkillTypesList => ', err)
    })
  }

}
