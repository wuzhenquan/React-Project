import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import todoApp from './reducers/reducers.js'

let store = createStore(todoApp)
// console.log(store.getState(),'store.getState()')
// store 有 dispatch getState replaceReducer subscribe Symbol 这些函数
let rootElement = document.getElementById('root')
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
