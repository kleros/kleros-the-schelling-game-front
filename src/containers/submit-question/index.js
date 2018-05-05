import React, { PureComponent } from 'react'
import TelegramLoginButton from 'react-telegram-login'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import * as profileActions from '../../actions/profile'

import './submit-question.css'

class SubmitQuestion extends PureComponent {
  static propTypes = {
    // Action Dispatchers
    createProfile: PropTypes.func.isRequired
  }

  handleUserInfo = profile => this.props.createProfile(profile)

  handleChangeQuestion = e => (e.target.value)

  render() {
    const { profile } = this.props

   if (profile.data && profile.data.telegram_id) {
     return <Redirect to='/question' />;
   }

    return (
      <div className="submitQuestion">
        <div className="submitQuestion-content">
          <div className="submitQuestion-content-title">
            <h1>SUBMIT A QUESTION</h1>
          </div>
          <div className="submitQuestion-content-question">
            <input name="question" onChange={this.handleChangeQuestion} placeholder="Question?" />
            <div className="submitQuestion-content-proposals">
              {
                [1,2,3,4].map(index =>
                  <div>
                    <input placeholder={`Proposal ${index}`} name="proposal-{i}" onChange={() => index => index} />
                  </div>
                )
              }
            </div>
          </div>
          <div className="submitQuestion-content-submit">
            <button>SUBMIT</button>
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
)(SubmitQuestion)
