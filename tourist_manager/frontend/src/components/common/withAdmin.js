import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

function WithAdmin(WrappedComponent) {
  function WithAdmin(props) {
    if (props.profile != 'office_admin') {
      return <Navigate to="/unauthorized" />;
    }

    return <WrappedComponent {...props} />;
  }

  const mapStateToProps = (state) => ({
    profile: state.auth.profile,
  });

  return connect(mapStateToProps)(WithAdmin);
}

export default WithAdmin;




