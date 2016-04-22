import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import AV from 'avoscloud-sdk'
import DialogLoad from './dialogLoad.js'

class Login extends React.Component {

  constructor (props, context) {
    super(props, context)
    this.state = {
      loginNotice: ''
    }
  }

  login () {
    const {dispatch} = this.props
    const username = this.refs.usernameEl.value
    const password = this.refs.passwordEl.value

    dispatch({
      type: 'LOGIN_VALIDATE'
    })

    AV.User.logIn(username, password)
    .then((user) => {
      if (user.authenticated()) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          data: {
            username,
            password
          }
        })

        const { location } = this.props
        if (location.state && location.state.nextPathname) {
          hashHistory.push(location.state.nextPathname)
        } else {
          hashHistory.push('/manage')
        }
      } else {
        throw new Error('login fasle')
      }
    }, (err) => {
      this.setState({
        notice: err.toString()
      })

      dispatch({
        type: 'LOGIN_FAIL'
      })
    })
    .catch((e) => {
      console.log(e)
    })
  }

  render () {
    const {isFetching} = this.props
    return isFetching
      ? <DialogLoad />
      : (<div className='center-wrapper'>
        <div className='center-inner'>
          <div className='form-wrapper'>
            <div className='form-row'>
              <label className='form-label'>
                账户
              </label>
              <input ref='usernameEl' type='text'autoComplete='off' placeholder='username' className='form-input' />
            </div>
            <div className='form-row'>
              <label className='form-label'>
                密码
              </label>
              <input ref='passwordEl' type='password'autoComplete='off' placeholder='password' className='form-input' />
            </div>
            <div className='form-row'>
              <div className='form-btn'>
                <div className='btn btn1' onClick={this.login.bind(this)}>
                  登陆
                </div>
              </div>
            </div>
            <div className='form-row'>
              <div className='form-notice'>
                <span>{this.state.notice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>)
  }
}

Login.props = {
  login: React.PropTypes.func.isRequired,
  notice: React.PropTypes.string.isRequired
}

export default connect((state) => {
  return Object.assign({}, state.user)
})(Login)
