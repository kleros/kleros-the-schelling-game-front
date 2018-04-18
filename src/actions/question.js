import { createActions } from 'lessdux'

/* Actions */

// get a question
export const question = createActions('QUESTION')

/* Action Creators */

// Balance
export const fetchQuestion = () => ({ type: question.FETCH })
