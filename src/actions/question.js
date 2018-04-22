import { createActions } from 'lessdux'

/* Actions */

// get a question
export const question = createActions('QUESTION')

/* Action Creators */

// Balance
export const fetchQuestion = hash => ({
  type: question.FETCH,
  payload: { hash }
})
