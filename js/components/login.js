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
          <div className='form-wrapper form-horizontal'>
            <div className='form-group'>
              <label for='inputEmail3' className='col-sm-2 control-label'>账户</label>
              <div className='col-sm-10'>
                <input ref='usernameEl' type='text' className='form-control' id='inputEmail3' placeholder='Email' />
              </div>
            </div>
            <div className='form-group'>
              <label for='inputEmail3' className='col-sm-2 control-label'>密码</label>
              <div className='col-sm-10'>
                <input ref='passwordEl' type='password' className='form-control' id='inputEmail3' placeholder='Email' />
              </div>
            </div>
            <div className='form-group'>
              <div className='col-sm-offset-2 col-sm-10'>
                <button 
                  className='btn btn-default' 
                  onClick={this.login.bind(this)} 
                  type='submit' >
                  登陆
                </button>
              </div>
            </div>
            <div className='form-group'>
              <div className='col-sm-offset-2 col-sm-10'>
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
