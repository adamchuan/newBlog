import AV from 'avoscloud-sdk'

function requestPost(postid){
  return {
    type: 'REQUEST_POST',
    id: postid
  }
}

function requestPostSuccess (post) {
  return {
    type: 'REQUEST_POST_SUCCESS',
    post: post
  }
}

function requestPostFail (post) {
  return {
    type: 'REQUEST_POST_FAIL'
  }
}

function shouldRequestPost (state, postid) {
  const post = state.post
  if (post.isFetching) {
    return false
  }
  return state.id !== postid 
}

export function changePost (data) {
  return {
    type: 'CHANGE_POST',
    data
  }
}

export function requestPostIfNeeded (postid) {
  return (dispatch, getState) => {
    if (shouldRequestPost(getState(), postid)) {
      dispatch((dispatch) => {
        dispatch(requestPost(postid))
        return new AV.Query('Article')
          .select('content', 'title', 'summary', 'tags')
          .get(postid)
          .then((object) => {
            let date = new Date(object.createdAt)
            dispatch(requestPostSuccess({
              content: object.get('content'),
              summary: object.get('summary'),
              title: object.get('title'),
              tags: object.get('tags'),
              date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`
            }))
          })
          .catch((err) => {
            console.log(err)
            dispatch(requestPostFail())
          })
      })
    }
  }
}
