// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  usersRequest: ['uuid'],
  usersSuccess: ['user'],
  usersFailure: null,
  profilePostRequest: [
    'name', 'email', 'phone',
    'telegramId', 'faircoinAddress', 'uuid'
  ],
  profilePostSuccess: ['profile'],
  profilePostFailure: ['error'],
  profilePhotoPostRequest: ['picture', 'uuid'],
  profilePhotoPostSuccess: ['profile'],
  profilePhotoPostFailure: ['error'],
  usersCancelSearch: null,
  usersSearchRequest: ['searchText'],
  usersSearchSuccess: ['users'],
  usersSearchFailure: ['error'],
  passwordRecoveryRequest: ['email'],
  passwordRecoverySuccess: ['message'],
  passwordRecoveryFailure: ['error'],
})

export const UsersTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  entities: {},
  fetching: null,
  error: null,
  uuid: null,
  posting: false,
  postError: null,
  photoPosting: false,
  photoPostError: null,
  searchText: null,
  searching: false,
  searchError: null,
  passwordRecoverySuccess: null,
  passwordRecoveryError: null
})

/* ------------- Reducers ------------- */

// request the user for a uuid
export const request = (state: Object, { uuid }: Object) =>
  Object.assign({}, state, { fetching: true, uuid })

// successful user lookup
export const success = (state: Object, action: Object) => {
  const { user } = action
  const entities = {}
  entities[user['uuid']] = user
  return Object.assign({}, state, { fetching: false, error: null, entities: entities })
}

// failed to get the user
export const failure = (state: Object) =>
  Object.assign({}, state, ({ fetching: false, error: true }))

export const profilePostRequest = (state: Object, action : Object) => {
  return Object.assign({}, state, { posting: true })
}

// successful profile lookup
export const profilePostSuccess = (state: Object, action: Object) => {
  var newItems = Object.assign({}, state.items)
  const { uuid, name, phone, email, picture, telegramId, faircoinAddress } = action.profile
  user = state.entities[uuid]
  newUser = Object.assign({}, user, action.profile)
  newEntity = {}
  newEntity[uuid] = newUser
  newEntities = Object.assign({}, state.entities, newEntity)
  return Object.assign(
    {},
    state,
    {
      posting: false,
      postError: null,
      entities: newEntities
    }
  )
}

// failed to get the profile
export const profilePostFailure = (state: Object, { error }: Object) =>
  Object.assign({}, state, { posting: false, postError: error })

export const profilePhotoPostRequest = (state: Object, action : Object) => {
  return Object.assign({}, state, { photoPosting: true })
}

// successful profile lookup
export const profilePhotoPostSuccess = (state: Object, action: Object) => {
  var newItems = Object.assign({}, state.items)
  const { uuid, picture } = action.profile
  user = state.entities[uuid]
  newUser = Object.assign({}, user, action.profile)
  newEntity = {}
  newEntity[uuid] = newUser
  newEntities = Object.assign({}, state.entities, newEntity)
  return Object.assign(
    {},
    state,
    {
      photoPosting: false,
      photoPostError: null,
      entities: newEntities
    }
  )
}

// failed to get the profile
export const profilePhotoPostFailure = (state: Object, { error }: Object) =>
  Object.assign({}, state, { photoPosting: false, photoPostError: error })

export const cancelSearch = (state: Object) => {
  return Object.assign({}, state, {
    searchText: null,
    searchResults: null,
    searching: false,
  })
}

// request the user for a uuid
export const searchRequest = (state: Object, { searchText }: Object) =>
  Object.assign({}, state, { searching: true, searchText })

// successful user lookup
export const searchSuccess = (state: Object, action: Object) => {
  const { users } = action
  searchResults = users
  return Object.assign({}, state, { searching: false, searchError: null, searchResults: searchResults })
}

// failed to get the user
export const searchFailure = (state: Object) =>
  Object.assign({}, state, ({ searching: false, searchError: true }))


// request for a password reset
export const passwordRecoveryRequest = (state: Object) =>
  Object.assign({}, state, { posting: true, passwordRecoveryError: null })

export const passwordRecoverySuccess = (state: Object, action: Object) => {
  const { message } = action
  return Object.assign({}, state, { posting: false, passwordRecoverySuccess: message })
}

export const passwordRecoveryFailure = (state: Object, { error }: Object) => {
  return Object.assign({}, state, ({ posting: false, passwordRecoveryError: error }))
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USERS_REQUEST]: request,
  [Types.USERS_SUCCESS]: success,
  [Types.USERS_FAILURE]: failure,
  [Types.PROFILE_POST_REQUEST]: profilePostRequest,
  [Types.PROFILE_POST_SUCCESS]: profilePostSuccess,
  [Types.PROFILE_POST_FAILURE]: profilePostFailure,
  [Types.PROFILE_PHOTO_POST_REQUEST]: profilePhotoPostRequest,
  [Types.PROFILE_PHOTO_POST_SUCCESS]: profilePhotoPostSuccess,
  [Types.PROFILE_PHOTO_POST_FAILURE]: profilePhotoPostFailure,
  [Types.USERS_CANCEL_SEARCH]: cancelSearch,
  [Types.USERS_SEARCH_REQUEST]: searchRequest,
  [Types.USERS_SEARCH_SUCCESS]: searchSuccess,
  [Types.USERS_SEARCH_FAILURE]: searchFailure,
  [Types.PASSWORD_RECOVERY_REQUEST]: passwordRecoveryRequest,
  [Types.PASSWORD_RECOVERY_SUCCESS]: passwordRecoverySuccess,
  [Types.PASSWORD_RECOVERY_FAILURE]: passwordRecoveryFailure,
})
