import { takeLatest, call } from 'redux-saga/effects'

import * as profileActions from '../actions/profile'
import { fetchSaga } from '../utils/saga'

import profileApi from './api/profile-api'

/**
 * Creates the profile.
 * @returns {object} - The profile.
 */
export function* createProfile({ payload: { profile } }) {
  return yield call(profileApi.postProfile, profile)
}

/**
 * The root of the wallet saga.
 */
export default function* walletSaga() {
  yield takeLatest(
    profileActions.profile.CREATE,
    fetchSaga,
    profileActions.profile,
    createProfile
  )
}
