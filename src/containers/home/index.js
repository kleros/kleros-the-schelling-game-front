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
    const {profile, balance} = this.props
    const {address} = this.state
    this.props.createProfile({address})
  }

  handleChangeAddress = e => {
    this.setState({
      address: e.target.value
    })
  }

  render() {
    const { isStart } = this.state
    const { profile, balance } = this.props

   if (profile.data) {
     return <Redirect to="/game" />
   }

    return (
      <div className="Home">
        <div>
          <h1 style={{ margin: 0 }}>Schelling Game</h1>
        </div>
        <div className="start">
          To play enter your&nbsp;
          <input name="address" onChange={this.handleChangeAddress} placeholder="Ethereum address" />
          <button onClick={this.handleStart}>Start</button>
        </div>
        <div>
          <RenderIf
            resource={balance}
            loading="Loading balance..."
            done={
              balance.data && (
                <div className="balance">
                  Welcome{' '}
                  <Identicon
                    seed="Placeholder"
                    className="Balance-message-identicon"
                  />, You have {balance.data.toString()} ETH.
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
        </div>
        <div>
          <footer>
            © WTFPL - 2018 - <Link to='/submit-question'>Submit a question</Link> | <Link to='/dashboard'>Dashboard</Link>
          </footer>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    profile: state.profile.profile,
    balance: state.wallet.balance
  }),
  {
    createProfile: profileActions.createProfile,
    fetchBalance: walletActions.fetchBalance
  }
)(Home)
