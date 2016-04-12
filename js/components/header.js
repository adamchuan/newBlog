import React, {
    Component, PropTypes
}
from 'react'

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
                        <li>POSTS</li>
                        <li>TAGS</li>
                        <li>PROJECTS</li>
                        <li>ABOUT</li>
                    </ul>
                </nav>
              </div>
          </header>
        )
    }
}

export default Header