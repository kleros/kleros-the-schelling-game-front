import { takeLatest, call } from 'redux-saga/effects'

import * as questionActions from '../actions/question'
import { fetchSaga } from '../utils/saga'

/**
 * Fetches the question.
 * @returns {object} - The question.
 */
export function* fetchQuestion() {
  const question = yield call(fetch, 'http://138.68.22.25:3000/questions')

  console.log(question)

  return question
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
