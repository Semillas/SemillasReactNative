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
    service = response.data
    yield put(ServiceActions.servicePostSuccess(service))
  } else {
    yield put(ServiceActions.servicePostFailure())
  }
}
