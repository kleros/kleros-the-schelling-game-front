import { takeLatest, call, put } from 'redux-saga/effects'

import * as voteActions from '../actions/vote'
import * as questionActions from '../actions/question'
import { lessduxSaga } from '../utils/saga'
import { action } from '../utils/action'

import voteApi from './api/vote-api'

/**
 * Adds the vote.
 * @returns {object} - The vote.
 */
export function* createVote ({ type, payload: { signMsg, theme, questionId, voteId } }) {
  const vote = yield call(voteApi.postVote, signMsg, questionId, voteId)
  if (vote.result === 'win') {
    const nextQuestion = yield call(questionActions.fetchQuestion, signMsg, theme)
    yield put(nextQuestion)
  }

  return vote
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
