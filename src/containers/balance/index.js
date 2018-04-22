import React, { PureComponent } from 'react'
import TelegramLoginButton from 'react-telegram-login'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RenderIf } from 'lessdux'

import * as profileActions from '../../actions/profile'

import './balance.css'

class Balance extends PureComponent {
  static propTypes = {
    // Action Dispatchers
    createProfile: PropTypes.func.isRequired
  }

  componentDidMount() {
  }

  handleUserInfo = response => {
    const { createProfile } = this.props
    console.log('response handleUserInfo', response)
    createProfile(response)
  }

  render() {
    const { profile } = this.props

    return (
      <div className="Balance">
        <div className="Balance-message">
          <b>SCGELLINGGAME</b>
        </div>
        <div className="Balance-message">
          {
            true && (
              <TelegramLoginButton
                dataOnauth={this.handleUserInfo}
                botName="schelling_bot"
              />
            )
          }
          <RenderIf
            resource={profile}
            loading="Loading profile..."
            done={
              profile.data && profile.data.telegram_id !== undefined && (
                <h1>Start</h1>
              )
            }
            failedLoading={
              <span>
                <button>Start</button>
              </span>
            }
          />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    profile: state.profile.profile
  }),
  {
    createProfile: profileActions.createProfile
  }
)(Balance)
