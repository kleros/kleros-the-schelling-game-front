import PropTypes from 'prop-types'
import createReducer, { createResource } from 'lessdux'

// Shapes
const { shape: voteShape, initialState: voteInitialState } = createResource(
  PropTypes.string
)
export { voteShape }

// Reducer
export default createReducer({
  vote: voteInitialState
})

// Selectors
