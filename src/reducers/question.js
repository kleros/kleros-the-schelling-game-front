import PropTypes from 'prop-types'
import createReducer, { createResource } from 'lessdux'

// Shapes
const {
  shape: questionShape,
  initialState: questionInitialState
} = createResource(PropTypes.string)
export { questionShape }

// Reducer
export default createReducer({
  question: questionInitialState
})

// Selectors
