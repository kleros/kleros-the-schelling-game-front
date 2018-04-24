import { takeLatest, call } from 'redux-saga/effects'

import * as questionActions from '../actions/question'
import { lessduxSaga } from '../utils/saga'

import questionApi from './api/question-api'

/**
 * Fetches the question.
 * @returns {object} - The question.
 */
export function* fetchQuestion({ type, payload: { hash } }) {
  return yield call(questionApi.getQuestion, hash)
}

/**
 * The root of the wallet saga.
 */
export default function* walletSaga() {
  // Question
  yield takeLatest(
    questionActions.question.FETCH,
    lessduxSaga,
    'fetch',
    questionActions.question,
    fetchQuestion
  )
}
