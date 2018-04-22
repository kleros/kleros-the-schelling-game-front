import { createActions } from 'lessdux'

/* Actions */

// post a profile
export const profile = {
  ...createActions('PROFILE', {
    withCreate: true
  })
}

/* Action Creators */

// Profile
export const createProfile = profileGet => ({
  type: profile.CREATE,
  payload: { profileGet }
})
