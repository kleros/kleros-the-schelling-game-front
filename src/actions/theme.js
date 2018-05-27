import { createActions } from 'lessdux'

/* Actions */

export const SET_THEME = 'SET_THEME'

/* Action Types */

export const setTheme = theme => ({
    type: SET_THEME,
    payload: theme
})

