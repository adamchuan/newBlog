import React, { Component, PropTypes } from 'react'
import Header from "./header.js"
import Footer from "./footer.js"

class Home extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const articleRender = this.props.article.map((articleData)=>{
        return (
          <article data-tname="post" className="article-wrap">
              <header className="article-header-wrap">
                <h2 className="article-title">
                     {articleData.title}
                </h2>
                <small>
                  <time className="article-time"> <i className="icon-calendar"></i>
                     {articleData.date}
                  </time>
                </small>
              </header>
              <div className="article-content">{articleData.content}</div>
          </article>
        )
    });

    return (
        <div className="pageWrap">
          
          <Header />
            <button onClick={this.props.onInitData} >
              获取文章
            </button>
            {articleRender}
          <Footer />
        </div>
    )
  }

}

Home.propTypes = {
  article : PropTypes.array,
  onInitData : PropTypes.func
}

export default Home
