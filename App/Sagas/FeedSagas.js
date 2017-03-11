import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import FeedActions from '../Redux/FeedRedux'
import parse from 'parse-link-header'

export function * getFeed (api, action) {
  const { nextPageUrl } = action
  // make the call to the api
  // TODO: Add filters
  console.log(nextPageUrl)
  const response = yield call(api.getFeed, nextPageUrl)

  // success?
  if (response.ok) {
    const items = path(['data'], response)
    const nextUrl = parse(path(['headers', "link"], response))
    yield put(FeedActions.feedSuccess(nextUrl, items))
  } else {
    yield put(FeedActions.feedFailure())
  }
}
