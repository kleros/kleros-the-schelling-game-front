import { createActions } from 'lessdux'

/* Actions */

// get a question
export const questions = createActions('QUESTIONS')

/* Action Creators */

// Questions
export const fetchQuestions = () => ({ type: questions.FETCH })
