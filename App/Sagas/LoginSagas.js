import { put, call } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
// attempts to login
export function * login (api, { email, password }) {
  if (password === '') {
    // dispatch failure
    yield put(LoginActions.loginFailure('WRONG'))
  }

  // make the call to the api
  const response = yield call(api.login, email, password)

  // success?
  if (response.ok) {
    api.setHeader('Authorization', 'token ' + response.data.key)
    yield put(LoginActions.loginSuccess(response.data.key, response.data.user))
  } else {
    yield put(LoginActions.loginFailure('Credentials not correct'))
  }
}

export function * signup (api, { email, password1, password2 }) {
  if (password1 === '') {
    // dispatch failure
    yield put(LoginActions.signupFailure('WRONG'))
  }

  // make the call to the api
  const response = yield call(api.signup, email, password1, password2)

  // success?
  if (response.ok) {
    api.setHeader('Authorization', 'token ' + response.data.key)
    yield put(LoginActions.signupSuccess(response.data.key, response.data.user))
  } else {
    yield put(LoginActions.signupFailure(response.data))
  }
}
