import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

function withAuth(WrappedComponent) {
  function WithAuth(props) {
    if (!props.isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return <WrappedComponent {...props} />;
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  });

  return connect(mapStateToProps)(WithAuth);
}

export default withAuth;