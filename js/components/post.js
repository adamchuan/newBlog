import React from 'react'
import marked from 'marked'

import {
    highlightAuto
}
from 'highlight.js'

import {
    connect
}
from 'react-redux'


import {
    Link
}
from 'react-router'

marked.setOptions( {
    highlight: ( code ) => {
        return highlightAuto( code ).value
    }
} );

class Post extends React.Component {

    componentWillReceiveProps( nextProps ) {
        if ( this.id != nextProps.params.postid ) {
            this.id = nextProps.params.postid
            this.props.dispatch( {
                type: 'REQUEST_POST'
            } )
        }
    }

    componentDidMount() {
        if ( !this.props.isFetching ) {
            this.fetchPostData()
        }
    }

    fetchPostData() {

        const {
            dispatch
        } = this.props

        new AV.Query( 'Article' )
            .select( 'content', 'title', 'summary', 'tags' )
            .get( this.props.params.postid )
            .then( ( object ) => {
                let date = new Date( object.createdAt )

                let content = marked( object.get( 'content' ) )
                dispatch( {
                    type: 'INIT_POST',
                    data: {
                        content: content,
                        summary: object.get( 'summary' ),
                        title: object.get( 'title' ),
                        tags: object.get( 'tags' ),
                    }
                } )
            } )
            .catch( err => console.log( err ) )
    }

    render() {
        const {
            title, date, content, summary, postTime, isFetching
        } = this.props
        return (
            <div>
            {
                isFetching
                ? <div>
                    正在加载中 
                  </div>
                : <section className="post-detail-wrapper">
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
            }
            </div>
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
    isFetching: React.PropTypes.bool.isRequired,
    postTime: React.PropTypes.string.isRequired,
}


export default connect( ( state ) => {

    return Object.assign( {}, state.post )

} )( Post )