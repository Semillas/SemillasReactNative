// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  profilePostRequest: ['name', 'email', 'phone', 'uuid'],
  profilePostSuccess: ['profile'],
  profilePostFailure: ['error'],
  loginRequest: ['email', 'password'],
  loginSuccess: ['key', 'user'],
  loginFailure: ['error'],
  signupRequest: ['email', 'password1', 'password2'],
  signupSuccess: ['key', 'user'],
  signupFailure: ['error'],
  logout: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  email: null,
  error: null,
  fetching: false,
  signupError: null,
  signupFetching: false,
  posting: false,
  postError: null
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const loginRequest = (state: Object) => state.merge({ fetching: true })

// we've successfully logged in
export const loginSuccess = (state: Object, { key, user }: Object) =>
  state.merge({ fetching: false, error: null, key, user })

// we've had a problem logging in
export const loginFailure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error })

// we've logged out
export const logout = (state: Object) => INITIAL_STATE

// we're attempting to signup
export const signupRequest = (state: Object) => state.merge({ fetching: true })

export const signupSuccess = (state: Object, { key, user }: Object) =>
  state.merge({ fetching: false, error: null, key, user })

export const signupFailure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, signupError: error })

export const profilePostRequest = (state: Object, action : Object) => {
  return Object.assign({}, state, { postError: true })
}

// successful profile lookup
export const profilePostSuccess = (state: Object, action: Object) => {
  var newItems = Object.assign({}, state.items)
  debugger;
  return Object.assign(
    {},
    state,
    {
      posting: false,
      error: null,
      // Newprofile: The profile just created. Is updated so the form edit and stop creating.
      newprofile: action.profile.uuid,
      items: newItems
    }
  )
}

// failed to get the profile
export const profilePostFailure = (state: Object, { error }: Object) =>
  Object.assign({}, state, { posting: false, error: error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.SIGNUP_REQUEST]: signupRequest,
  [Types.SIGNUP_SUCCESS]: signupSuccess,
  [Types.SIGNUP_FAILURE]: signupFailure,
  [Types.LOGOUT]: logout,
  [Types.PROFILE_POST_REQUEST]: profilePostRequest,
  [Types.PROFILE_POST_SUCCESS]: profilePostSuccess,
  [Types.PROFILE_POST_FAILURE]: profilePostFailure
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState: Object) => loginState.key !== undefined
