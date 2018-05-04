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
  showCloseButton: false,
  password: null
}

class Dashboard extends PureComponent {
  state = {
    success: null,
    msg: true,
    checked: false
  }

  static propTypes = {
    // Action Dispatchers
    fetchQuestions: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchQuestions } = this.props
    fetchQuestions()
  }

  handleModerate = e => e

  handleSubmit = v => v

  handleChange = v => v

  handleRadioValid = questionId => e => console.log(questionId, e.target.value)

  handleChangeValid = v => v

  static propTypes = {}

  render() {
    const { questions } = this.props
    return (
      <div className="Dashboard">
        <div><h1>Dashboard</h1></div>
        <RenderIf
          resource={questions}
          loading="Loading dashboard..."
          done={
            questions.data && questions.data && questions.data[0] ? (
              <div className="Dashboard-content">
                {questions.data.map((q, index) => (
                  <div
                    key={index}
                    className="Dashboard-content-question"
                  >
                    <div className="Dashboard-content-question-title">
                      <div>
                        <b>#{index+1} {q.question}</b>
                      </div>

                      <div>
                        <label htmlFor="normal-switch">
                          <Switch
                            onChange={this.handleChangeValid}
                            checked={q.proposals[0].valid ? 'checked' : 'unchecked'}
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
                  <input type="text" name="password" />
                  <button onClick={this.handleSubmit}>Send password</button>
              </div>
            )
          }
          failedLoading={<span />}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    questions: state.questions.questions,
  }),
  {
    fetchQuestions: questionsActions.fetchQuestions
  }
)(Dashboard)
