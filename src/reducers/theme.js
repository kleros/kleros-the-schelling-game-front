import * as themeActions from '../actions/theme'
import {
    SET_THEME
  } from '../actions/theme'

const theme = (state = '', action) => {
    switch (action.type) {
      case SET_THEME:
        return action.payload
      default:
        return state
    }
  }

export default theme