import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import fetch from 'isomorphic-fetch'
import DialogLoad from './dialogLoad.js'

class About extends React.Component {

  constructor (props, context) {
    super(props, context)
    this.state = {
      avatar: '',
      name: '',
      location: '',
      email: '',
      company: '',
      isLoad: false
    }
  }

  componentDidMount () {
    fetch(`https://api.github.com/users/adamchuan`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          avatar: json.avatar_url,
          name: json.name,
          location: json.location,
          email: json.email,
          company: json.company,
          isLoad: true
        })
      })
  }

  render () {
    const {name, location, avatar, isLoad, email, company} = this.state
    return !isLoad
      ? (<DialogLoad />)
      : (
      <div className='container'>
        <div className='row'>
          <div className='col-xs-10 col-xs-offset-1 col-md-2 col-md-offset-5'>
            <img src={avatar} alt='...' className='img-responsive img-circle about-avatar center-block' />
          </div>
        </div>
        <div className='about-list text-center'>       
          <h2>{name}</h2>
          <div className='center-inline-block text-left'>
            <p className="text-uppercase">
              <i className='fa fa-users'></i>
              {company}
            </p>
            <p className="text-uppercase">
              <i className='fa fa-map-marker'></i>
              {location}    
            </p>
            <p className='text-uppercase'>
              <i className='fa fa-envelope'></i>
              {email}
            </p>
          </div>
        </div>
      </div>
      )
  }
}

export default connect((state) => {
  return {}
})(About)
