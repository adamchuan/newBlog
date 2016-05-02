import React from 'react'
import marked from 'marked'
import {highlightAuto} from 'highlight.js'
import { connect } from 'react-redux'
import DialogLoad from './dialogLoad.js'
import { requestPost, changePost, savePost, deletePost, createPost } from '../actions'
import {Link, RouteContext} from 'react-router'
import reactMixin from 'react-mixin'

marked.setOptions({
  highlight: (code) => {
    return highlightAuto(code).value
  }
})

class TagsPanel extends React.Component {

  constructor (props, context) {
    super(props, context)
    this.state = {
      showPannel: false
    }

    /*
    为了不影响react的事件系统 需要一个单独的变量来表示，
    点击是否是在tagspanel的区域触发，通过判断这个变量来
    是否关闭添加面板
     */
    this.isClickOnPanel = false
  }

  componentDidMount () {
    this.refs.editorTagsWrapperEl.addEventListener('click', this.handlerShowPanel.bind(this))
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
    if (newPostTags.indexOf(postTag) === -1) {
      newPostTags.push(postTag)
      changeTags(newPostTags)
    }
  }

  handlerShowPanel (e) {
    this.isClickOnPanel = true
    if (!this.state.showPannel) {
      this.setState({
        showPannel: true
      })
    }
  }

  handlerRemovePanel (e) {
    if (this.state.showPannel && !this.isClickOnPanel) {
      this.setState({
        showPannel: false
      })
    }
    this.isClickOnPanel = false
  }

  render () {
    const {tags, postTags} = this.props
    const {showPannel} = this.state
    return (
      <div ref='editorTagsWrapperEl' className='editor-tags-wrapper' >
        {postTags.map((postTag, index) => {
          return <div key={index} className='editor-tags-item'>
            <span className='word-mid'>
              {tags[postTag].name}
            </span>
            <svg
              className='i-close'
              onClick={() => {
                this.deletePostTag(postTag)
              }}
              viewBox='0 0 40 40'>
              <path d='M0,0L40,40ZM40,0L0,40Z'/>
            </svg>
          </div>
        })}
        <div
          style={{
            'display': showPannel ? 'block' : 'none'
          }}
          className='editor-tag-select-panel'
        >
          {tags.map((tag) => {
            return <span
              className='editor-tags-item'
              key={tag.index}
              onClick={() => {
                this.addPostTag(tag.index)
              }}>
              {tag.name}
            </span>
          })}
        </div>
      </div>
    )
  }
}

class EditorAside extends React.Component {

  createPost () {
    const {dispatch} = this.props
    dispatch(createPost({
      title: '新建文章'
    }))
  }

  render () {
    return (
      <aside className='editor-aside'>
        <div className='editor-aside-item' onClick={this.createPost.bind(this)}>
          <button className='btn btn-default'>
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
    /* 是否被保存了 */
    this.isSaved = true
  }

  componentWillReceiveProps (nextProps) {
    if (this.id !== nextProps.params.postid) {
      const { dispatch } = this.props
      const postid = nextProps.params.postid
      this.id = postid
      dispatch(requestPost(postid))
    }
  }

  routerWillLeave (nextLocation) {
    if (!this.state.isSaved) {
      return '文章还未保存，是否要离开'
    }
    return false
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
    this.isSaved = false
  }

  changeTitle (e) {
    const { dispatch } = this.props
    dispatch(changePost({
      title: e.target.value
    }))
    this.isSaved = false
  }

  changeSummary (e) {
    const { dispatch } = this.props
    dispatch(changePost({
      summary: e.target.value
    }))
    this.isSaved = false
  }

  changeTags (newPostTags) {
    const { dispatch } = this.props
    dispatch(changePost({
      tags: newPostTags
    }))
    this.isSaved = false
  }

  savePost () {
    const { dispatch } = this.props
    dispatch(savePost())
    this.isSaved = true
  }

  deletePost () {
    const { dispatch } = this.props
    dispatch(deletePost())
    this.isSaved = true
  }

  render () {
    const {posts, dispatch} = this.props
    const {title, summary, tags, content, isLoad, isFetching} = this.props.post
    const markedContent = marked(content)

    const changeTitle = this.changeTitle.bind(this)
    const changeContent = this.changeContent.bind(this)
    const changeTags = this.changeTags.bind(this)
    const changeSummary = this.changeSummary.bind(this)

    return (
      <div className='editor-area'>
        {isFetching ? <DialogLoad /> : ''}
        <EditorAside posts={posts} dispatch={dispatch} />
        {isLoad
        ? <div className='editor-wrapper'>
           <div className='form-group'>
             <label>博文标题</label>
             <input 
              type='text' 
              className='form-control' 
              defaultValue={title}
              placeholder='博文标题'
              onBlur={changeTitle} />
           </div>
           <div className='form-group'>
             <label>博文标题</label>
             <textarea 
              type='text' 
              rows="3"
              className='form-control' 
              defaultValue={summary}
              placeholder='博文概要'
              onBlur={changeSummary} />
           </div>
          <div className='form-group editor-row'>
            <TagsPanel
              tags={this.props.tags}
              postTags={tags}
              changeTags={changeTags}
            />
          </div>
          <div className='form-group editor-panel-wrapper'>
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
          <div className='form-group'>
            <button 
              className='btn btn-success' 
              onClick={this.savePost.bind(this)}>
                保存文章
            </button>
            <button 
              className='btn btn-danger' 
              onClick={this.deletePost.bind(this)}>
                删除文章
            </button>
           </div>
        </div>
        : null
        }
      </div>
    )
  }
}

// reactMixin.onClass(Editor, RouteContext)

export default connect((state) => {
  const {post, tags} = state
  return Object.assign({
    tags,
    post,
    posts: state.posts.posts
  })
})(Editor)

