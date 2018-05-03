import { createActions } from 'lessdux'

/* Actions */

// get a question
export const question = createActions('QUESTION')

/* Action Creators */

// Question
export const fetchQuestion = hash => ({
  type: question.FETCH,
  payload: { hash }
})
