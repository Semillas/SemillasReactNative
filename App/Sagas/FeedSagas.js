import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import FeedActions from '../Redux/FeedRedux'
import parse from 'parse-link-header'

export function * getFeed (api, action) {
  const { nextPageUrl, category, searchText, position } = action
  // make the call to the api
  // TODO: Add filters
  console.log('Loading feed url: ', nextPageUrl)
  var latitude = position ? position.latitude : null
  var longitude = position ? position.longitude : null
  const response = yield call(
    api.getFeed,
    nextPageUrl,
    category,
    searchText,
    latitude,
    longitude
  )

  // success?
  if (response.ok) {
    const items = path(['data'], response)
    const nextUrl = parse(path(['headers', 'link'], response))
    yield put(FeedActions.feedSuccess(nextUrl, items))
  } else {
    yield put(FeedActions.feedFailure())
  }
}
