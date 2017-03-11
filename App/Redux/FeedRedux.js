// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  feedRequest: ['nextPageUrl', 'searchText', 'category'],
  feedSuccess: ['nextPageUrl', 'items'],
  feedFailure: null
})

export const FeedTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  items: {},
  fetching: null,
  error: null,
  nextPageUrl: null,
  searchText: null,
  category: null
})

/* ------------- Reducers ------------- */

// request the feed with a given url.
export const request = (state: Object, { nextPageUrl }: Object) =>
  state.merge({ fetching: true, nextPageUrl })

// successful user lookup
export const success = (state: Object, action: Object) => {
  const { items } = action;
  var nextUrl;
  if ((action.nextPageUrl == null) || (action.nextPageUrl.next == null)) {
    nextUrl = null
  } else {
    nextUrl = action.nextPageUrl.next.url
  }
  // TODO: pass feed to { uuid: item }
//  const items = feed.map(function (item) {
//    var rObj = {}
//    rObj[item.uuid] = item
//    return rObj
//  })
  return state.merge({ fetching: false, error: null, items: items , nextPageUrl: nextUrl })
}

// failed to get the user
export const failure = (state: Object) =>
  state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FEED_REQUEST]: request,
  [Types.FEED_SUCCESS]: success,
  [Types.FEED_FAILURE]: failure
})
