import { takeLatest, call } from 'redux-saga/effects'

import * as profileActions from '../actions/profile'
import { lessduxSaga } from '../utils/saga'

import profileApi from './api/profile-api'

/**
 * Creates the profile.
 * @returns {object} - The profile.
 */
export function* createProfile ({ type, payload: { Profile } }) {
  return yield call(profileApi.postProfile, Profile)
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
