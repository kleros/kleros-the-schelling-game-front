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
export const fetchQuestion = hash => ({
  type: question.FETCH,
  payload: { hash }
})

export const createQuestion = question => ({
  type: question.CREATE,
  payload: { question }
})
