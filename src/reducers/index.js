import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form'

import wallet from './wallet'
import question from './question'
import profile from './profile'
import vote from './vote'
import scores from './scores'

// Export root reducer
export default combineReducers({
  router,
  form,
  wallet,
  question,
  profile,
  vote,
  scores
})
