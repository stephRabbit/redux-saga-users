import { UserTypes } from './types'

const INITIAL_STATE = {
  items: [],
  error: ''
}

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UserTypes.GET_USERS_SUCCESS:
      return { ...state, items: action.payload.items }
    case UserTypes.USERS_ERROR:
      return { ...state, error: action.payload.error }
    default:
      return state
  }
}