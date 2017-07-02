// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  geoRequest: null,
  geoSuccess: ['position'],
  geoFailure: null
})

export const geoTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  position: null,
  fetching: null,
  error: null,
  requestFinished: false
})

/* ------------- Reducers ------------- */

// request the user for a uuid
export const request = (state: Object) =>
  state.merge({ fetching: true, requestFinished: false })

// successful user lookup
export const success = (state: Object, action: Object) => {
  const { position } = action
  return state.merge({
    fetching: false,
    error: null,
    requestFinished: true,
    position: position.coords
  })
}

// failed to get the user
export const failure = (state: Object, action: Object) => {
  const { error } = action
  return state.merge({
    fetching: false,
    requestFinished: true,
    error: error
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GEO_REQUEST]: request,
  [Types.GEO_SUCCESS]: success,
  [Types.GEO_FAILURE]: failure
})
