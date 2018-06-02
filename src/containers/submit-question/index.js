import React, { PureComponent } from 'react'
import TelegramLoginButton from 'react-telegram-login'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

import * as questionActions from '../../actions/question'

import './submit-question.css'

class SubmitQuestion extends PureComponent {
  state = {
    question: {}
  }

  static propTypes = {
    // Action Dispatchers
    createQuestion: PropTypes.func.isRequired
  }

  handleChangeTheme = e => {
    this.setState({
      question: { ...this.state.question, theme: e.target.value }
    })
  }

  handleChangeQuestion = e => {
    this.setState({
      question: { ...this.state.question, question: e.target.value }
    })
  }

  handleChangeEthereumAddress = e => {
    this.setState({
      question: { ...this.state.question, address: e.target.value }
    })
  }

  handleSubmitQuestion = () => this.props.createQuestion(this.state.question)

  handleChangeProposal = proposalIndex => e => {
    this.setState({
      question: { ...this.state.question, [proposalIndex]: e.target.value }
    })
  }

  render() {
    const { question } = this.state

    return (
      <div className="submitQuestion">
        <div className="submitQuestion-content">
          <div className="submitQuestion-content-title">
            <h1>SUBMIT A QUESTION</h1>
          </div>
          <div className="submitQuestion-content-question">
            <div  className="submitQuestion-content-theme">
              <select name="theme" onChange={this.handleChangeTheme}>
                <option>Theme</option>
                <option value="general">General</option>
                <option value="crypto">Crypto</option>
                <option value="football">Football</option>
              </select>
            </div>
            <input
              name="question"
              onChange={this.handleChangeQuestion}
              placeholder="Question"
            />
            <div className="submitQuestion-content-proposals">
              {[0, 1, 2, 3].map(index => (
                <div key={index}>
                  <input
                    placeholder={`Proposal ${index}`}
                    name="proposal-{i}"
                    onChange={this.handleChangeProposal(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="submitQuestion-content-address">
            <input
              placeholder="Ethereum address (optional)"
              name="ethereum-address"
              onChange={this.handleChangeEthereumAddress}
            />
          </div>
          {question.theme &&
            question.question &&
            question[0] &&
            question[1] &&
            question[2] &&
            question[3] && (
              <div className="submitQuestion-content-submit">
                <button onClick={this.handleSubmitQuestion}>SUBMIT</button>
              </div>
            )}
        </div>
        <div className="submitQuestion-content-back">
          <Link to="/">← Back</Link>
        </div>
      </div>
    )
  }
}

export default connect(state => ({}), {
  createQuestion: questionActions.createQuestion
})(SubmitQuestion)
