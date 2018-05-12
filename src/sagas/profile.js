import { takeLatest, call } from 'redux-saga/effects'

import * as profileActions from '../actions/profile'
import { lessduxSaga } from '../utils/saga'
import { web3 } from '../bootstrap/dapp-api'
import * as errorConstants from '../constants/error'

import profileApi from './api/profile-api'

/**
 * Creates the profile.
 * @returns {object} - The profile.
 */
export function* createProfile () {
  const accounts = yield call(web3.eth.getAccounts)
  if (!accounts[0]) throw new Error(errorConstants.ETH_NO_ACCOUNTS)

  const msg = yield call(
    web3.utils.fromUtf8,
    'Shelling_Game + @kleros_io + YOU = <3'
  )

  const signMsg = yield call(
    web3.eth.personal.sign,
    msg,
    accounts[0]
  )

  let profile = {}

  profile.address = accounts[0]
  profile.signMsg = signMsg

  return yield call(profileApi.postProfile, profile)
}

/**
 * The root of the wallet saga.
 */
export default function* walletSaga() {
  yield takeLatest(
    profileActions.profile.CREATE,
    lessduxSaga,
    'create',
    profileActions.profile,
    createProfile
  )
}
