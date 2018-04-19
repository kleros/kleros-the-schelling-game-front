import React, { PureComponent } from 'react'
import TelegramLoginButton from 'react-telegram-login'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RenderIf } from 'lessdux'

import * as walletActions from '../../actions/wallet'
import * as walletSelectors from '../../reducers/wallet'
import * as questionActions from '../../actions/question'
import Identicon from '../../components/identicon'

import './balance.css'

class Balance extends PureComponent {
  static propTypes = {
    // Redux State
    balance: walletSelectors.balanceShape.isRequired,

    // Action Dispatchers
    fetchBalance: PropTypes.func.isRequired,

    // Action Dispatchers
    fetchQuestion: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchBalance, fetchQuestion } = this.props
    fetchBalance()
    fetchQuestion()
  }

  handleUserInfo = response => console.log(response)

  render() {
    const { balance } = this.props

    return (
      <div className="Balance">
        <div className="Balance-message">
          <b>Hello CryptoWorld</b>
        </div>
        <br />
        <br />
        <div className="Balance-message">
          <RenderIf
            resource={balance}
            loading="Loading balance..."
            done={
              balance.data && (
                <span>
                  Welcome{' '}
                  <Identicon
                    seed="Placeholder"
                    className="Balance-message-identicon"
                  />, You have {balance.data.toString()} ETH.
                  <TelegramLoginButton
                    dataOnauth={this.handleUserInfo}
                    botName="schelling_bot"
                  />
                </span>
              )
            }
            failedLoading={
              <span>
                There was an error fetching your balance. Make sure{' '}
                <a
                  className="Balance-message-link"
                  href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                >
                  MetaMask
                </a>{' '}
                is unlocked and refresh the page.
              </span>
            }
          />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    balance: state.wallet.balance,
    question: state.question.question
  }),
  {
    fetchBalance: walletActions.fetchBalance,
    fetchQuestion: questionActions.fetchQuestion
  }
)(Balance)
