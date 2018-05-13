import React, { PureComponent } from 'react'
import TelegramLoginButton from 'react-telegram-login'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { RenderIf } from 'lessdux'

import * as walletActions from '../../actions/wallet'
import * as walletSelectors from '../../reducers/wallet'
import Identicon from '../../components/identicon'
import * as profileActions from '../../actions/profile'
import { web3 } from '../../bootstrap/dapp-api'

import question from './question.png'
import './home.css'

const env = process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV'

class Home extends PureComponent {
  state = {
    isStart: false,
    address: ''
  }

  static propTypes = {
    // Redux State
    balance: walletSelectors.balanceShape.isRequired,

    // Action Dispatchers
    fetchBalance: PropTypes.func.isRequired,
    createProfile: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchBalance } = this.props
    fetchBalance()
  }

  handleStart = () => {
    const {profile} = this.props
    this.props.createProfile()
  }

  handleScores = v => v

  handleChangeAddress = e => {
    this.setState({
      address: e.target.value
    })
  }

  render() {
    const { isStart } = this.state
    const { profile, balance, accounts } = this.props

   if (profile.data) {
     return <Redirect to="/game" />
   }

    return (
      <RenderIf
        resource={balance}
        loading="Loading balance..."
        done={
          balance.data && accounts.data && (
            <div className="Home">
              <div className="Home-navbar">
                <div className="Home-navbar-title">Schelling game</div>
                <div className="Home-navbar-balance">
                  <div className="Home-navbar-balance-identicon">
                    <Identicon
                      seed={accounts.data[0]}
                      size={10}
                    />
                  </div>
                  <div className="Home-navbar-balance-amount">
                    {Math.round(balance.data.toString() * 100) / 100} ETH
                  </div>
                </div>
              </div>
              <div className="Home-content">
                <div className="Home-content-subtitle">
                  WILL YOU FIND THE SCHELLING POINT?
                  <div>
                    <img className="Home-content-subtitle-question" src={question} alt="question" />
                  </div>
                  <div className="Home-content-subtitle-buttons">
                    <button onClick={this.handleStart} className="Home-content-subtitle-buttons-start">Start</button>
                    <button onClick={this.handleScores} className="Home-content-subtitle-buttons-scores">Scores</button>
                  </div>
                  <div className="panel-wrapper">
                    <a href="#show" className="show btn" id="show">Show Full Article</a>
                    <a href="#hide" className="hide btn" id="hide">Hide Full Article</a>
                    <div className="panel">
                      To play you need a balance of 1eth of your Ethereum address and
                      sign a message to proove you are the owner of this address.
                      <br />The goal is to find the Schelling Point for each question.
                      When you find it your score is increase by 1 and you'll win the PNK
                      of them who are going to respond "badly".
                      If you don't it your score decrease by one. And all users who respond
                      corectly wins a fraction of your PNK.
                      The others ways to win PNK are:
                      <ul>
                        <li>you can submitted a question, if this question is validated you earn 10PNK.</li>
                        <li>add your pseudo here and join the kleros telegram</li>
                        <li>share your Schelling Game score on twitter on the page /scores</li>
                      </ul>
                      Once you answer all the questions you must wait 10 minutes to reset your questions.
                      This workflow is to avoid to bribe the game in submitting lot of malicious votes.
                      For more information, you can read this article it explains the advantages
                      of a gamedrop and how it works.
                      Have fun!
                    </div>
                    <div className="fade"></div>
                    </div>
                </div>

                <div className="Home-content-footer">
                  <footer>
                    © WTFPL - 2018 - <Link to='/submit-question'>Submit a question</Link> | <Link to='/dashboard'>Dashboard</Link>
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
      />
    )
  }
}

export default connect(
  state => ({
    profile: state.profile.profile,
    balance: state.wallet.balance,
    accounts: state.wallet.accounts
  }),
  {
    createProfile: profileActions.createProfile,
    fetchBalance: walletActions.fetchBalance
  }
)(Home)
