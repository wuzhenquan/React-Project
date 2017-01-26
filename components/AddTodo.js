import React, { Component, PropTypes } from 'react';
import {findDOMNode} from 'react-dom'

export default class AddTodo extends Component {
  handleClick(e) {
    const { actions } = this.props
    const node = findDOMNode(this.refs.input);
    const text = node.value.trim();
    this.props.actions.addTodo(text);
    node.value = '';
  }
  render() {
    return (
      <div>
        <input type='text' ref='input' />
        <button onClick={()=>this.handleClick()}>
          Add
        </button>
      </div>
    );
  }
}

AddTodo.propTypes = {
  actions: PropTypes.object
}
