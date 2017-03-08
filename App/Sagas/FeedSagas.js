import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import FeedActions from '../Redux/FeedRedux'

export function * getUser (api, action) {
  const { nextPageUrl } = action
  // make the call to the api
  const response = yield call(api.getFeed, nextPageUrl)

  // success?
  if (response.ok) {
    const items = path(['data'], response)
    const nextUrl = path(['headers'], response)
    yield put(FeedActions.feedSuccess(nextUrl, items))
  } else {
    yield put(FeedActions.feedFailure())
  }
}
