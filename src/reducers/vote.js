import PropTypes from 'prop-types'
import createReducer, { createResource } from 'lessdux'

import * as voteActions from '../actions/vote'

// Shapes
const {
  shape: voteShape,
  initialState: voteInitialState
} = createResource(PropTypes.string, {
  withCreate: true,
  withUpdate: true
})
export { voteShape }

// Reducer
const initialState = {vote: voteInitialState}

export default createReducer(initialState, {
  [voteActions.vote.CLEAR]: () => initialState
})

// Selectors
