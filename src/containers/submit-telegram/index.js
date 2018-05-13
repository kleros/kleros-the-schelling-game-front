import React, { PureComponent } from 'react'
import TelegramLoginButton from 'react-telegram-login'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

import * as progileActions from '../../actions/profile'

import './submit-question.css'

class SubmitTelegram extends PureComponent {
  state = {
    telegramUsername: ''
  }

  static propTypes = {
    // Action Dispatchers
    updateProfile: PropTypes.func.isRequired
  }

  handleChangeTelegram = e => this.setState({telegramUsername: e.target.value})

  render() {
    const { telegramUsername } = this.state
    return (
      <div className="SubmitTelegram">
        <div className="SubmitTelegram-content">
          <div className="SubmitTelegram-content-title">
            <h1>SUBSCRIBE TO THE KLEROS TELEGRAM</h1>
          </div>
          <div className="SubmitTelegram-content-username">
            <input name="telegramUser" onChange={this.handleChangeTelegram} placeholder="Question?" />
          </div>
          <div className="SubmitTelegram-content-address">
            <input placeholder="Telegram username (optional)" name="telegram-username" onChange={this.handleChangeTelegramUsername} />
          </div>
          {
            telegramUsername &&
            <div className="SubmitTelegram-content-submit">
              <button onClick={this.handleSubmitTelegram}>SUBMIT</button>
            </div>
          }
        </div>
        <div className="SubmitTelegram-content-back">
          <Link to='/'>← Back</Link>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({}),
  {
    updateProfile: profileActions.updateProfile
  }
)(SubmitTelegram)
