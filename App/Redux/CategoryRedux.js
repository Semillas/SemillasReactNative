// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import I18n from 'react-native-i18n'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  categoryRequest: null,
  categorySuccess: ['categories'],
  categoryFailure: null,
  categorySetDisplayFilter: ['visible'],
  categorySetSelectedValue: ['value'],
})

export const CategoryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  categories: null,
  fetching: null,
  error: null,
  displayCategoryFilter: false,
  selectedValue: null
})

/* ------------- Reducers ------------- */

// request the user for a uuid
export const request = (state: Object) =>
  Object.assign({}, state, { fetching: true })

// successful user lookup
export const success = (state: Object, action: Object) => {
  const { categories } = action
  NoneItem = {id:null, name:I18n.t('None'), order:-1}
  categories.push(NoneItem)
  categories.sort(function(a,b){ return a['order']>b['order']?1:-1; })
  return Object.assign({}, state, { fetching: false, error: null, categories: categories })
}

// failed to get the user
export const failure = (state: Object) =>
  Object.assign({}, state, ({ fetching: false, error: true }))

export const setDisplayFilter = (state: Object, action: Object) => {
  const { visible } = action
  return Object.assign({}, state, ({ displayCategoryFilter: visible }))
}

export const setSelectedValue = (state: Object, action: Object) => {
  const { value } = action
  return Object.assign({}, state, ({ selectedValue: value }))
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CATEGORY_REQUEST]: request,
  [Types.CATEGORY_SUCCESS]: success,
  [Types.CATEGORY_FAILURE]: failure,
  [Types.CATEGORY_SET_DISPLAY_FILTER]: setDisplayFilter,
  [Types.CATEGORY_SET_SELECTED_VALUE]: setSelectedValue
})
