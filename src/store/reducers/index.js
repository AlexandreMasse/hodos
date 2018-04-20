import { createStore, combineReducers } from "redux"
import placeList from './placeList'
import progress from './progress'
import chapterList from './chapterList'

const reducers = combineReducers({
  progress,
  placeList,
  chapterList,
})

export const store = createStore(reducers)
