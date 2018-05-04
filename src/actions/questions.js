import { createActions } from 'lessdux'

/* Actions */

// get a question
export const questions = {
  ...createActions('QUESTIONS', {
    withUpdate: true
  })
}

/* Action Creators */

// Questions
export const fetchQuestions = () => ({ type: questions.FETCH })

export const updateQuestions = (questionId, valid) => ({
  type: questions.UPDATE,
  payload: { questionId, valid }
})
