// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  usersRequest: ['uuid'],
  usersSuccess: ['entities'],
  usersFailure: null
})

export const UsersTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  entities: {},
  fetching: null,
  error: null,
  uuid: null
})

/* ------------- Reducers ------------- */

// request the user for a uuid
export const request = (state: Object, { uuid }: Object) =>
  state.merge({ fetching: true, uuid })

// successful user lookup
export const success = (state: Object, action: Object) => {
  const { user } = action
  const users = state.entities
  users[user.uuid] = user
  return state.merge({ fetching: false, error: null, entities: users })
}

// failed to get the user
export const failure = (state: Object) =>
  state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USERS_REQUEST]: request,
  [Types.USERS_SUCCESS]: success,
  [Types.USERS_FAILURE]: failure
})
