import PropTypes from 'prop-types'
import createReducer, { createResource } from 'lessdux'

// Shapes
const {
  shape: profileShape,
  initialState: profileInitialState
} = createResource(PropTypes.string)
export { profileShape }

// Reducer
export default createReducer({
  profile: profileInitialState
})

// Selectors
