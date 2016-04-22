import React from 'react'
import {connect} from 'react-redux'

class Manage extends React.Component {
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default connect((state) => {
  let props = Object.assign({}, {
    user: state.user,
    posts: state.posts.posts
  })
  return props
})(Manage)
