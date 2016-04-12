import React, {
    Component, PropTypes
}
from 'react'
import {
    connect
}
from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Posts from '../components/Posts'

class Blog extends Component {
    render() {
        const {
            posts, tags
        } = this.props

        const isEmpty = posts.length === 0
        return (
            <div>
                <Header/>
                <Posts posts={posts}/>
                <Footer/>
            </div>
        )
    }
}

Blog.PropTypes = {
    posts: PropTypes.array,
    tags: PropTypes.array,
}


function mapStateToProps( state ) {
    const {
        posts,
        tags
    } = state

    return {
        posts,
        tags
    }
}

export default connect( mapStateToProps )( Blog )