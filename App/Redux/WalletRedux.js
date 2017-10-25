// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

import { Actions as NavigationActions } from 'react-native-router-flux'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  walletTransactionRequest: ['sourceUuid', 'destUuid', 'amount'],
  walletTransactionSuccess: ['message'],
  walletTransactionFailure: ['error'],
  walletRequest: ['ownerUuid'],
  walletSuccess: ['wallet'],
  walletFailure: ['error'],
})

export const WalletTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  transactionRequesting: null,
  transactionError: null,
  error: null,
  requesting: null,
  wallet: null
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


// request the user for a uuid
export const walletRequest = (state: Object, { userUuid, amount }: Object) =>
  Object.assign({}, state, { Requesting: true, userUuid, amount })

// successful user lookup
export const walletSuccess = (state: Object, action: Object) => {
  const { wallet } = action
  return Object.assign({}, state, { requesting: false, error: null, wallet: wallet})
}

// failed to get the user
export const walletFailure = (state: Object, {error}: Object) =>
  Object.assign({}, state, ({ requesting: false, error: error}))

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.WALLET_TRANSACTION_REQUEST]: walletTransactionRequest,
  [Types.WALLET_TRANSACTION_SUCCESS]: walletTransactionSuccess,
  [Types.WALLET_TRANSACTION_FAILURE]: walletTransactionFailure,
  [Types.WALLET_REQUEST]: walletRequest,
  [Types.WALLET_SUCCESS]: walletSuccess,
  [Types.WALLET_FAILURE]: walletFailure,
})
