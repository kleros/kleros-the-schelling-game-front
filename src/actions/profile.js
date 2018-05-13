import { createActions } from 'lessdux'

/* Actions */

// post a profile
export const profile = {
  ...createActions('PROFILE', {
    withCreate: true,
    withUpdate: true
  }),
  TELEGRAM: 'TELEGRAM_PROFILE'
}

/* Action Creators */

// Profile
export const createProfile = (ref) => ({
  type: profile.CREATE,
  payload: { ref }
})

// Add telegram account
export const addTelegram = (signMsg, telegram) => ({
  type: profile.TELEGRAM,
  payload: { signMsg, telegram }
})
