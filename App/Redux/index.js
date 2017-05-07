// @flow

import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    temperature: require('./TemperatureRedux').reducer,
    login: require('./LoginRedux').reducer,
    search: require('./SearchRedux').reducer,
    users: require('./UsersRedux').reducer,
    feed: require('./FeedRedux').reducer,
    servicePost: require('./ServicePostRedux').reducer,
    form: formReducer
  })

  return configureStore(rootReducer, rootSaga)
}
