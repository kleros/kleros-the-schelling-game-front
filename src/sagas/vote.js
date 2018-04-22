import { takeLatest, call } from 'redux-saga/effects'

import * as voteActions from '../actions/vote'
import { lessduxSaga } from '../utils/saga'

import voteApi from './api/vote-api'

/**
 * Creates the profile.
 * @returns {object} - The profile.
 */
export function* createVote({ type, payload: { hash, questionId, voteId } }) {
  return yield call(voteApi.postVote, hash, questionId, voteId)
}

/**
 * The root of the wallet saga.
 */
export default function* walletSaga() {
  yield takeLatest(
    voteActions.vote.CREATE,
    lessduxSaga,
    'create',
    voteActions.vote,
    createVote
  )
}
