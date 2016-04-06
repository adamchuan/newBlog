import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import Home from './components/home.js'
require("!style!css!postcss!sass!../sass/style.scss");

const store = createStore((page = [], action)=> {
  switch (action.type) {
    case 'load':
        page = [{
            title : 'test',
            content: '123',
            date : '2016-04-06'
        }];
      return page
    default:
      return page
  }
});

const rootEl = document.getElementById('root')

function render() {
  ReactDOM.render(
    <Home 
      article={store.getState()} 
      onInitData={() => store.dispatch({ type: 'load' })} 
    />,
    rootEl  
  )
}

render()
store.subscribe(render)
