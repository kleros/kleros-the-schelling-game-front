import PropTypes from 'prop-types'
import createReducer, { createResource } from 'lessdux'

// Shapes
const {
  shape: scoresShape,
  initialState: scoresInitialState
} = createResource(PropTypes.string)
export { scoresShape }

// Reducer
export default createReducer({
  scores: scoresInitialState
})

// Selectors
