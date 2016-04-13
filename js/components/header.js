import React, {
    Component, PropTypes
}
from 'react'
import {
    Link
}
from 'react-router'
class Header extends Component {
    constructor( props ) {
        super( props )
    }
    render() {
        return (
            <header className="header-container">
              <div className="header-inner">
                <div className="blog-name">
                    Adam Blog
                </div>
                <nav className="nav-wrapper">
                     <ul>
                        <li>
                            <Link to="/posts">POSTS</Link>
                        </li>
                        <li>
                            <Link to="/tags">TAGS</Link>
                        </li>
                        <li>
                            <Link to="/projects">PROJECTS</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                    </ul>
                </nav>
              </div>
          </header>
        )
    }
}

export default Header