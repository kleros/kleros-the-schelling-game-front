import React, { PureComponent } from 'react'
import TelegramLoginButton from 'react-telegram-login'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RenderIf } from 'lessdux'
import { Redirect } from 'react-router'
import queryString from 'query-string'
import { Link } from 'react-router-dom'

import * as profileActions from '../../actions/profile'
import * as scoresActions from '../../actions/scores'
import * as voteActions from '../../actions/vote'

import './score.css'

class Scores extends PureComponent {
  static propTypes = {
    // Action Dispatchers
    createProfile: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchScores, clearVote } = this.props
    fetchScores()
    clearVote()
  }

  handleUserInfo = profile => this.props.createProfile(profile)

  render() {
    const { profile, scores } = this.props
    const { username, msg } = queryString.parse(this.props.location.search)

    return (
      <div className="Scores">
        <div className="Scores-content">
          <div className="Scores-content-title">
            <h1>SCORES</h1>
          </div>
          <RenderIf
            resource={scores}
            loading="Loading scores..."
            done={
              scores.data && (
                <span>
                  {scores.data.map((s, index) => (
                    <span>
                      {
                        profile.data && s.username === profile.data.username && (
                          <div className="Scores-content-username">
                            <div><b>#{++index}</b></div>
                            <div>{s.username}</div>
                            <div>{s.amount}PNK</div>
                            <div>Score: {s.score}</div>
                            <div>Best score: {s.best_score}</div>
                          </div>
                        )
                      }
                    </span>
                  ))}

                  {msg === 'loose' && (
                    <div className="Scores-content-replay">
                      <Link to='/question'>Replay</Link>
                    </div>
                  )}

                  {scores.data.map((s, index) => (
                    <div value={index} key={index} className={`Scores-content-scores ${profile.data && s.username === profile.data.username ? "Scores-target" : ""}`} id="target">
                      <div><b>#{++index}</b></div>
                      <div>{s.username}</div>
                      <div>{Number.parseFloat(s.amount).toPrecision(4)}PNK</div>
                      <div>{s.best_score}</div>
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
    fetchScores: scoresActions.fetchScores,
    clearVote: voteActions.clearVote
  }
)(Scores)
