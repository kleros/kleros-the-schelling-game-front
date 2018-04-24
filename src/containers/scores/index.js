import React, { PureComponent } from 'react'
import TelegramLoginButton from 'react-telegram-login'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RenderIf } from 'lessdux'
import { Redirect } from 'react-router'
import queryString from 'query-string'
import { toastr } from 'react-redux-toastr'

import * as profileActions from '../../actions/profile'
import * as scoresActions from '../../actions/scores'

import './score.css'

const toastrOptions = {
  timeOut: 3000,
  showCloseButton: false
}

toastr.success(`It's not the Schelling Point`, toastrOptions)
toastr.success('msg', toastrOptions)

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

    const { msg } = queryString.parse(this.props.location.search)

  }

  handleUserInfo = profile => this.props.createProfile(profile)

  handleStart = () => {
    toastr.info('The title', 'The message')
  }

  render() {
    const { start } = this.state
    const { profile, scores } = this.props
    const { username, msg } = queryString.parse(this.props.location.search)

   if (start) {
     return <Redirect to='/question' />;
   }

    return (
      <div className="Scores">
        <div className="Scores-title">
          <h1>SCORES</h1>
        </div>
        <div className="Balance-message">
          <RenderIf
            resource={scores}
            loading="Loading scores..."
            done={
              scores.data && (
                <span>
                  {msg === 'loose' && (
                    <div>
                      <button onClick={this.handleStart}>Replay</button>
                    </div>
                  )}
                  {username && username !== 'undefined' && (
                    <div>
                      Hello {username}
                    </div>
                  )}
                  {scores.data.map((s, index) => (
                    <div value={index} key={index} className={s.username === username ? "Scores-target" : ""} id="target">
                      {`${s.username} ${s.amount}PNK`}
                      <hr />
                    </div>
                  ))}

                </span>
              )
            }
            failedLoading={
              <span>Fail to load scores</span>
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
