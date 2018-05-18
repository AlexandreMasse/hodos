import { createStore, combineReducers } from "redux"
import placeList from './placeList'
import progress from './progress'
import chapterList from './chapterList'
import characterList from './characterList'
import skillTypeList from './skillTypeList'
import skillList from './skillList'
import { createSelector } from 'reselect'
import { Storage } from './../storage/index'


/**
 * Combines all reducers to make one
 */
const reducers = combineReducers({
  progress,
  placeList,
  chapterList,
  characterList,
  skillTypeList,
  skillList
})

export const store = createStore(reducers)

/**
 * Creates selectors on a reducer
 */
let charactersSelector = createSelector([state => state.characterList], (characterList) => {
  Storage.setCharacterList(characterList)
})

let placesSelector = createSelector([state => state.placeList], (placeList) => {
  Storage.setPlaceList(placeList)
})

let chaptersSelector = createSelector([state => state.chapterList], (chapterList) => {
  Storage.setChapterList(chapterList)
})

let progressSelector = createSelector([state => state.progress], (progress) => {
  Storage.setProgress(progress)
})

let skillListSelector = createSelector([state => state.skillList], (skillList) => {
  Storage.setSkillList(skillList)
})

let skillTypeListSelector = createSelector([state => state.skillTypeList], (skillTypeList) => {
  Storage.setSkillTypeList(skillTypeList)
})

/**
 * Subscribe to listen to updates in reducer
 */
store.subscribe( () => {
  charactersSelector(store.getState())
  placesSelector(store.getState())
  chaptersSelector(store.getState())
  progressSelector(store.getState())
  skillListSelector(store.getState())
  skillTypeListSelector(store.getState())
})
