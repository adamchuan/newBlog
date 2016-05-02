import React, { Component, PropTypes } from 'react'
import marked from 'marked'
import { highlightAuto } from 'highlight.js'
import { connect } from 'react-redux'
import { requestPost } from '../actions'
import DialogLoad from './dialogLoad.js'

marked.setOptions({
  highlight: (code) => {
    return highlightAuto(code).value
  }
})

class Post extends Component {

  constructor (props, context) {
    super(props, context)
    this.id = this.props.params.postid
    const { dispatch } = this.props
    dispatch(requestPost(this.id))
  }

  componentWillReceiveProps (nextProps) {
    if (this.id !== nextProps.params.postid) {
      const { dispatch } = this.props
      const postid = nextProps.params.postid
      this.id = postid
      dispatch(requestPost(postid))
    }
  }

  compoentDidMount (){
    let el = document.createElement('div')
    el.setAttribute('data-thread-key', this.id)
    el.setAttribute('data-url', window.location.toString())
    window.DUOSHUO.EmbedThread(el)
    this.refs.commentEl.appendChild(el)
  }

  render () {
    const {title, date, content, summary, isFetching, tags} = this.props
    const markContent = marked(content)
    return isFetching
      ? (<DialogLoad />)
      : (
      <section className='post-detail-wrapper'>
        <header className='post-header-wrap'>
          <h2 className='post-title'>{title}</h2>
          <div className='post-info'>
            <time className='post-time'>
              发表于
              <span>{date}</span>
            </time>
            {tags.map((tagname, index) => {
              return (<span key={index} className='post-tag'>{tagname}</span>)
            })}
          </div>
        </header>
        <article className='post-content' dangerouslySetInnerHTML={{__html: summary + markContent}}>
        </article>
        <div ref='commentEl' className='comment-area'>
        </div>
      </section>
      )
  }
}

Post.PropTypes = {
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.number.isRequired
  ).isRequired,
  summary: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  postTime: PropTypes.string.isRequired
}

export default connect((state) => {
  let props = Object.assign({}, state.post)

  props.tags = props.tags.map((value) => {
    return state.tags[value].name
  })

  return props
})(Post)
