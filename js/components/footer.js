import React from 'react'

class Footer extends React.Component {
  render () {
    return (
      <footer className='page_footer'>
        <ul className='list-inline text-center'>
          <li>
            <a target='_blank' href='https://www.zhihu.com/people/adamchuan'>
            <span className='fa-stack fa-lg'>
              <i className='fa fa-circle fa-stack-2x'></i> 
              <i className='fa fa-stack-1x fa-inverse'>知</i>
            </span>
          </a>
          </li>
          <li>
            <a target='_blank' href='http://weibo.com/adamchuan'>
              <span className='fa-stack fa-lg'>
                <i className='fa fa-circle fa-stack-2x'></i>
                <i className='fa fa-weibo fa-stack-1x fa-inverse'></i>
              </span>
            </a>
          </li>
          <li>
            <a target='_blank' href='https://ca.linkedin.com/in/%E6%96%B9%E8%88%9F-%E4%BD%95-029089104'>
            <span className='fa-stack fa-lg'>
              <i className='fa fa-circle fa-stack-2x'></i> 
              <i className='fa fa-linkedin fa-stack-1x fa-inverse'></i>
            </span>
            </a>
          </li>
          <li>
            <a target='_blank' href='https://github.com/adamchuan'>
            <span className='fa-stack fa-lg'>
              <i className='fa fa-circle fa-stack-2x'></i> 
              <i className='fa fa-github fa-stack-1x fa-inverse'></i>
            </span>
            </a>
          </li>
        </ul>
        <p className='copyright'>
          Copyright © AdamChuan Blog 2016
        </p>
      </footer>
    )
  }
}

export default Footer
