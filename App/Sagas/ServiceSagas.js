import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import ServiceActions from '../Redux/ServiceRedux'

export function * getService (api, action) {
  const { uuid } = action
  // make the call to the api
  const response = yield call(api.getServiceDetail, uuid)

  // success?
  if (response.ok) {
    const user = path(['data'], response)
    yield put(ServiceActions.serviceSuccess(user))
  } else {
    yield put(ServiceActions.serviceFailure())
  }
}

export function * postService (api, action) {
  var response
  const { title, description, category, seedsPrice, uuid } = action
  // make the call to the api
  if (uuid) {
    // uuid is provided
    response = yield call(
      api.putService,
      title,
      description,
      category,
      seedsPrice,
      uuid
    )
  } else {
    // uuid not provided
    response = yield call(api.postService, title, description, category, seedsPrice)
  }

  // success?
  if (response.ok) {
    var service = response.data
    yield put(ServiceActions.servicePostSuccess(service))
  } else {
    yield put(ServiceActions.servicePostFailure(response.data))
  }
}

export function * photoPostService (api, action) {
  var response
  var service
  const { photoUrl, serviceUuid } = action
  // make the call to the api
  response = yield call(
    api.photoPostService,
    photoUrl.uri,
    serviceUuid,
  )
  // success?
  if (response.ok) {
    service = response.data
    yield put(ServiceActions.servicePhotoPostSuccess(service))
  } else {
    yield put(ServiceActions.servicePhotoPostFailure())
  }
}

export function * deleteService (api, action) {
  const { uuid } = action
  // make the call to the api
  const response = yield call(api.deleteService, uuid)

  // success?
  if (response.ok) {
    yield put(ServiceActions.serviceDeletionSuccess())
  } else {
    yield put(ServiceActions.serviceDeletionFailure())
  }
}

export function * deleteServicePhoto (api, action) {
  const { photoId } = action
  // make the call to the api
  const response = yield call(api.deleteServicePhoto, photoId)

  // success?
  if (response.ok) {
    yield put(ServiceActions.servicePhotoDeletionSuccess())
  } else {
    yield put(ServiceActions.servicePhotoDeletionFailure(error=response.data.detail))
  }
}
