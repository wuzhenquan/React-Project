import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions/actions.js'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import Footer from '../components/Footer'
import ReactDOM from 'react-dom'

class App extends Component {
  render() {
    // connect 之后, 会将 mapStateToProps 函数中所要返回的对象注入到 this.props 中
    const { visibleTodos, visibilityFilter} = this.props // redux state 的数据
    // actions 函数
    const { onAddClick, onTodoClick, onFilterChange }  = this.props // redux actions 的函数
    return (
      <div>
        <AddTodo
          onAddClick={(text)=>{onAddClick(text)}} 
        />
        <TodoList
          visibleTodos={visibleTodos}
          onTodoClick={(index)=>{onTodoClick(index)}} 
        />
        <Footer
          visibilityFilter={visibilityFilter}
          onFilterChange={(nextFilter)=>{onFilterChange(nextFilter)}}
        />
      </div>
    )
  }
}

App.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}

function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed)
  }
}

// connect方法中的回调函数，负责向当前组件的 props 中注入 state
// 一旦状态树变化, mapStateToProps 函数就会被调用
function mapStateToProps(state) {
  // return 返回的是需要向组件中注入的 props
  // 注入之后通过 this.props 查看这些 state 了
  // 这里的参数 state, 就是 reducers.js 里的状态树了
  // console.log(state,'state')
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}

function mapDispatchToProps(dispatch){
  return {
    onAddClick: (text) => {dispatch(addTodo(text))},
    onTodoClick: (index) => {dispatch(completeTodo(index))},
    onFilterChange: (nextFilter) => {dispatch(setVisibilityFilter(nextFilter))},
  }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(mapStateToProps)(App) 中；
// mapStateToProps 是一个返回对象的函数
export default connect(mapStateToProps,mapDispatchToProps)(App)
