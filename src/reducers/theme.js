import * as themeActions from '../actions/theme'
import {
    SET_THEME,
    CLEAR_THEME
  } from '../actions/theme'

const theme = (state = '', action) => {
    switch (action.type) {
      case SET_THEME:
        return action.payload
      case CLEAR_THEME:
        return ''
      default:
        return state
    }
  }

export default theme