import React, { PureComponent } from 'react'
import TelegramLoginButton from 'react-telegram-login'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RenderIf } from 'lessdux'
import { Redirect } from 'react-router'

import * as profileActions from '../../actions/profile'

import './home.css'

class Home extends PureComponent {
  state = {
    start: false
  }

  static propTypes = {
    // Action Dispatchers
    createProfile: PropTypes.func.isRequired
  }

  handleUserInfo = profile => this.props.createProfile(profile)

  handleStart = () => this.setState({ start: true })

  render() {
    const { start } = this.state
    const { profile } = this.props

   if (start) {
     return <Redirect to='/question' />;
   }

    return (
      <div className="Home">
        <div className="Home-title">
          <div>
            <h1>SCHELLIN<b>GG</b>AME</h1>
          </div>
        </div>
        <div className="Home-logIn">
          {
             !(profile.data && profile.data.telegram_id) && (
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
              profile.data && profile.data.telegram_id && (
                <button onClick={this.handleStart}>Start</button>
              )
            }
            failedLoading={
              <span></span>
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
)(Home)
