import axios from "axios";
import { store } from '../reducers/index'
import { getPlaceList, getCharacterList, getChapterList } from "../actions/actions";

export const API = {
  getPlaceList() {
    console.log('getPlaceList');
    axios.get('http://hodos-crud-server.herokuapp.com/api/places').then(response => {
      store.dispatch(getPlaceList(response.data))
    }).catch(err => {
      console.log(err)
    })
  },
  getCharacterList() {
    console.log('getCharacterList');
    axios.get('http://hodos-crud-server.herokuapp.com/api/characters').then(response => {
      store.dispatch(getCharacterList(response.data))
    }).catch(err => {
      console.log(err)
    })
  },
  getChapterList() {
      console.log('getChapterList');
      axios.get('http://hodos-crud-server.herokuapp.com/api/chapters').then(response => {
        store.dispatch(getChapterList(response.data))
      }).catch(err => {
        console.log(err)
      })
    },

}
