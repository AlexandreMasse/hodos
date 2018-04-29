import axios from "axios";
import { store } from '../reducers/index'
import { setPlaceList, setCharacterList, setChapterList } from "../actions/actions";

export const API = {
  getPlaceList() {
    console.log('getPlaceList');
    axios.get('http://hodos-crud-server.herokuapp.com/api/places').then(response => {
      store.dispatch(setPlaceList(response.data))
    }).catch(err => {
      console.log(err)
    })
  },
  getCharacterList() {
    console.log('getCharacterList');
    axios.get('http://hodos-crud-server.herokuapp.com/api/characters').then(response => {
      store.dispatch(setCharacterList(response.data))
    }).catch(err => {
      console.log(err)
    })
  },
  getChapterList() {
      console.log('getChapterList');
      axios.get('http://hodos-crud-server.herokuapp.com/api/chapters').then(response => {
        store.dispatch(setChapterList(response.data))
      }).catch(err => {
        console.log(err)
      })
    },

}
