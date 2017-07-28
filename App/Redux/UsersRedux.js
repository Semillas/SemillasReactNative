// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  usersRequest: ['uuid'],
  usersSuccess: ['user'],
  usersFailure: null,
  profilePostRequest: ['name', 'email', 'phone', 'uuid'],
  profilePostSuccess: ['profile'],
  profilePostFailure: ['error'],
  profilePhotoPostRequest: ['picture', 'uuid'],
  profilePhotoPostSuccess: ['profile'],
  profilePhotoPostFailure: ['error']
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
  photoPostError: null
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
  const { uuid, name, phone, email, picture } = action.profile
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
  [Types.PROFILE_PHOTO_POST_FAILURE]: profilePhotoPostFailure
})
