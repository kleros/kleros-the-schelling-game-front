import { createActions } from 'lessdux'

/* Actions */

export const vote = {
  ...createActions('VOTE', {
    withCreate: true
  })
}

/* Action Creators */

// Balance
export const createVote = (hash, questionId, voteId) => ({
  type: vote.CREATE,
  payload: { hash, questionId, voteId }
})
