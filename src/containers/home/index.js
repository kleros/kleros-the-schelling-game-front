import React, { PureComponent } from 'react'
import TelegramLoginButton from 'react-telegram-login'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { RenderIf } from 'lessdux'
import { ClipLoader } from 'react-spinners'
import queryString from 'query-string'
import { toastr } from 'react-redux-toastr'

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
    goScores: false,
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
    const {profile, createProfile} = this.props
    if (!profile.data) {
      const { ref } = queryString.parse(this.props.location.search)
      this.props.createProfile(ref)
    } else {
      this.setState({
        isStart: true
      })
    }
  }

  handleScores = () => this.setState({
    goScores: true
  })

  handleChangeAddress = e => {
    this.setState({
      address: e.target.value
    })
  }

  render() {
    const { isStart, goScores } = this.state
    const { profile, balance, accounts } = this.props

   if (profile.data && isStart && (Math.round(balance.data.toString() * 100) / 100) >= 1) {
     return <Redirect to="/game" />
   } else if (profile.data && isStart && (Math.round(balance.data.toString() * 100) / 100) < 1) {
     toastr.success('You need 1ETH on your balance to play.')
   }

   if (goScores) {
     return <Redirect to="/scores" />
   }

    return (
      <RenderIf
        resource={balance}
        done={
          balance.data && accounts.data && (
            <div className="Home">
              <div className="Home-navbar">
                <div className="Home-navbar-title">
                  <Link to='/' className="Home-navbar-title-link">
                    Schelling game
                  </Link>
                </div>
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
                    <button onClick={this.handleStart} className="Home-content-subtitle-buttons-start">{profile.data ? 'Start' : 'Sign up'}</button>
                    <button onClick={this.handleScores} className="Home-content-subtitle-buttons-scores">Scores</button>
                  </div>
                  <div className="panel-wrapper">
                    <a href="#show" className="show btn" id="show">Show full rules</a>
                    <a href="#hide" className="hide btn" id="hide">Hide full rules</a>
                    <div className="panel">
                    To play you need a balance of 1eth and to sign the message
                    proving you are the owner of this address and to prevent a
                    sybil attack.
                    <br />
                    The goal is to find the Schelling Point for each question.

                    When you find it your score will increase by 1 and you'll
                    win pinakions (PNK) from those who respond "incoherently".

                    If you don't find the Schelling point your score will
                    decrease by one and users who respond coherently win a
                    fraction of your PNK.
                    <br /><br />
                    Extra ways to win PNK:
                      <ul>
                        <li>
                          You can submit a question
                          <Link to='/submit-question'>submit a question</Link>,
                          if this question is validated you earn 10PNK
                        </li>
                        <li>
                          Add your pseudo here and join the kleros telegram,
                          after a valiadation you can earn 10PNK
                        </li>
                        <li>
                          Share your Schelling Game score on twitter on the page
                          /scores, you can earn 10PNK
                        </li>
                        <li>
                          Share your reference link&nbsp;
                          <a href={`https://schellinggame.com?ref=${accounts.data[0]}`}>{`https://mvp.kleros.io?ref=${accounts.data[0]}`}</a>,
                          you can earn 10PNK
                        </li>
                      </ul>
                      Once you answer all the questions you must wait 1 hour to
                      reset your questions.
                      This workflow is in order to avoid bribe attacks by
                      submitting many malicious votes.
                      <br />
                      The game is finished after the 15 June (full bonus for the
                      token sale).
                      <br /><br />
                      All players win 10PNK and the 100 best players will
                      receive their score in real PNK up to 1000PNK.
                      <br /><br />
                      The ranking is based on best score and the amount of
                      pinakions. For more information, you can read this article
                      it explains the advantages of a gamedrop and how it works.
                      <br /><br />
                      <center><b>Have fun!</b></center>
                    </div>
                    <div className="fade"></div>
                    </div>
                </div>

                <div className="Home-content-footer">
                  <footer>
                    © WTFPL 2018 - <i>Schelling game</i> propulsed by <a href="https://kleros.io">Kleros</a>
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
    profile: state.profile.profile,
    balance: state.wallet.balance,
    accounts: state.wallet.accounts
  }),
  {
    createProfile: profileActions.createProfile,
    fetchBalance: walletActions.fetchBalance
  }
)(Home)
