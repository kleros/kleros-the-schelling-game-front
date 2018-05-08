import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import { reducer as toastr } from 'react-redux-toastr'

import question from './question'
import questions from './questions'
import profile from './profile'
import vote from './vote'
import scores from './scores'

// Export root reducer
export default combineReducers({
  router,
  form,
  question,
  profile,
  vote,
  scores,
  questions,
  toastr
})
