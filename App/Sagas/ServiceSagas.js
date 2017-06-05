import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import GetServiceActions from '../Redux/GetServiceRedux'
import PostServiceActions from '../Redux/ServicePostRedux'

export function * getService (api, action) {
  const { uuid } = action
  // make the call to the api
  const response = yield call(api.getServiceDetail, uuid)

  // success?
  if (response.ok) {
    const user = path(['data'], response)
    yield put(GetServiceActions.serviceSuccess(user))
  } else {
    yield put(GetServiceActions.serviceFailure())
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
    const uuid = path(['uuid'], response)
    yield put(PostServiceActions.servicePostSuccess(uuid))
  } else {
    yield put(PostServiceActions.servicePostFailure())
  }
}
