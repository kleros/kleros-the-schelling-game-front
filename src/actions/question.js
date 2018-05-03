import { createActions } from 'lessdux'

/* Actions */

// get a question
export const question = {
  ...createActions('QUESTION', {
    withUpdate: true
  })
}

/* Action Creators */

// Question
export const fetchQuestion = hash => ({
  type: question.FETCH,
  payload: { hash }
})
