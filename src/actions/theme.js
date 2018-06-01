import { createActions } from 'lessdux'

/* Actions */

export const SET_THEME = 'SET_THEME'
export const CLEAR_THEME = 'CLEAR_THEME'

/* Action Types */

export const setTheme = theme => ({
    type: SET_THEME,
    payload: theme
})

// Clear vote
export const clearTheme = () => ({ type: CLEAR_THEME })
