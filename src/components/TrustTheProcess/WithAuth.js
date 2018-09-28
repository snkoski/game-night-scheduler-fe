import React from 'react'
import { Redirect } from 'react-router-dom'

const withAuth = (ComponentToWrap) => {
  return class WrappedComponent extends React.Component {
    render () {
      return (
        this.props.loggedIn ? <ComponentToWrap {...this.props} />
        : <Redirect to='/login' />
      )
    }
  }
}

export default withAuth
