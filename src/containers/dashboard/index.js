import React, { PureComponent } from 'react'
import TelegramLoginButton from 'react-telegram-login'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RenderIf } from 'lessdux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { toastr } from 'react-redux-toastr'

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
    msg: true
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

  static propTypes = {}

  render() {
    const { questions } = this.props
    return (
      <div className="Question">
        <RenderIf
          resource={questions}
          loading="Loading question..."
          done={
            questions.data && questions.data && questions.data[0] ? (
              <div className="Question-content">
                <div className="">
                  {questions.data.map((q, index) => (
                    <div
                      key={index}
                    >
                      {q.question}
                      <input type="radio" name="valid" value="true" onChange={this.handleRadioValid(q._id)} /> true
                      <input type="radio" name="valid" value="false" onChange={this.handleRadioValid(q._id)} /> false
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                  <input type="text" name="password" />
                  <button onClick={this.handleSubmit}>Send</button>
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
