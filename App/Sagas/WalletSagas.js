import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import WalletActions from '../Redux/WalletRedux'

export function * createTransaction (api, action) {
  const { sourceUuid, destUuid, amount } = action
  // make the call to the api
  const response = yield call(
    api.transact,
    sourceUuid,
    destUuid,
    amount
  )

  // success?
  if (response.ok) {
    yield put(WalletActions.walletTransactionSuccess())
  } else {
    yield put(WalletActions.walletTransactionFailure(response.data))
  }
}
