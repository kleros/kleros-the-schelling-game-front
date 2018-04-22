import { takeLatest, call } from 'redux-saga/effects'

import * as profileActions from '../actions/profile'
import { lessduxSaga } from '../utils/saga'

import profileApi from './api/profile-api'

/**
 * Creates the profile.
 * @returns {object} - The profile.
 */
export function* createProfile ({ type, payload: { profileGet } }) {
  return yield call(profileApi.postProfile, profileGet)
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
