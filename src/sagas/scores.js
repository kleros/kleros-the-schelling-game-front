import { takeLatest, call, put } from 'redux-saga/effects'

import * as scoresActions from '../actions/scores'
import * as voteActions from '../actions/vote'
import { lessduxSaga } from '../utils/saga'

import scoresApi from './api/scores-api'

/**
 * Fetches the scores.
 * @returns {object} - The scores.
 */
export function* fetchScores() {
  return yield call(scoresApi.getScores)
}

/**
 * The root of the wallet saga.
 */
export default function* walletSaga() {
  // Question
  yield takeLatest(
    scoresActions.scores.FETCH,
    lessduxSaga,
    'fetch',
    scoresActions.scores,
    fetchScores
  )
}
