import { createActions } from 'lessdux'

/* Actions */

// get scores
export const scores = createActions('SCORES')

/* Action Creators */

// Scores
export const fetchScores = () => ({type: scores.FETCH})
