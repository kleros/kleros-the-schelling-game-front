import { createActions } from 'lessdux'

/* Actions */

// post a profile
export const profile = createActions('PROFILE')

/* Action Creators */

// Profile
export const createProfile = profile => ({
  type: profile.CREATE,
  payload: { profile }
})
