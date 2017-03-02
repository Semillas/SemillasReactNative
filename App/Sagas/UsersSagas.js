import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import UsersActions from '../Redux/UsersRedux'

export function * getUser (api, action) {
  const { uuid } = action
  // make the call to the api
  const response = yield call(api.getUserDetail, uuid)

  // success?
  if (response.ok) {
    const user = path(['data'], response)
    yield put(UsersActions.usersSuccess(user))
  } else {
    yield put(UsersActions.usersFailure())
  }
}
