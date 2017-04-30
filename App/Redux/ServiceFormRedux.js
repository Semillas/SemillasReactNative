// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  servicePostRequest: ['title', 'description', 'category'],
  servicePostSuccess: [],
  servicePostFailure: null
})

export const ServiceFormTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  uuid: null
})

/* ------------- Reducers ------------- */

//// request the user for a uuid
//export const request = (state: Object, { uuid }: Object) =>
//  state.merge({ fetching: true, uuid })
//
//// successful user lookup
//export const success = (state: Object, action: Object) => {
//  const { user } = action
//  const entities = {}
//  entities[user['uuid']] = user
//  return state.merge({ fetching: false, error: null, entities: entities })
//}
//
//// failed to get the user
//export const failure = (state: Object) =>
//  state.merge({ fetching: false, error: true })
//

// request the service with a given url.
export const servicePostRequest = (state: Object, { uuid }: Object) =>
  Object.assign({}, state, { postingService: true })

// successful service lookup
export const servicePostSuccess = (state: Object, action: Object) => {
  return Object.assign({}, state, { postingService: false, error: null })
}

// failed to get the service
export const servicePostFailure = (state: Object) =>
  Object.assign({}, state, { postingService: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SERVICE_POST_REQUEST]: servicePostRequest,
  [Types.SERVICE_POST_SUCCESS]: servicePostSuccess,
  [Types.SERVICE_POST_FAILURE]: servicePostFailure
})
