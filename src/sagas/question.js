import { takeLatest, call } from 'redux-saga/effects'

import * as questionActions from '../actions/question'
import * as questionsActions from '../actions/questions'
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
 * Fetches questions.
 * @returns {array} - Questions.
 */
export function* fetchQuestions() {
  return yield call(questionApi.getQuestions)
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
  // Questions
  yield takeLatest(
    questionsActions.questions.FETCH,
    lessduxSaga,
    'fetch',
    questionsActions.questions,
    fetchQuestions
  )
}
