import { createActions } from 'lessdux'

/* Actions */

// get a question
export const question = {
  ...createActions('QUESTION', {
    withCreate: true,
    withUpdate: true
  })
}

/* Action Creators */

// Question
export const fetchQuestion = signMsg => ({
  type: question.FETCH,
  payload: { signMsg }
})

export const createQuestion = questionInput => ({
  type: question.CREATE,
  payload: { question: questionInput }
})
