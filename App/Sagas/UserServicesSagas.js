import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import UserServicesActions from '../Redux/UserServicesRedux'
import parse from 'parse-link-header'

export function * getUserServices (api, action) {
  const { userUuid, nextPageUrl } = action
  // make the call to the api
  // TODO: Add filters
  console.log(nextPageUrl)
  const response = yield call(api.getUserServices, nextPageUrl, userUuid)

  // success?
  if (response.ok) {
    const items = path(['data'], response)
    const nextUrl = parse(path(['headers', 'link'], response))
    yield put(UserServicesActions.userServicesSuccess(nextUrl, userUuid, items))
  } else {
    yield put(UserServicesActions.userServicesFailure())
  }
}
