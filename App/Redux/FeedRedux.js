// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  feedRequest: ['nextPageUrl', 'searchText', 'category', 'position'],
  feedSuccess: ['nextPageUrl', 'items'],
  feedFailure: null,
  feedClear: null,
  geolocationRequested: null
})

export const FeedTypes = Types
export default Creators

const STATUS_INITIAL = 0
const STATUS_REQUESTED_LOCALIZATION = 1
const STATUS_REQUESTED_FEED = 2
const STATUS_FEED_RETRIEVED = 3

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  items: {},
  fetching: null,
  error: null,
  nextPageUrl: null,
  searchText: null,
  category: null,
  requestStatus: STATUS_INITIAL
})

/* ------------- Reducers ------------- */

// request the feed with a given url.
export const request = (state: Object, { nextPageUrl }: Object) => {
  if (nextPageUrl === 'LastPage') {
    return Object.assign({}, state, { fetching: false })
  }
  return Object.assign({}, state,
    {
      fetching: true,
      nextPageUrl,
      requestStatus: STATUS_REQUESTED_FEED
    })
}

// successful user lookup
export const success = (state: Object, action: Object) => {
  const { items } = action

  var nextUrl = null
  var newItems = {}
  var allItems
  if ('nextPageUrl' in action) {
    if ('next' in action.nextPageUrl) {
      nextUrl = action.nextPageUrl.next.url
    } else {
      // Everything went right, but no next field: Last Page
      nextUrl = 'LastPage'
    }
  }

  if ((action.nextPageUrl == null) || (action.nextPageUrl.next == null)) {
    nextUrl = null
  } else {
    nextUrl = action.nextPageUrl.next.url
  }
  for (var id in items) {
    newItems[items[id]['uuid']] = items[id]
  }
  allItems = Object.assign({}, state.items, newItems)

  return Object.assign({}, state,
    {
      fetching: false,
      error: null,
      items: allItems,
      nextPageUrl: nextUrl,
      requestStatus: STATUS_FEED_RETRIEVED
    })
}

// failed to get the user
export const failure = (state: Object) =>
  Object.assign({}, state, {
    fetching: false,
    error: true,
    nextPageUrl: null,
    requestStatus: STATUS_FEED_RETRIEVED
  })

export const clear = (state: Object) => {
  var newState = Object.assign({}, state,
    {
      fetching: false,
      items: {},
      nextPageUrl: null,
      requestStatus: STATUS_INITIAL
    })
  return newState
}

// failed to get the user
export const geolocationRequested = (state: Object) =>
  Object.assign({}, state, {requestStatus: STATUS_REQUESTED_LOCALIZATION})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FEED_CLEAR]: clear,
  [Types.FEED_REQUEST]: request,
  [Types.FEED_SUCCESS]: success,
  [Types.FEED_FAILURE]: failure,
  [Types.GEOLOCATION_REQUESTED]: geolocationRequested
})
