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
export const createVote = (signMsg, theme, questionId, voteId) => ({
  type: vote.CREATE,
  payload: { signMsg, theme, questionId, voteId }
})

// Clear vote
export const clearVote = () => ({ type: vote.CLEAR })
