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
export function* fetchQuestions({ type, payload: { password } }) {
  return yield call(questionApi.getQuestions, password)
}

/**
 * Updates questions.
 * @returns {array} - Questions.
 */
export function* updateQuestions({ type, payload: { questionId, valid, password } }) {
  return yield call(questionApi.putQuestion, questionId, valid, password)
}

/**
 * Creates question.
 * @returns {object} - Question.
 */
export function* createQuestion({ type, payload: { question } }) {
  return yield call(questionApi.postQuestion, question)
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
  yield takeLatest(
    questionActions.question.CREATE,
    lessduxSaga,
    'create',
    questionActions.question,
    createQuestion
  )
  // Questions
  yield takeLatest(
    questionsActions.questions.FETCH,
    lessduxSaga,
    'fetch',
    questionsActions.questions,
    fetchQuestions
  )
  yield takeLatest(
    questionsActions.questions.UPDATE,
    lessduxSaga,
    'update',
    questionsActions.questions,
    updateQuestions
  )
}
