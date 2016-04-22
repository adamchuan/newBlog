import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class Post extends Component {

  render () {
    let {title, date, summary, id} = this.props.post
    return (
      <Link to={`post/${id}`}>
        <section className='post-wrap'>
          <header className='post-header-wrap'>
            <h2 className='post-title'>{title}</h2>
            <small><time className='post-time'> <i className='icon-calendar'></i> <span>{date}</span> </time></small>
          </header>
          <div className='post-content' dangerouslySetInnerHTML={{__html: summary}}></div>
        </section>
      </Link>
    )
  }
}

class Posts extends Component {

  render () {
    const {posts, tags, dispatch} = this.props
    return (
      <div className='pageWrap'>
        <div className='posts-container'>
          {posts.map((post) => {
            return <Post key={post.id} tags={tags} post={post} dispatch={dispatch} />
          })}
        </div>
      </div>
    )
  }
}

Posts.PropTypes = {
  posts: PropTypes.array.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.number.isRequired
  ).isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect((state) => {
  const tags = state.tags
  const posts = state.posts.posts

  return {
    posts,
    tags
  }
})(Posts)
