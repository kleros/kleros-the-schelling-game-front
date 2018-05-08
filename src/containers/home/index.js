import React, { PureComponent } from 'react'
import TelegramLoginButton from 'react-telegram-login'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

import * as profileActions from '../../actions/profile'

import './home.css'

const env = process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV'

class Home extends PureComponent {
  state = {
    isStart: false
  }

  static propTypes = {
    // Action Dispatchers
    createProfile: PropTypes.func.isRequired
  }

  handleUserInfo = profile => {
    this.props.createProfile(profile)
    localStorage.setItem('storageProfileSchellingGame', JSON.stringify(profile))
  }

  handleStart = () => this.setState({isStart: true})

  render() {
    const { isStart } = this.state
    const { profile } = this.props

   if (isStart) {
     return <Redirect to="/game" />
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
           !(JSON.parse(localStorage.getItem('storageProfileSchellingGame'))) ? (
              <TelegramLoginButton
                dataOnauth={this.handleUserInfo}
                botName={process.env[`REACT_APP_${env}_TELEGRAM_BOT`]}
              />
            ) : (
              <button onClick={this.handleStart}>Start</button>
            )
          }
          <div className="Home-logIn-submitQuestion">
            <Link to='/submit-question'>Submit a question</Link>
          </div>
          <div className="Home-logIn-submitQuestion">
            <Link to='/dashboard'>Dashboard</Link>
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
