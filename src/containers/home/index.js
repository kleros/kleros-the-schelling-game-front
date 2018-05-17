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
    const { profile, createProfile } = this.props
    if (!profile.data) {
      const { ref } = queryString.parse(this.props.location.search)
      this.props.createProfile(ref)
    } else {
      this.setState({
        isStart: true
      })
    }
  }

  handleScores = () =>
    this.setState({
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

    if (
      profile.data &&
      isStart &&
      Math.round(balance.data.toString() * 100) / 100 >= 1
    ) {
      return <Redirect to="/game" />
    } else if (
      profile.data &&
      isStart &&
      Math.round(balance.data.toString() * 100) / 100 < 1
    ) {
      toastr.success('You need a balance of at least 1 ETH to play.')
    }

    if (goScores) {
      return <Redirect to="/scores" />
    }

    return (
      <RenderIf
        resource={balance}
        done={
          balance.data &&
          accounts.data && (
            <div className="Home">
              <div className="Home-navbar">
                <div className="Home-navbar-title">
                  <Link to="/" className="Home-navbar-title-link">
                    Schelling Game&nbsp;
                    <sup>
                      <b className="Home-navbar-title-link-alpha">ALPHA</b>
                    </sup>
                  </Link>
                </div>
                <div className="Home-navbar-balance">
                  <div className="Home-navbar-balance-identicon">
                    <Identicon seed={accounts.data[0]} size={10} />
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
                    <img
                      className="Home-content-subtitle-question"
                      src={question}
                      alt="question"
                    />
                  </div>
                  <div className="Home-content-subtitle-buttons">
                    <button
                      onClick={this.handleStart}
                      className="Home-content-subtitle-buttons-start"
                    >
                      {profile.data ? 'Start' : 'Sign up'}
                    </button>
                    <button
                      onClick={this.handleScores}
                      className="Home-content-subtitle-buttons-scores"
                    >
                      Scores
                    </button>
                  </div>
                  <div className="panel-wrapper">
                    <a href="#show" className="show btn" id="show">
                      Show full rules
                    </a>
                    <a href="#hide" className="hide btn" id="hide">
                      Hide full rules
                    </a>
                    <div className="panel">
                      To play, you will sign a message using your Web3 account.
                      We require that you have a balance of at least 1 ETH in
                      the account you sign with, in order to avoid sybil
                      attacks.
                      <br />
                      <br />
                      The goal is to find the Schelling Point for each question.
                      If you find it, your score will increase by 1 and you'll
                      win virtual Pinakions (PNK) from those who didn't. If you
                      don't find it, your score will decrease by 1 and users who
                      did find it win a fraction of your virtual PNK.
                      <br />
                      <br />
                      Other ways to earn virtual PNK:
                      <ul>
                        <li>
                          You can{' '}
                          <Link to="/submit-question">submit a question</Link>.
                          If this question is validated, you earn 10 virtual
                          PNK.
                        </li>
                        <br />
                        <li>
                          Add your username here and join the Kleros Telegram.
                          After validation, you earn 10 virtual PNK.
                        </li>
                        <br />
                        <li>
                          Share your Schelling Game score on twitter from the
                          page /scores to earn 10 virtual PNK.
                        </li>
                      </ul>
                      After answering all questions, you must wait at least 1
                      hour before being able to play again. This is to stop
                      people from spam-answering questions and to make it harder
                      for them to collude.
                      <br />
                      The game finishes on the 15th of June (the end of the full
                      bonus phase in our token sale).
                      <br />
                      <br />
                      All players win 10 real PNK and additionally, the top 100
                      players will receive their virtual PNK score in real PNK,
                      up to 1000 PNK.
                      <br />
                      <br />
                      For more information, you can read this article. It
                      explains the advantages of a "gamedrop" and how it works.
                      <br />
                      <br />
                      <center>
                        <b>Have fun!</b>
                      </center>
                    </div>
                    <div className="fade" />
                  </div>
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
    profile: state.profile.profile,
    balance: state.wallet.balance,
    accounts: state.wallet.accounts
  }),
  {
    createProfile: profileActions.createProfile,
    fetchBalance: walletActions.fetchBalance
  }
)(Home)
