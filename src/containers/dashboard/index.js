import React, { PureComponent } from 'react'
import TelegramLoginButton from 'react-telegram-login'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RenderIf } from 'lessdux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { toastr } from 'react-redux-toastr'
import Switch from 'react-switch'

import * as questionsActions from '../../actions/questions'

import './dashboard.css'

const toastrOptions = {
  timeOut: 3000,
  showCloseButton: false
}

class Dashboard extends PureComponent {
  state = {
    success: null,
    msg: true,
    checked: false,
    setPassword: false,
    password: null
  }

  static propTypes = {
    // Action Dispatchers
    fetchQuestions: PropTypes.func.isRequired
  }

  componentDidMount() {

  }

  handleChangePassword = e => this.setState({password: e.target.value})

  handleSetPassword = () => {
    const { password } = this.state
    const { fetchQuestions } = this.props
    this.setState({setPassword: true})
    fetchQuestions(password)
  }

  handleChangeValid = (questionId, valid) => () => {
    const { password } = this.state
    const { updateQuestions } = this.props
    updateQuestions(questionId, !valid, password)
  }

  static propTypes = {}

  render() {
    const { questions } = this.props
    const { setPassword } = this.state
    return (
      <div className="Dashboard">
        <div><h1>Dashboard</h1></div>
          {
            questions.data && questions.data && questions.data[0] ? (
              <div className="Dashboard-content">
                {questions.data.map((q, index) => (
                  <div
                    key={index}
                    className="Dashboard-content-question"
                  >
                    <div className="Dashboard-content-question-title">
                      <div>
                        <b>#{++index} {q.question}</b>
                      </div>

                      <div>
                        <label htmlFor="normal-switch">
                          <Switch
                            onChange={this.handleChangeValid(q._id, q.valid)}
                            checked={q.valid}
                            id="normal-switch"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="Dashboard-content-question-proposals">
                      <div className="Dashboard-content-question-proposals-proposal">{q.proposals[0]}</div>
                      <div className="Dashboard-content-question-proposals-proposal">{q.proposals[1]}</div>
                      <div className="Dashboard-content-question-proposals-proposal">{q.proposals[2]}</div>
                      <div className="Dashboard-content-question-proposals-proposal">{q.proposals[3]}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                  <input type="text" name="password" onChange={this.handleChangePassword} />
                  <button onClick={this.handleSetPassword}>Set password</button>
              </div>
            )
          }
      </div>
    )
  }
}

export default connect(
  state => ({
    questions: state.questions.questions,
    profile: state.profile.profile
  }),
  {
    fetchQuestions: questionsActions.fetchQuestions,
    updateQuestions: questionsActions.updateQuestions
  }
)(Dashboard)
