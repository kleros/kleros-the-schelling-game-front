import { createActions } from 'lessdux'

/* Actions */

// post a profile
export const profile = {
  ...createActions('PROFILE', {
    withCreate: true,
    withUpdate: true
  }),
  TELEGRAM: 'TELEGRAM_PROFILE',
  TWITTER: 'TWITTER_PROFILE'
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

// Add twitter account
export const addTwitter = signMsg => ({
  type: profile.TWITTER,
  payload: { signMsg }
})
