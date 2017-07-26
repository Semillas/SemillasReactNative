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

export function * profilePost (api, { name, email, phone, uuid }) {
  if ((name === '') || (email === '')) {
    // dispatch failure
    yield put(UsersActions.profilePostFailure('WRONG'))
  }

  // make the call to the api
  const response = yield call(api.putUser, uuid, name, email, phone)

  // success?
  if (response.ok) {
    yield put(UsersActions.profilePostSuccess(response.data))
  } else {
    yield put(UsersActions.profilePostFailure(response.data))
  }
}
