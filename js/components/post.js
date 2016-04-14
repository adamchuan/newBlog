import React from 'react'

import {
    connect
}
from 'react-redux'

import {
    markdown
}
from "markdown"

import {
    Link
}
from 'react-router'

class Post extends React.Component {

    componentWillReceiveProps(nextProps) {
        this.id = nextProps.params.postid

        dispatch({
            'type': 'SELECT_POST',
            'selectPostId': this.id
        })

        this.fetchPostData()
    }

    fetchPostData() {

        const {
            dispatch
        } = this.props

        new AV.Query('Article')
            .select('content')
            .get(this.id)
            .then((object) => {
                let date = new Date(object.createdAt)
                dispatch({
                    type: 'INIT_POST',
                    content: markdown.toHTML(object.get('content')),
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        const {
            title, date, content, summary, postTime
        } = this.props

        console.log(this.props)
        return (
            <section className="post-detail-wrapper">
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
                <div className="post-content" dangerouslySetInnerHTML={{__html:summary + content}}></div>
            </section>
        )
    }
}

Post.PropTypes = {
    title: React.PropTypes.string.isRequired,
    tags: React.PropTypes.arrayOf(
        React.PropTypes.number.isRequired
    ).isRequired,
    summary: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired,
    postTime: React.PropTypes.string.isRequired,
}


export default connect((state) => {
    const {
        title, summary, content, postTime, tags
    } = state.posts[state.selectPostId]

    return {
        title, summary, content, postTime, tags
    }
})(Post)