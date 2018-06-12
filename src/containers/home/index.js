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
import * as themeActions from '../../actions/theme'
import { web3 } from '../../bootstrap/dapp-api'

import gamedrop from './gamedrop.png'
import './home.css'

const env = process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV'

class Home extends PureComponent {
  state = {
    isStart: false,
    goSale: false,
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
    const { fetchBalance, clearTheme } = this.props
    clearTheme()
    fetchBalance()
  }

  handleStart = () => {
    const { createProfile } = this.props
    const { ref } = queryString.parse(this.props.location.search)
    this.props.createProfile(ref)
  }

  handleStartGeneral = () => {
    const { setTheme } = this.props
    setTheme('general')
    this.setState({isStart: true})
  }

  handleStartFootball = () => {
    const { setTheme } = this.props
    setTheme('football')
    this.setState({isStart: true})
  }

  handleStartCrypto = () => {
    const { setTheme } = this.props
    setTheme('crypto')
    this.setState({isStart: true})
  }

  handleSale = () =>
    this.setState({
      goSale: true
    })

  handleChangeAddress = e => {
    this.setState({
      address: e.target.value
    })
  }

  render() {
    const { isStart, goSale } = this.state
    const { profile, balance } = this.props

    if (
      profile.data &&
      isStart &&
      Math.round(balance.data.toString() * 100) / 100 >= 0.1
    ) {
      return <Redirect to="/game" />
    } else if (
      profile.data &&
      isStart &&
      Math.round(balance.data.toString() * 100) / 100 < 0.1
    ) {
      toastr.success('You need a balance of at least 0.1 ETH to play.')
    }

    if (goSale) {
      return <Redirect to="https://kleros.io/token-sale" />
    }

    return (
      <div className="Home">
        <div className="Home-content">
          <h1>Schelling Game over!</h1>
          <img
            className="Home-content-gamedrop-img"
            src={gamedrop}
            alt="gamedrop"
          />
          The Shelling game is finished. <b>Kudos to all participants!</b><br /><br />
          The results are published on <a href="https://t.co/8iqT44pumw">https://t.co/8iqT44pumw</a>.<br /><br />
          <b>The token distribution will be made after the first round of sale.</b>
          <br />
          <br />
          We start a new experiment, it's a <b>dogelist</b>.<br /><br />
          The objective is to test Kleros to create a curated list containing only dogs.<br />

          If someone succed to publish another thing than a doge like a cat, he wins.<br />

          So we will easily see how effective Kleros is at creating a curated list by 
          listing all pictures that are not dogs at the end of the pilot.<br />
          <br />
          This dapp is designed to deploy on the <b>mainet in July</b>.<br />
          <br />
          If this experiment is successful, we'll can use Kleros for lot of curated lists:
          <ul>
            <li>domain names list</li>
            <li>comments in social media</li>
            <li>filter curicculum vitae</li>
          </ul>

          To be part of Kleros and <b>become a Kleros juror</b> to arbitrate these different disputes, 
          you can participate in the sale:
          <br /><br />
          <center>
            <a class="default large pill" href="https://kleros.io/token-sale">JOIN KLEROS TOKEN SALE</a>
          </center>
          <footer>
            &copy; Kleros 2018
          </footer>
        </div>
      </div>
    )
  }
}


export default connect(
  state => ({
    profile: state.profile.profile,
    balance: state.wallet.balance,
    accounts: state.wallet.accounts,
    theme: state.theme
  }),
  {
    createProfile: profileActions.createProfile,
    fetchBalance: walletActions.fetchBalance,
    clearTheme: themeActions.clearTheme,
    setTheme: themeActions.setTheme
  }
)(Home)
