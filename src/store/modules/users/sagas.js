import {
  take,
  takeEvery,
  takeLatest,
  call,
  fork,
  put
} from 'redux-saga/effects'

import { UserTypes } from './types'
import * as actions from './actions'
import * as api from '../../../services/users'

// Worker - run as a result of changes is UserTypes.GET_USERS_REQUEST
function* getUsers() {
  try {
    const result = yield call(api.getUsers)
    yield put(actions.getUsersSuccess({ items: result.data.data }))
  } catch (error) {
    yield put(
      actions.usersError({
        error: 'An Error occurred when attempting to fetch users'
      })
    )
    console.error(error)
  }
}

// Watcher - UserTypes.GET_USERS_REQUEST for changes then
// execute getUsers
function* watchGetUsersRequest() {
  yield takeEvery(UserTypes.GET_USERS_REQUEST, getUsers)
}

// Worker - run as a result of changes is UserTypes.CREATE_USER_REQUEST
function* createUser(action) {
  try {
    const { firstName, lastName } = action.payload
    // Make call to api to create a user, then
    // call getUsers worker saga for the updated list
    yield call(api.createUser, { firstName, lastName })
    yield call(getUsers)
  } catch (error) {
    yield put(
      actions.usersError({
        error: 'An error occurred when attempting to creating user'
      })
    )
    console.error(error)
  }
}

function* watchCreateUsersRequest() {
  yield takeLatest(UserTypes.CREATE_USER_REQUEST, createUser)
}

function* deleteUser({ userId }) {
  try {
    // Make call to api to delete a user, then
    // call getUsers worker saga for the updated list
    yield call(api.deleteUser, userId)
    yield call(getUsers)
  } catch (error) {
    yield put(
      actions.usersError({
        error: 'An Error occurred when attempting to deleting user'
      })
    )
    console.error(error)
  }
}

function* watchDeleteUserRequest() {
  // Once UserTypes.DELETE_USER_REQUEST been dispatched,
  // it is unable to enter the loop till everything is resolved
  while (true) {
    // Take returns the action that was dispatched
    const action = yield take(UserTypes.DELETE_USER_REQUEST)
    yield call(deleteUser, { userId: action.payload.userId })
  }
}

// Forks - run process in parallel
const usersSaga = [
  fork(watchGetUsersRequest),
  fork(watchCreateUsersRequest),
  fork(watchDeleteUserRequest)
]

export default usersSaga
