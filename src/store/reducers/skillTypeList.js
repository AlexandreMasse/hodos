import { actionTypes } from '../actions/actionTypes'

const initialState = []

const skillTypeList = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SKILLTYPELIST:
      return action.skillTypeList.map((skillType) => {
        return {
          ...skillType,
          isLocked: skillType.isLocked !== undefined ? skillType.isLocked : true,
        }
      })
    default:
      return state
  }
}

export default skillTypeList
