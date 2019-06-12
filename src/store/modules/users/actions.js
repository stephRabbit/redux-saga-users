import { UserTypes } from './types'

export const getUsersRequest = () => ({
  type: UserTypes.GET_USERS_REQUEST
})

export const getUsersSuccess = ({ items }) => ({
  type: UserTypes.GET_USERS_SUCCESS,
  payload: { items }
})

export const createUserRequest = ({ firstName, lastName }) => ({
  type: UserTypes.CREATE_USER_REQUEST,
  payload: {
    firstName,
    lastName
  }
})

export const deleteUserRequest = userId => ({
  type: UserTypes.DELETE_USER_REQUEST,
  payload: { userId }
})

export const usersError = ({ error }) => ({
  type: UserTypes.USERS_ERROR,
  payload: { error }
})
