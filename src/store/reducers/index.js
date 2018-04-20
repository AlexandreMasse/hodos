import { createStore, combineReducers } from "redux"
import placeList from './placeList'
import progress from './progress'

const reducers = combineReducers({
  progress,
  placeList
})

export const store = createStore(reducers)
