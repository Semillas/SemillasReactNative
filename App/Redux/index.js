// @flow

import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

// Updates an entity cache in response to any action with response.entities.
const entities = (state = { users: {}, services: {} }, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }
  return state
}

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    login: require('./LoginRedux').reducer,
    users: require('./UsersRedux').reducer,
    feed: require('./FeedRedux').reducer,
    servicePost: require('./ServicePostRedux').reducer,
    userServices: require('./UserServicesRedux').reducer,
    form: formReducer,
    entities
  })

  return configureStore(rootReducer, rootSaga)
}
