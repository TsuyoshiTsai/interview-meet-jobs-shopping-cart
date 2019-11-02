import React from 'react'
import PropTypes from 'prop-types'

import getDisplayName from 'lib/utils/get-display-name'

function withFetching (WrappedComponent) {
  function WrapperComponent ({ isFetching, isLoaded, loadingComponent, render, ...props }) {
    if (isFetching || !isLoaded) {
      return React.createElement(loadingComponent, props)
    } else if (typeof render === 'function') {
      return <WrappedComponent {...props}>{render(props)}</WrappedComponent>
    } else {
      return <WrappedComponent {...props} />
    }
  }

  WrapperComponent.propTypes = {
    isFetching: PropTypes.bool,
    isLoaded: PropTypes.bool,
    loadingComponent: PropTypes.elementType,
    render: PropTypes.func,
  }
  WrapperComponent.defaultProps = {
    isFetching: false,
    isLoaded: true,
    loadingComponent: props => 'Loading...',
  }
  WrapperComponent.displayName = `withFetching(${getDisplayName(WrappedComponent)})`

  return WrapperComponent
}

export default withFetching
