import React, { PureComponent } from 'react'
import TelegramLoginButton from 'react-telegram-login'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RenderIf } from 'lessdux'
import { Redirect } from 'react-router'

import * as profileActions from '../../actions/profile'
import * as scoresActions from '../../actions/scores'

import './score.css'

class Scores extends PureComponent {
  state = {
    start: false
  }

  static propTypes = {
    // Action Dispatchers
    createProfile: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchScores } = this.props
    fetchScores()
  }

  handleUserInfo = profile => this.props.createProfile(profile)

  handleStart = () => this.setState({ start: true })

  render() {
    const { start } = this.state
    const { profile, scores } = this.props

   if (start) {
     return <Redirect to='/question' />;
   }

    return (
      <div className="Balance">
        <div className="Balance-message">
          <b>SCHELLINGGAME</b>
        </div>
        <div className="Balance-message">
          <RenderIf
            resource={profile}
            loading="Loading profile..."
            done={
              profile.data && profile.data.telegram_id && scores.data && (
                <span>
                  {scores.data.map((s, index) => (
                    <div value={index} key={index}>
                      {`${s.username} ${s.amount}PNK`}
                      <hr />
                    </div>
                  ))}
                  <button onClick={this.handleStart}>Replay</button>
                </span>
              )
            }
            failedLoading={
              <span>Failed to fetch scores</span>
            }
          />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    profile: state.profile.profile,
    scores: state.scores.scores
  }),
  {
    createProfile: profileActions.createProfile,
    fetchScores: scoresActions.fetchScores
  }
)(Scores)
