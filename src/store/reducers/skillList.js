import { actionTypes } from '../actions/actionTypes'

const initialState = []

const skillList = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SKILL_UNLOCK:
      return state.map((skill) => {
        if (skill.id === action.id) {
          return {
            ...skill,
            isLocked: false
          }
        }
        return skill
      })
    case actionTypes.SET_SKILLLIST:
      return action.skillList.map((skill) => {
        return {
          ...skill,
          isLocked: skill.isLocked !== undefined ? skill.isLocked : true,
        }
      })
    default:
      return state
  }
}

export default skillList
