import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router'

class Header extends Component {

  render () {
    return (
      <header className='header-container'>
        <div className='header-inner'>
          <div className='blog-name'>
            Adam Blog
          </div>
          <nav className='nav-wrapper'>
            <ul>
              <li>
                <IndexLink to='/'>
                  POSTS
                </IndexLink>
              </li>
              <li>
                <Link to='/tags'> TAGS
                </Link>
              </li>
              <li>
                <Link to='/projects'> PROJECTS
                </Link>
              </li>
              <li>
                <Link to='/about'> About
                </Link>
              </li>
              <li>
                <Link to='/manage'> Manage
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}

export default Header
