import { takeLatest, call } from 'redux-saga/effects'

import * as questionActions from '../actions/question'
import { fetchSaga } from '../utils/saga'

import questionApi from './api/question-api'

/**
 * Fetches the question.
 * @returns {object} - The question.
 */
export function* fetchQuestion() {
  return yield call(questionApi.getQuestion)
}

/**
 * The root of the wallet saga.
 */
export default function* walletSaga() {
  // Question
  yield takeLatest(
    questionActions.question.FETCH,
    fetchSaga,
    questionActions.question,
    fetchQuestion
  )
}
