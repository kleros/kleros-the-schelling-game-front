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
    fetchScores: PropTypes.func.isRequired,
    clearVote: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchScores, clearVote } = this.props
    fetchScores()
    clearVote()
  }

  render() {
    const { scores } = this.props
    const { username, msg } = queryString.parse(this.props.location.search)

    const profile = JSON.parse(localStorage.getItem('storageProfileSchellingGame'))

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
              scores.data &&
                <span>
                  {scores.data.map((s, index) => (
                    <span key={index}>
                      {
                        profile && s.username === profile.username && (
                          <div className="Scores-content-username">
                            <div><b>#{index+1}</b></div>
                            <div>{s.username}</div>
                            <div>{s.amount} PNK</div>
                            <div>Best score: {s.best_score}</div>
                          </div>
                        )
                      }
                    </span>
                  ))}

                  {msg === 'loose' && (
                    <div className="replay">
                      <button>
                        <Link to='/game'>
                          Replay
                        </Link>
                      </button>
                    </div>
                  )}
                </span>
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
    scores: state.scores.scores
  }),
  {
    fetchScores: scoresActions.fetchScores,
    clearVote: voteActions.clearVote
  }
)(Scores)
