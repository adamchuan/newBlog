import AV from 'avoscloud-sdk'
import { hashHistory } from 'react-router'

function actionCreatePost (post) {
  return {
    type: 'CREATE_POST',
    post
  }
}

function actionCreatePostSuccess () {
  return {
    type: 'CREATE_POST_SUCCESS'
  }
}

function actionCreatePostFail () {
  return {
    type: 'CREATE_POST_FAIL'
  }
}

function actionAddPost (post) {
  return {
    type: 'ADD_POST',
    post
  }
}

function actionDeletePost () {
  return {
    type: 'DELETE_POST'
  }
}

function actionDeletePostSuccess () {
  return {
    type: 'DELETE_POST_SUCCESS'
  }
}

function actionDeletePostFail () {
  return {
    type: 'DELETE_POST_FAIL'
  }
}

function actionRemovePost (postid) {
  return {
    type: 'REMOVE_POST',
    postid
  }
}

function actionChangePost (data) {
  return {
    type: 'CHANGE_POST',
    data
  }
}

function actionRequestPost (postid) {
  return {
    type: 'REQUEST_POST',
    id: postid
  }
}

function actionRequestPostSuccess (post) {
  return {
    type: 'REQUEST_POST_SUCCESS',
    post: post
  }
}

function actionRequestPostFail (post) {
  return {
    type: 'REQUEST_POST_FAIL'
  }
}

function actionSavePost () {
  return {
    type: 'SAVE_POST'
  }
}

function actionSavePostSuccess () {
  return {
    type: 'SAVE_POST_SUCCESS'
  }
}

function actionSavePostFail () {
  return {
    type: 'SAVE_POST_FAIL'
  }
}

function actionUpdatePost (postid, data) {
  return {
    type: 'UPDATE_POST',
    postid,
    data
  }
}

function fetchDeletePost (postid) {
  let Post = AV.Object.extend('Article')
  let query = new AV.Query(Post)

  return query
  .get(postid)
  .then((post) => {
    return post.destroy()
  })
}

function fetchCreatePost (postData) {
  let Post = AV.Object.extend('Article')
  let post = new Post()
  return post.save(postData)
}

function shouldRequestPost (state, postid) {
  const post = state.post
  if (post.isFetching) {
    return false
  }
  return state.id !== postid
}

function fetchRequestPost (postid) {
  return new AV.Query('Article')
    .select('content', 'title', 'summary', 'tags')
    .get(postid)
}

function fetchSavePost (postid, data) {
  let Post = AV.Object.extend('Article')
  let query = new AV.Query(Post)

  return query
  .get(postid)
  .then((post) => {
    return post.save(data)
  })
}

export function createPost (post) {
  return (dispatch, getState) => {
    post = Object.assign({
      content: '',
      summary: '',
      title: '',
      tags: []
    }, post)
    dispatch(actionCreatePost(post))
    return fetchCreatePost(post)
    .then((data) => {
      post.id = data.id
      dispatch(actionAddPost(post))
      dispatch(actionCreatePostSuccess())
      hashHistory.push(`editor/${data.id}`)
    }, (err) => {
      console.log(err)
      dispatch(actionCreatePostFail())
    })
  }
}

export function deletePost () {
  return (dispatch, getState) => {
    let state = getState().post
    let postid = state.id
    dispatch(actionDeletePost())
    return fetchDeletePost(postid)
    .then(() => {
      dispatch(actionRemovePost(postid))
      dispatch(actionDeletePostSuccess())
      hashHistory.push('manage')
    }, (err) => {
      console.log(err)
      dispatch(actionDeletePostFail())
    })
  }
}

export function requestPost (postid) {
  return (dispatch, getState) => {
    if (shouldRequestPost(getState(), postid)) {
      dispatch((dispatch) => {
        dispatch(actionRequestPost(postid))
        return fetchRequestPost(postid)
          .then((object) => {
            let date = new Date(object.createdAt)
            dispatch(actionRequestPostSuccess({
              content: object.get('content'),
              summary: object.get('summary'),
              title: object.get('title'),
              tags: object.get('tags'),
              date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`
            }))
          })
          .catch((err) => {
            console.log(err)
            dispatch(actionRequestPostFail())
          })
      })
    }
  }
}

export function savePost () {
  return (dispatch, getState) => {
    let state = getState().post
    let postid = state.id
    dispatch(actionSavePost())
    fetchSavePost(postid, state)
    .then((res) => {
      dispatch(actionUpdatePost(postid, state))
      dispatch(actionSavePostSuccess())
    }, (err) => {
      console.log(err)
      dispatch(actionSavePostFail())
    })
  }
}

export function changePost (data) {
  return (dispatch, getState) => {
    dispatch(actionChangePost(data))
  }
}

