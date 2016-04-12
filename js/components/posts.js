import React, {
  Component, PropTypes
}
from 'react'

class Post extends Component {
  render() {
    let {
      title, date, summary
    } = this.props.data;
    return (
      <section className="post-wrap">
          <header className="post-header-wrap">
            <h2 className="post-title">
                 {title}
            </h2>
            <small>
              <time className="post-time"> 
                  <i className="icon-calendar"></i>
                  <span>{date}</span>
              </time>
            </small>
          </header>
          <div className="post-content" dangerouslySetInnerHTML={{__html:summary}}></div>
      </section>
    )
  }
}

class Posts extends Component {
  render() {
    return (
      <div className="pageWrap">
          <div className="posts-container">
              {this.props.posts.map((post)=> {
                  return <Post key={post.id} data={post}/>;
              })}
          </div>
      </div>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array
}

export default Posts