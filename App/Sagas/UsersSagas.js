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

export function * profilePost (api, { name, email, phone, telegramId, faircoinAddress, uuid }) {
  if ((name === '') || (email === '')) {
    // dispatch failure
    yield put(UsersActions.profilePostFailure('WRONG'))
  }

  // make the call to the api
  const response = yield call(api.putUser, uuid, name, email,
    phone, telegramId, faircoinAddress)

  // success?
  if (response.ok) {
    yield put(UsersActions.profilePostSuccess(response.data))
  } else {
    yield put(UsersActions.profilePostFailure(response.data))
  }
}

export function * profilePhotoPost (api, { picture, uuid }) {

  // make the call to the api
  const response = yield call(api.putUserPhoto, uuid, picture.uri)

  // success?
  if (response.ok) {
    yield put(UsersActions.profilePhotoPostSuccess(response.data))
  } else {
    yield put(UsersActions.profilePhotoPostFailure(response.data))
  }
}

export function * searchUser (api, action) {
  const { searchText } = action
  // make the call to the api
  const response = yield call(api.searchUser, searchText)

  // success?
  if (response.ok) {
    const user = path(['data'], response)
    yield put(UsersActions.usersSearchSuccess(user))
  } else {
    yield put(UsersActions.usersSearchFailure())
  }
}

export function * recoverPassword (api, action) {
  const { email } = action
  // make the call to the api
  const response = yield call(api.recoverPassword, email)

  // success?
  const message = path(['data'], response)
  if (response.ok) {
    yield put(UsersActions.passwordRecoverySuccess(message.detail))
  } else {
    yield put(UsersActions.passwordRecoveryFailure(message))
  }
}
