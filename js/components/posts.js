import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class Post extends Component {

  render () {
    const {title, date, summary, id} = this.props.post
    const {index} = this.props
    return (
      <Link to={`post/${id}/${index}`}>
        <section className='row'>
          <div className='col-lg-6 col-lg-offset-3'>
            <header className='post-header-wrap'>
              <h2 className='post-title'>{title}</h2>
            </header>
            <div className='post-content' dangerouslySetInnerHTML={{__html: summary}}></div>
            <div className='post-meta'>
              Posted by AdamChuan on {date}
            </div>
          </div>
        </section>
      </Link>
    )
  }
}

class Posts extends Component {

  render () {
    const {posts, tags, dispatch} = this.props
    return (
      <div className='container'>
        {posts.map((post, index) => {
          return <Post 
            key={post.id} 
            tags={tags} 
            post={post}
            index={index}
            dispatch={dispatch} 
          />
        })}
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
