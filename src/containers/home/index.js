import React, { PureComponent } from 'react'
import TelegramLoginButton from 'react-telegram-login'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import * as profileActions from '../../actions/profile'

import './home.css'

class Home extends PureComponent {
  static propTypes = {
    // Action Dispatchers
    createProfile: PropTypes.func.isRequired
  }

  handleUserInfo = profile => this.props.createProfile(profile)

  render() {
    const { profile } = this.props

   if (profile.data && profile.data.telegram_id) {
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
          <div className="Home-logIn-submitQuestion">
            Submit a question
          </div>
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