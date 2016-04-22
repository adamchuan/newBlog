import React from 'react'
import marked from 'marked'
import {highlightAuto} from 'highlight.js'
import { connect } from 'react-redux'
import DialogLoad from './dialogLoad.js'
import { requestPostIfNeeded, changePost } from '../actions'
import {Link} from 'react-router'

marked.setOptions({
  highlight: (code) => {
    return highlightAuto(code).value
  }
})

class PostTag extends React.Component {
  render () {
    const {name, onDelete} = this.props

    return (
      <div className='editor-tags-item'>
        {name}
        <svg
          className='i-close'
          onClick={onDelete}
          viewBox='0 0 40 40'>
          <path d='M0,0L40,40ZM40,0L0,40Z'/>
        </svg>
      </div>
    )
  }
}

class Tag extends React.Component {

  render () {
    const {name, onAdd} = this.props

    return (
      <div className='editor-tags-item' onClick={onAdd}>
        {name}
      </div>
    )
  }
}

class TagsPanel extends React.Component {

  constructor (props, context) {
    super(props, context)
    this.state = {
      showPannel: false
    }
  }

  componentDidMount () {
    this.refs.etwEl.addEventListener('click', this.handlerShowPanel.bind(this))
    document.body.addEventListener('click', this.handlerRemovePanel.bind(this))
  }

  componentWillUnmount () {
    document.body.removeEventListener('click', this.handlerRemovePanel)
  }

  deletePostTag (postTag) {
    const { changeTags } = this.props
    const newPostTags = this.props.postTags.filter((tag) => {
      return tag !== postTag
    })
    changeTags(newPostTags)
  }

  addPostTag (postTag) {
    const newPostTags = this.props.postTags
    const { changeTags } = this.props

    if (newPostTags.indexOf(postTag === -1)) {
      newPostTags.push(postTag)
      changeTags(newPostTags)
    }
  }

  handlerShowPanel (e) {
    e.stopPropagation()
    this.setState({
      showPannel: true
    })
  }

  handlerRemovePanel (e) {
    this.setState({
      showPannel: false
    })
  }

  render () {
    const {tags, postTags} = this.props
    const {showPannel} = this.state
    return (
      <div ref='etwEl' className='editor-tags-wrapper' onClick={this.handlerShowPanel.bind(this)}>
        {postTags.map((postTag) => {
          return <PostTag
            key={postTag}
            name={tags[postTag].name}
            onDelete={() => {
              this.deletePostTag(postTag)
            }}
          />
        })}
        {showPannel
        ? <div className='editor-tag-select-panel'>
          {tags.map((tag) => {
            return <Tag
              key={tag.index}
              name={tag.name}
              onAdd={() => {
                this.addPostTag(tag)
              }}
            />
          })}
        </div>
        : ''}
      </div>
    )
  }
}

class EditorAside extends React.Component {

  createArticle () {

  }

  render () {
    return (
      <aside className='editor-aside'>
        <div className='editor-aside-item' onClick={this.createArticle.bind(this)}>
          <button>
              创建新文章
          </button>
        </div>
        {this.props.posts.map((post) => {
          return <EditorAsideItem key={post.id} post={post} />
        })}
      </aside>
    )
  }
}

class EditorAsideItem extends React.Component {
  render () {
    const {post} = this.props
    return (
      <Link to={`editor/${post.id}`} className='editor-aside-item'>
        {post.title}
      </Link>
    )
  }
}

class Editor extends React.Component {

  constructor (props, context) {
    super(props, context)
    this.inputTime = new Date().getTime()
  }

  componentWillReceiveProps (nextProps) {
    if (this.id !== nextProps.params.postid) {
      const { dispatch } = this.props
      const postid = nextProps.params.postid
      this.id = postid
      dispatch(requestPostIfNeeded(postid))
    }
  }

  changeContent (e) {
    const nowTime = new Date().getTime()
    const { dispatch } = this.props

    if (nowTime - this.inputTime > 200) {
      dispatch(changePost({
        content: e.target.value
      }))
      this.inputTime = nowTime
    }
  }

  changeTitle (e) {
    const { dispatch } = this.props
    dispatch(changePost({
      title: e.target.value
    }))
  }

  changeSummary (e) {
    const { dispatch } = this.props
    dispatch(changePost({
      summary: e.target.value
    }))
  }

  changeTags (newPostTags) {
    const { dispatch } = this.props
    dispatch(changePost({
      tags: newPostTags
    }))
  }

  render () {
    const {posts} = this.props
    const {title, summary, tags, content, isLoad, isFetching} = this.props.post
    const markedContent = marked(content)

    const changeTitle = this.changeTitle.bind(this)
    const changeContent = this.changeContent.bind(this)
    const changeTags = this.changeTags.bind(this)
    const changeSummary = this.changeSummary.bind(this)

    return (
      <div className='editor-area'>
        {isFetching ? <DialogLoad /> : ''}
        <EditorAside posts={posts} />
        {isLoad
        ? <div className='editor-wrapper'>
          <div className='editor-row'>
            <input
              className='editor-title'
              type='text'
              defaultValue={title}
              placeholder='博文标题'
              onChange={changeTitle}
             />
          </div>
          <div className='editor-row'>
            <textarea
              className='editor-summary'
              defaultValue={summary}
              placeholder='博文概要'
              onChange={changeSummary}
            />
          </div>
          <div className='editor-row'>
            <TagsPanel
              tags={this.props.tags}
              postTags={tags}
              changeTags={changeTags}
            />
          </div>
          <div className='editor-panel-wrapper'>
            <div className='editor-panel'>
              <textarea
                className='editor-content'
                onChange={changeContent}
                defaultValue={content}
              />
            </div>
            <div className='editor-panel'>
              <div
                className='editor-markdown'
                dangerouslySetInnerHTML={{__html: markedContent}}>
              </div>
            </div>
          </div>
        </div>
        : ''
        }
      </div>
    )
  }
}

export default connect((state) => {
  const {post, tags} = state

  return Object.assign({
    tags,
    post,
    posts: state.posts.posts
  })
})(Editor)

