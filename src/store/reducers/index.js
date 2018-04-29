import { createStore, combineReducers } from "redux"
import placeList from './placeList'
import progress from './progress'
import chapterList from './chapterList'
import characterList from './characterList'
import { createSelector } from 'reselect'
import { Storage } from './../storage/index'

const reducers = combineReducers({
  progress,
  placeList,
  chapterList,
  characterList
})

export const store = createStore(reducers)

let charactersSelector = createSelector([state => state.characterList], (characterList) => {
  // console.log('update character list')
  Storage.setCharacterList(characterList)
  //Storage.getCharacterList().then(characterList => console.log(characterList))
})

let placesSelector = createSelector([state => state.placeList], (placeList) => {
  // console.log('update de places')
  Storage.setPlaceList(placeList)
})

let chaptersSelector = createSelector([state => state.chapterList], (chapterList) => {
  // console.log('update de chapters')
  Storage.setChapterList(chapterList)
})

let progressSelector = createSelector([state => state.progress], (progress) => {
  Storage.setProgress(progress)
})

store.subscribe( () => {
  charactersSelector(store.getState())
  placesSelector(store.getState())
  chaptersSelector(store.getState())
  progressSelector(store.getState())
})
