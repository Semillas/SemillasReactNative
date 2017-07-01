import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import GeoActions from '../Redux/ServiceRedux'

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
