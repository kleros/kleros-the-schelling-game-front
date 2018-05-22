import React, { PureComponent } from 'react'
import TelegramLoginButton from 'react-telegram-login'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RenderIf } from 'lessdux'
import { Redirect } from 'react-router'
import queryString from 'query-string'
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { TwitterShareButton } from 'react-simple-share'

import * as profileActions from '../../actions/profile'
import * as scoresActions from '../../actions/scores'
import * as voteActions from '../../actions/vote'
import * as walletActions from '../../actions/wallet'
import * as walletSelectors from '../../reducers/wallet'
import * as questionsActions from '../../actions/questions'
import Identicon from '../../components/identicon'

import telegram from './telegram.png'
import './score.css'

const Twitter = ({score, cbOnClick}) => (
  <span onClick={cbOnClick}>
    <TwitterShareButton
      url="https://schellinggame.com"
      color="#1da1f2"
      size="40px"
      text={`I scored ${score} on this cool game @Kleros_io made where you have to find Schelling Points for different questions. Try it now for a chance to win real PNK!`}
      hashtags="gamedrop,ethereum,blockchain"
    />
  </span>
)

class Scores extends PureComponent {
  state = {
    address: '',
    msg: null,
    isReplay: false,
    addTelegram: false,
    telegram: ''
  }
  static propTypes = {
    // Action Dispatchers
    fetchScores: PropTypes.func.isRequired,
    fetchBalance: PropTypes.func.isRequired,
    clearVote: PropTypes.func.isRequired,
    addTelegram: PropTypes.func.isRequired,
    addTwitter: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchScores, fetchBalance, countQuestions } = this.props
    fetchBalance()
    countQuestions()
    const { address, msg } = queryString.parse(this.props.location.search)
    fetchScores()
    this.setState({ address, msg })
  }

  handleReplay = () =>
    this.setState({
      isReplay: true
    })

  handleTelegram = () => this.setState({ addTelegram: true })

  handleTwitter = () => {
    const { addTwitter, profile } = this.props
    addTwitter(profile.data.sign_msg)
  }

  handleSubmit = () => {
    const { addTelegram, profile } = this.props
    const { telegram } = this.state
    addTelegram(profile.data.sign_msg, telegram)
  }

  telegramInputChange = e => this.setState({ telegram: e.target.value })

  render() {
    const {
      scores,
      profile,
      accounts,
      balance,
      questionCount,
      vote,
      clearVote
    } = this.props
    const { address, msg, isReplay, addTelegram } = this.state

    if (isReplay) {
      clearVote()
      return <Redirect to="/game" />
    }

    let timeToReset = 0
    let countQuestionsUp

    if (questionCount.data) {
      countQuestionsUp = questionCount.data.count - 1
    }

    if (profile.data) {
      timeToReset = Math.round(
        (3600 * 1000 -
          (Date.now() - new Date(profile.data.lastVoteTime).getTime())) /
          1000 /
          60
      )
      timeToReset = timeToReset < 0 ? 59 : timeToReset
    }

    if (isNaN(timeToReset)) {
      timeToReset = 59
    }

    let votes
    if (vote.data && vote.data.votes) {
      votes = vote.data.votes
    } else if (profile.data && profile.data.votes) {
      votes = profile.data.votes
    }

    return (
      <RenderIf
        resource={scores}
        done={
          scores.data &&
          balance.data && (
            <div className="Scores">
              <div className="Scores-navbar">
                <div className="Scores-navbar-title">
                  <Link to="/" className="Scores-navbar-title-link">
                    Schelling Game
                  </Link>
                </div>
                {profile.data && questionCount.data && (
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
                    <div>
                      {Math.round(profile.data.amount * 100) / 100} PNK
                    </div>
                    {!profile.data.twitter &&
                      <div className="Scores-navbar-stats-twitter">
                        <Twitter score={profile.data.best_score} cbOnClick={this.handleTwitter} />
                      </div>
                    }
                    {profile.data.telegram.startsWith('telegram-') &&
                      !addTelegram && (
                        <div>
                          <Link to="https://t.me/kleros" target="_blank">
                            <img
                              className="Scores-navbar-stats-telegram"
                              src={telegram}
                              alt="telegram"
                              onClick={this.handleTelegram}
                            />
                          </Link>
                        </div>
                      )}
                      {addTelegram && (
                        <div>
                          <input
                            name="telegram"
                            placeholder="Telegram username"
                            onChange={this.telegramInputChange}
                          />
                          <button
                            className="btn-telegram"
                            onClick={this.handleSubmit}
                          >
                            Submit
                          </button>
                        </div>
                      )}
                      {profile.data.affiliates.length > 0 && (
                        <div>Affiliates: {profile.data.affiliates.length}</div>
                      )}
                      <div>
                        Questions: {votes.length} / {questionCount.data.count}
                      </div>
                      {profile.data &&
                        questionCount.data.count - votes.length > 0 ? (
                          <div>
                            <button
                              className="Scores-navbar-replay"
                              onClick={this.handleReplay}
                            >
                              Replay
                            </button>
                          </div>
                        ) : (
                          <div>Play again in {timeToReset}min</div>
                        )}
                    </div>
                  )}
                <div className="Scores-navbar-balance">
                  <div className="Scores-navbar-balance-identicon">
                    <Identicon seed={accounts.data[0]} size={10} />
                  </div>
                  <div className="Scores-navbar-balance-amount">
                    {Math.round(balance.data.toString() * 100) / 100} ETH
                  </div>
                </div>
              </div>

              <div className="Scores-content">
                <div className="Scores-content-subtitle">SCORES</div>
                <div className="Scores-content-table">
                  {scores.data.map((s, index) => (
                    <div key={index} className="Scores-content-table-items">
                      <div className="Scores-content-table-items-item index">
                        <b>#{index + 1}</b>
                      </div>
                      <div className="Scores-content-table-items-item address">
                        {s.address}
                      </div>
                      <div className="Scores-content-table-items-item pnk">
                        {Math.round(s.amount.toString() * 100) / 100} PNK
                      </div>
                      <div className="Scores-content-table-items-item score ">
                        {s.best_score}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="Home-content-footer">
                  <footer>
                    © WTFPL 2018 - <i>Schelling Game</i> propulsed by{' '}
                    <a href="https://kleros.io">Kleros</a>
                  </footer>
                </div>
              </div>
            </div>
          )
        }
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
    vote: state.vote.vote,
    scores: state.scores.scores,
    profile: state.profile.profile,
    balance: state.wallet.balance,
    accounts: state.wallet.accounts,
    questionCount: state.questions.questions
  }),
  {
    fetchScores: scoresActions.fetchScores,
    clearVote: voteActions.clearVote,
    countQuestions: questionsActions.countQuestions,
    fetchBalance: walletActions.fetchBalance,
    addTelegram: profileActions.addTelegram,
    addTwitter: profileActions.addTwitter
  }
)(Scores)
