// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  feedRequest: ['nextPageUrl', 'searchText', 'category'],
  feedSuccess: ['nextPageUrl', 'items'],
  feedFailure: null,
  feedClear: null
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
export const request = (state: Object, { nextPageUrl }: Object) => {
  if (nextPageUrl == 'LastPage') {
    //return state.merge({ fetching: false })
    return Object.assign({}, state, { fetching: false })
  }

  //return state.merge({ fetching: true, nextPageUrl })

  return Object.assign({}, state, { fetching: true, nextPageUrl})
}

// successful user lookup
export const success = (state: Object, action: Object) => {
  const { items } = action;

  var nextUrl = null;
  if ('nextPageUrl' in action) {
    if ('next' in action.nextPageUrl) {
      nextUrl = action.nextPageUrl.next.url
    } else {
      // Everything went right, but no next field: Last Page
      nextUrl = 'LastPage'
    }
  }

  var nextUrl;
  if ((action.nextPageUrl == null) || (action.nextPageUrl.next == null)) {
    nextUrl = null
  } else {
    nextUrl = action.nextPageUrl.next.url
  }
  newItems = {}
  for (var id in items) {
    newItems[items[id]["uuid"]] = items[id]
  }
  allItems = Object.assign({}, state.items, newItems)

  return Object.assign({}, state, { fetching: false, error: null, items: allItems, nextPageUrl: nextUrl })
  //return state.merge({ fetching: false, error: null, items: allItems, nextPageUrl: nextUrl })
}

// failed to get the user
export const failure = (state: Object) =>
  //state.merge({ fetching: false, error: true, nextPageUrl: null })
  Object.assign({}, state, { fetching: false, error: true, nextPageUrl: null })

export const clear = (state: Object) => {
  var newState = Object.assign({}, state, { fetching: false, items: {}, nextPageUrl: null })
  //return state.merge({ fetching: false, items: {}, nextPageUrl: null })
  return newState
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FEED_CLEAR]:   clear,
  [Types.FEED_REQUEST]: request,
  [Types.FEED_SUCCESS]: success,
  [Types.FEED_FAILURE]: failure

})
