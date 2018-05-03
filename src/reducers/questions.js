import PropTypes from 'prop-types'
import createReducer, { createResource } from 'lessdux'

// Shapes
const {
  shape: questionsShape,
  initialState: questionsInitialState
} = createResource(PropTypes.array)
export { questionsShape }

// Reducer
export default createReducer({
  questions: questionsInitialState
})

// Selectors
