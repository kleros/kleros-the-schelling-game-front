import { createActions } from 'lessdux'

/* Actions */

export const vote = {
  ...createActions('VOTE', {
    withCreate: true,
    withUpdate: true
  }),
  CLEAR: 'CLEAR_VOTE'
}

/* Action Creators */

// Create vote
export const createVote = (hash, questionId, voteId) => ({
  type: vote.CREATE,
  payload: { hash, questionId, voteId }
})

// Clear vote
export const clearVote = () => ({ type: vote.CLEAR })
