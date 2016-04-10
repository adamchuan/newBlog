import React, {
    Component, PropTypes
}
from 'react'
import Header from "./header.js"
import Footer from "./footer.js"

class Home extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        var ArticleItemWrapper = React.createClass({
            render: function() {
                var {
                    title, date, summary
                } = this.props.data;
                return (
                    <div className="article-wrap">
                    <header className="article-header-wrap">
                      <h2 className="article-title">
                           {title}
                      </h2>
                      <small>
                        <time className="article-time"> 
                            <i className="icon-calendar"></i>
                            <span>{date}</span>
                        </time>
                      </small>
                    </header>
                      <div className="article-content" dangerouslySetInnerHTML={{__html:summary}}></div>
                  </div>
                )
            }
        });

        return (
            <div className="pageWrap">
              <Header />
                <button onClick={this.props.onInitData} >
                  获取文章
                </button> 
                <div className="articleWrapper">
                    {this.props.article.map((article)=> {
                        return <ArticleItemWrapper key={article.id} data={article}/>;
                    })}
                </div>
              <Footer />
            </div>
        )
    }

}

Home.propTypes = {
    article: PropTypes.array,
    onInitData: PropTypes.func
}

export default Home