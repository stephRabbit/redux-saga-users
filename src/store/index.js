import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

import sagas from './modules/rootSaga'
import reducers from './modules/rootReducer'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(sagas)

export default store
