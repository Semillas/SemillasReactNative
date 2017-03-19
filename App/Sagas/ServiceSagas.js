import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import FeedActions from '../Redux/FeedRedux'

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
