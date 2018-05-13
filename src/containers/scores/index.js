import React, { PureComponent } from 'react'
import TelegramLoginButton from 'react-telegram-login'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RenderIf } from 'lessdux'
import { Redirect } from 'react-router'
import queryString from 'query-string'
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'

import * as profileActions from '../../actions/profile'
import * as scoresActions from '../../actions/scores'
import * as voteActions from '../../actions/vote'
import * as walletActions from '../../actions/wallet'
import * as walletSelectors from '../../reducers/wallet'
import Identicon from '../../components/identicon'

import './score.css'

class Scores extends PureComponent {
  state = {
    address: '',
    msg: null,
    isReplay: false
  }
  static propTypes = {
    // Action Dispatchers
    fetchScores: PropTypes.func.isRequired,
    fetchBalance: PropTypes.func.isRequired,
    clearVote: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchScores, clearVote, fetchBalance } = this.props
    fetchBalance()
    const { address, msg } = queryString.parse(this.props.location.search)
    fetchScores()
    clearVote()
    this.setState({address, msg})
  }

  handleReplay = () => this.setState({
    isReplay: true
  })

  render() {
    const { scores, profile, accounts, balance } = this.props
    const { address, msg, isReplay } = this.state

    if (isReplay) {
      return <Redirect to="/game" />
    }

    return (
      <RenderIf
        resource={scores}
        done={
          scores.data && balance.data && (
            <div className="Scores">
              <div className="Scores-navbar">
                <div className="Scores-navbar-title">
                  <Link to='/' className="Scores-navbar-title-link">
                    Schelling game
                  </Link>
                </div>
                {profile.data && (
                  <div className="Scores-navbar-stats">
                    <div>
                      {scores.data.map((s, index) => (
                        <div key={index} className="Scores-content-table-items">
                          {s.address === profile.data.address &&
                            <b>#{index+1}</b>
                          }
                        </div>
                      ))}
                    </div>
                    {!profile.data.telegram.startsWith('telegram-') &&
                      <div>
                        Telegram: {profile.data.telegram}
                      </div>
                    }
                    {profile.data.affiliates.length > 0 &&
                      <div>
                        Affiliates: {profile.data.affiliates.length}
                      </div>
                    }
                    <div>
                      Questions: {profile.data.questions.lenght} /
                    </div>
                    <div>
                      Reset questions in {Math.round((3600 * 1000 - (Date.now() - new Date(profile.data.lastVoteTime).getTime())) / 1000 / 60)}min
                    </div>
                    {profile.data && (
                      <div>
                        <button className="Scores-navbar-replay" onClick={this.handleReplay}>
                          Replay
                        </button>
                      </div>
                    )}
                  </div>
                )}
                <div className="Scores-navbar-balance">
                  <div className="Scores-navbar-balance-identicon">
                    <Identicon
                      seed={accounts.data[0]}
                      size={10}
                    />
                  </div>
                  <div className="Scores-navbar-balance-amount">
                    {Math.round(balance.data.toString() * 100) / 100} ETH
                  </div>
                </div>
              </div>

              <div className="Scores-content">
                <div className="Scores-content-subtitle">
                  SCORES
                </div>
                <div className="Scores-content-table">
                  {scores.data.map((s, index) => (
                    <div key={index} className="Scores-content-table-items">
                      <div className="Scores-content-table-items-item index"><b>#{index+1}</b></div>
                      <div className="Scores-content-table-items-item address">{s.address}</div>
                      <div className="Scores-content-table-items-item pnk">{Math.round(s.amount.toString() * 100) / 100} PNK</div>
                      <div className="Scores-content-table-items-item score ">{s.best_score}</div>
                    </div>
                  ))}
                </div>


                <div className="Home-content-footer">
                  <footer>
                    © WTFPL 2018 - propulsed by <a href="https://kleros.io">Kleros</a>
                  </footer>
                </div>
              </div>
            </div>
        )}
        failedLoading={
          <div>
            There was an error fetching your balance. Make sure{' '}
            <a
              className="Balance-message-link"
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
            >
              MetaMask
            </a>{' '}
            is unlocked and refresh the page.
          </div>
        }
        loading={
          <div className="loader">
            <ClipLoader color={'gray'} loading={true} />
          </div>
        }
      />
    )
  }
}

export default connect(
  state => ({
    scores: state.scores.scores,
    profile: state.profile.profile,
    balance: state.wallet.balance,
    accounts: state.wallet.accounts
  }),
  {
    fetchScores: scoresActions.fetchScores,
    clearVote: voteActions.clearVote,
        fetchBalance: walletActions.fetchBalance
  }
)(Scores)
