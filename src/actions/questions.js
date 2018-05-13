import { createActions } from 'lessdux'

/* Actions */

// get a question
export const questions = {
  ...createActions('QUESTIONS', {
    withUpdate: true
  }),
  COUNT: 'COUNT_QUESTIONS'
}

/* Action Creators */

// Questions
export const fetchQuestions = password => ({
  type: questions.FETCH,
  payload: { password }
})

export const updateQuestions = (questionId, valid, password) => ({
  type: questions.UPDATE,
  payload: { questionId, valid, password }
})

// Count questions
export const countQuestions = () => ({ type: questions.COUNT })
