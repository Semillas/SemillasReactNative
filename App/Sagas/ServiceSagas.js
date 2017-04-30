import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import FeedActions from '../Redux/FeedRedux'
import PostServiceActions from '../Redux/ServiceFormRedux'

export function * getService (api, action) {
  const { uuid } = action
  // make the call to the api
  const response = yield call(api.getServiceDetail, uuid)

  // success?
  if (response.ok) {
    const user = path(['data'], response)
    yield put(FeedActions.serviceSuccess(user))
  } else {
    yield put(FeedActions.serviceFailure())
  }
}

export function * postService (api, action) {
  const { values } = action
  // make the call to the api
  const response = yield call(api.postService, values)

  // success?
  if (response.ok) {
    const uuid = path(['uuid'], response)
    yield put(PostServiceActions.servicePostSuccess(uuid))
  } else {
    yield put(PostServiceActions.servicePostFailure())
  }
}
