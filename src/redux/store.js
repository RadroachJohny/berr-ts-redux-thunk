import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction'

import rootReducer from './reducers/index'

export const configureStore = () => {

  return createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunk),
    ),
  )
}