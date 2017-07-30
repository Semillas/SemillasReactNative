import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import CategoryActions from '../Redux/CategoryRedux'

export function * getCategories (api, action) {
  // make the call to the api
  const response = yield call(api.getCategories)
  debugger;

  // success?
  if (response.ok) {
    const categories = path(['data'], response)
    yield put(CategoryActions.categorySuccess(categories))
  } else {
    yield put(CategoryActions.categoryFailure())
  }
}
