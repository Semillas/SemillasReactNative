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
  const { title, description, category, seeds_price } = action
  // make the call to the api
  const response = yield call(api.postService, title, description, category, seeds_price)

  // success?
  if (response.ok) {
    const uuid = path(['uuid'], response)
    yield put(PostServiceActions.servicePostSuccess(uuid))
  } else {
    yield put(PostServiceActions.servicePostFailure())
  }
}
