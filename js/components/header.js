import React, { Component, PropTypes } from 'react'

class Header extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
        <header>
            <div>
                Adamの平行宇宙
            </div>
            <nav>
                 <ul>
                    <li>文章</li>
                    <li>分类</li>
                    <li>项目</li>
                    <li>关于Adam</li>
                </ul>
            </nav>
        </header>
    )
  }
}

export default Header