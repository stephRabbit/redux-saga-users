import { all } from 'redux-saga/effects'
import UsersSaga from './users/sagas'

export default function* rootSaga() {
  yield all([
    ...UsersSaga
  ])
}