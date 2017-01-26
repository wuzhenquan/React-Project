import React, { Component, PropTypes } from 'react'

export default class Footer extends Component {
  renderFilter(filter, name){
    const { actions } = this.props
    let {visibilityFilter} = this.props
    if(filter === visibilityFilter){
      return name
    }
    return (
      <a href='#' onClick={()=>{actions.setVisibilityFilter(filter)}}>
        {name}
      </a>
    )
  }
  render(){
    return (
      <p>
        {this.renderFilter('SHOW_ALL', 'All')}{', '}
        {this.renderFilter('SHOW_COMPLETED', 'Completed')}{', '}
        {this.renderFilter('SHOW_ACTIVE', 'Active')}
      </p>
    )
  }
}

Footer.propTypes = {
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}
