// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  servicePostRequest: ['title', 'description', 'category', 'seedsPrice', 'uuid'],
  servicePostSuccess: ['service'],
  servicePostFailure: null,
  serviceRequest: ['uuid'],
  serviceSuccess: ['service'],
  serviceFailure: null,
  clearNewService: null,
  servicePhotoPostRequest: ['photoUrl', 'serviceUuid'],
  servicePhotoPostSuccess: ['service'],
  servicePhotoPostFailure: null,
  servicePhotoClear: null,

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
  // The reason of newService is to tell the Form there is an item already
  // created. It is used when the user clicks on publish twice. Maybe by
  // mistake, maybe to update it
  newService: null,
  postingPhoto: null,
  photoPostError: null,
  currentPhotoUpload: null
})

/* ------------- Reducers ------------- */

// request the service with a given url.
export const servicePostRequest = (state: Object, action : Object) =>
{
  updatedItems = Object.assign({}, state.items)
  if (action.uuid) {
    updatedItems[action.uuid].title = action.title
    updatedItems[action.uuid].description = action.description
    updatedItems[action.uuid].seeds_price = action.seedsPrice
  }
  return Object.assign({}, state, { fetching: true, items:updatedItems })
}

// successful service lookup
export const servicePostSuccess = (state: Object, action: Object) => {
  newItems = Object.assign({}, state.items)
  newItems[action.service.uuid] = action.service.service
  return Object.assign(
    {},
    state,
    {
      fetching: false,
      error: null,
      //NewService: The service just created. Is updated so the form edit and stop creating.
      newService: action.service.uuid,
      items: newItems
    }
  )
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


// Clear new Service stored.
// This is called every time the component is umount.
export const clearNewService = (state: Object) => {
  return Object.assign({}, state, { newService: false })
}


//
// Reducer:
// {'photos':
//    { serviceUuid:
//      [
//        { 'uploading': boolean,
//         'uploaded': boolean,
//         'url' string
//         }
//      ]
//    }
//  }
//
//
// Update the state to show the photo and start the Post
export const servicePhotoPostRequest = (state: Object, action : Object) =>
{
  const { photoUrl, serviceUuid } = action
  return Object.assign({}, state, { postingPhoto: true, currentPhotoUpload: photoUrl })
}

// successful service lookup
export const servicePhotoPostSuccess = (state: Object, action: Object) => {
  newItems = Object.assign({}, state.items)
  newItems[action.service.updated_service.uuid] = action.service.updated_service
  return Object.assign(
    {},
    state,
    {
      postingPhoto: false,
      photoPostError: null,
      items: newItems
    }
  )
}

// failed to get the service
export const servicePhotoPostFailure = (state: Object) =>
  Object.assign({}, state, { postingPhoto: false, photoPostError: true })

// Update the state to show the photo and start the Post
export const clearUploadingPhoto = (state: Object, action : Object) =>
{
  return Object.assign({}, state, { currentPhotoUpload: null})
}



/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SERVICE_POST_REQUEST]: servicePostRequest,
  [Types.SERVICE_POST_SUCCESS]: servicePostSuccess,
  [Types.SERVICE_POST_FAILURE]: servicePostFailure,
  [Types.SERVICE_REQUEST]: serviceRequest,
  [Types.SERVICE_SUCCESS]: serviceSuccess,
  [Types.SERVICE_FAILURE]: serviceFailure,
  [Types.CLEAR_NEW_SERVICE]: clearNewService,
  [Types.SERVICE_PHOTO_POST_REQUEST]: servicePhotoPostRequest,
  [Types.SERVICE_PHOTO_POST_SUCCESS]: servicePhotoPostSuccess,
  [Types.SERVICE_PHOTO_CLEAR]: clearUploadingPhoto,

})
