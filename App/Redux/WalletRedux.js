// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

import { Actions as NavigationActions } from 'react-native-router-flux'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  walletTransactionRequest: ['sourceUuid', 'destUuid', 'amount'],
  walletTransactionSuccess: null,
  walletTransactionFailure: ['error'],
})

export const WalletTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  transactionRequesting: null,
  transactionError: null,
})

/* ------------- Reducers ------------- */

// request the user for a uuid
export const walletTransactionRequest = (state: Object, { userUuid, amount }: Object) =>
  Object.assign({}, state, { transactionRequesting: true, userUuid, amount })

// successful user lookup
export const walletTransactionSuccess = (state: Object, action: Object) => {
  return Object.assign({}, state, { transactionRequesting: false, transactionError: null })
}

// failed to get the user
export const walletTransactionFailure = (state: Object, {error}: Object) =>
  Object.assign({}, state, ({ transactionRequesting: false, transactionError: error}))

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.WALLET_TRANSACTION_REQUEST]: walletTransactionRequest,
  [Types.WALLET_TRANSACTION_SUCCESS]: walletTransactionSuccess,
  [Types.WALLET_TRANSACTION_FAILURE]: walletTransactionFailure,
})
