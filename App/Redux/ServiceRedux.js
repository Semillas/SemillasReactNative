// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  servicePostRequest: ['title', 'description', 'category', 'seedsPrice', 'uuid'],
  servicePostSuccess: [],
  servicePostFailure: null,
  serviceRequest: ['uuid'],
  serviceSuccess: ['service'],
  serviceFailure: null,

})

export const ServiceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  uuid: null,
  items: {},
  fetchingService: null,
})

/* ------------- Reducers ------------- */

// request the service with a given url.
export const servicePostRequest = (state: Object, action : Object) =>
{
  debugger;
  return Object.assign({}, state, { fetching: true })
}
// successful service lookup
export const servicePostSuccess = (state: Object, action: Object) => {
  return Object.assign({}, state, { fetching: false, error: null })
}

// failed to get the service
export const servicePostFailure = (state: Object) =>
  Object.assign({}, state, { fetching: false, error: true })

// request the service with a given url.
export const serviceRequest = (state: Object, { uuid }: Object) =>
  Object.assign({}, state, { fetchingService: true })

// successful service lookup
export const serviceSuccess = (state: Object, action: Object) => {
  const { service } = action
  var currentItems = {}
  currentItems[service.uuid] = service

  var allItems = Object.assign({}, state.items, currentItems)

  return Object.assign({}, state, { fetchingService: false, error: null, items: allItems })
}

// failed to get the service
export const serviceFailure = (state: Object) =>
  Object.assign({}, state, { fetchingService: false, error: true })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SERVICE_POST_REQUEST]: servicePostRequest,
  [Types.SERVICE_POST_SUCCESS]: servicePostSuccess,
  [Types.SERVICE_POST_FAILURE]: servicePostFailure,
  [Types.SERVICE_REQUEST]: serviceRequest,
  [Types.SERVICE_SUCCESS]: serviceSuccess,
  [Types.SERVICE_FAILURE]: serviceFailure

})
