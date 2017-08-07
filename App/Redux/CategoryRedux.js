// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  categoryRequest: null,
  categorySuccess: ['categories'],
  categoryFailure: null,
})

export const CategoryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  categories: null,
  fetching: null,
  error: null,
})

/* ------------- Reducers ------------- */

// request the user for a uuid
export const request = (state: Object) =>
  Object.assign({}, state, { fetching: true })

// successful user lookup
export const success = (state: Object, action: Object) => {
  const { categories } = action
  return Object.assign({}, state, { fetching: false, error: null, categories: categories })
}

// failed to get the user
export const failure = (state: Object) =>
  Object.assign({}, state, ({ fetching: false, error: true }))


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CATEGORY_REQUEST]: request,
  [Types.CATEGORY_SUCCESS]: success,
  [Types.CATEGORY_FAILURE]: failure
})
