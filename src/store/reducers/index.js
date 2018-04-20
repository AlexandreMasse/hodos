import { createStore, combineReducers } from "redux"
import placeList from './placeList'
import progress from './progress'
import chapterList from './chapterList'
import characterList from './characterList'

const reducers = combineReducers({
  progress,
  placeList,
  chapterList,
  characterList
})

export const store = createStore(reducers)
